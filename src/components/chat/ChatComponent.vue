<template>
  <div class="chat-component-wrapper" :class="{ glow: isFocusing }">
    <div v-show="isLoading" class="loading-message">
      <span>Đang tải..</span>
    </div>
    <small
      v-if="isFocusing"
      class="btn-hide text-muted cursor-pointer"
      @click="isFocusing = false"
    >
      <strong class="mr-1">Thu gọn</strong>
      <font-awesome-icon :icon="['fas', 'chevron-down']" />
    </small>
    <div
      ref="message-box"
      class="message-box"
      :class="{ glow: isFocusing }"
      @scroll="infiniteLoad($event)"
    >
      <div
        class="message-item"
        v-for="(msg, index) in messages"
        :class="[
          msg.from === currentUser ? 'text-right' : 'text-left',
          { 'same-sender-msg': sameSenderMsg(index) }
        ]"
        :key="index"
      >
        <!-- Profile Image -->
        <div class="media" v-show="!sameSenderMsg(index)">
          <a href="" class="circle">
            <img
              class="avatar"
              v-if="messageOwner(msg).profileImgPath"
              :src="messageOwner(msg).profileImgPath"
              alt="avatar"
            />
            <img
              v-else-if="messageOwner(msg).gender"
              class="avatar"
              src="../../assets/images/system/v.png"
              alt="avatar"
            />
            <img
              v-else
              class="avatar"
              src="../../assets/images/system/v2.png"
              alt="avatar"
            />
          </a>
        </div>

        <div class="message-bubble">{{ msg.content }}</div>
      </div>
    </div>
    <div class="form-group mb-0">
      <input
        id="message-input"
        v-model="currentMessage"
        autocomplete="off"
        type="email"
        class="form-control"
        placeholder="Nhập tin nhắn"
        @keyup.enter="sendMessage"
        @focus="isFocusing = true"
      />
      <button class="send-btn btn text-primary" @click="sendMessage">
        <font-awesome-icon :icon="['fas', 'paper-plane']" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Watch, Prop, Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import ProfileModule from "@/store/profile/profile.module";

import { Profile } from "@/types/profile/profile";
import { Message, Messages } from "@/types/message";
import { Request } from "@/types/request";

import { db } from "@/firebase/firebase";
import database from "firebase/database";

import firebase from "firebase";

@Component
export default class ChatComponent extends Vue {
  @Prop() readonly users!: Profile[];
  @Prop() readonly request!: Request;

  ProfileInstance = getModule(ProfileModule, this.$store);

  currentMessage = "";
  currentUser = "";
  messages: Messages = [];
  isFocusing = false;
  subChannel: string | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  channelRef: firebase.database.Reference | null = null;
  end: string | null = null;
  reachFirstMessage = false;
  isLoading = false;

  @Watch("isFocusing")
  markAsRead() {
    if (!this.isFocusing || !this.currentUser || !this.request) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};
    updateData[
      `messages/subscribed_channels/${this.currentUser}/${this.request.id}/lastMessage/read`
    ] = true;
    db.ref(
      `messages/subscribed_channels/${this.currentUser}/${this.request.id}/lastMessage/read`
    ).once("value", snapshot => console.log(snapshot.val()));
    db.ref().update(updateData);
  }

  created() {
    const currentProfile: Profile = this.ProfileInstance.getProfile;
    if (currentProfile) {
      this.currentUser =
        this.users.find(
          user => user && user.username === currentProfile.username
        )?.username || "";
    }
    this.createRoom();
  }

  sameSenderMsg(index: number) {
    return (
      index - 1 >= 0 &&
      this.messages[index - 1].from === this.messages[index].from
    );
  }

  messageOwner(message: Message) {
    if (!message) return;
    return this.users.find(user => user?.username == message.from) || false;
  }

  // Firebase initialize
  createRoom() {
    const subscribedChannelsRef = db.ref("messages/subscribed_channels");
    if (!this.request || !this.users || !this.users[0] || !this.users[1])
      return;
    subscribedChannelsRef
      .child(`${this.users[0].username}/${this.request.id}`)
      .once("value")
      .then(snapshot => {
        if (!snapshot.exists()) {
          if (this.users[0] && this.users[1] && this.request) {
            subscribedChannelsRef
              .child(this.users[0].username)
              .child(this.request.id.toString())
              .set({
                currentMentor: this.users[1].username
              });
            subscribedChannelsRef
              .child(this.users[1].username)
              .child(this.request.id.toString())
              .set({
                currentMentor: this.users[1].username
              });
            this.subChannel = this.users[1].username;
          }
        } else {
          this.subChannel = snapshot.val().currentMentor;
        }
        if (this.request) {
          this.channelRef = db.ref(
            `messages/channels/${this.request.id}/${this.subChannel}`
          );
        }
        this.firstLoad();
        this.watchNewMessage();
      });
  }

  firstLoad() {
    if (this.channelRef) {
      this.channelRef
        .orderByKey()
        .limitToLast(1)
        .once("value", snapshot => {
          if (!snapshot.exists()) {
            this.reachFirstMessage = true;
            return;
          }
          this.end = Object.keys(snapshot.val())[0];
          this.loadMore().then(() => this.scrollToBottom());
          this.markAsRead();
        });
    }
  }

  async loadMore() {
    if (this.reachFirstMessage) return;
    if (this.channelRef) {
      this.isLoading = true;
      await this.channelRef
        .orderByKey()
        .endAt(this.end)
        .limitToLast(10)
        .once("value", snapshot => {
          this.isLoading = false;
          if (snapshot.exists()) {
            // Check the existence of old messages
            const newEnd = Object.keys(snapshot.val()).shift() || null;
            if (this.end === newEnd) {
              this.reachFirstMessage = true;
              return;
            } else {
              this.end = newEnd;
              // Add new pulled messages
              const newChunk = Object.values(snapshot.val());
              newChunk.pop();
              this.messages.unshift(...(newChunk as Messages));
              this.setOffsetScrollBar();
            }
          }
        });
    }
  }

  watchNewMessage() {
    if (!this.channelRef) return;
    this.channelRef.on("child_added", snapshot => {
      this.messages.push(snapshot.val());
      this.$nextTick(() => this.scrollToBottom());
      this.markAsRead();
    });
  }

  sendMessage() {
    if (!this.currentMessage) return;
    const message = this.currentMessage;
    if (this.channelRef && this.users[0] && this.users[1] && this.request) {
      const newMessage = this.channelRef.push();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updateData: any = {};
      // Update to subscribe channel
      updateData[
        `messages/subscribed_channels/${this.users[0].username}/${this.request.id}/lastMessage`
      ] = {
        content: message,
        from: this.currentUser,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        fromFullname:
          this.currentUser === this.users[0].username
            ? this.users[0].fullName
            : this.users[1].fullName,
        fromAvatar:
          this.currentUser === this.users[0].username
            ? this.users[0].avatar
            : this.users[1].avatar,
        read: false
      };
      updateData[
        `messages/subscribed_channels/${this.users[1].username}/${this.request.id}/lastMessage`
      ] = Object.assign(
        {},
        updateData[
          `messages/subscribed_channels/${this.users[0].username}/${this.request.id}/lastMessage`
        ]
      );

      updateData[
        `messages/subscribed_channels/${this.currentUser}/${this.request.id}/lastMessage`
      ].read = true;

      updateData[
        newMessage.toString().substring(db.ref().toString().length - 1)
      ] = {
        content: this.currentMessage,
        from: this.currentUser,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };
      db.ref()
        .update(updateData)
        .then(() => {
          this.currentMessage = "";
          this.scrollToBottom();
        });
    }
    this.currentMessage = "";
  }

  scrollToBottom() {
    const chatBoxElement = this.$refs["message-box"] as HTMLElement;
    if (chatBoxElement) {
      chatBoxElement.scrollTop = chatBoxElement.scrollHeight;
    }
  }

  setOffsetScrollBar() {
    const chatBoxElement = this.$refs["message-box"] as HTMLElement;
    if (chatBoxElement.scrollTop === 0) {
      chatBoxElement.scrollTop = Math.min(chatBoxElement.scrollHeight, 200);
    }
  }

  infiniteLoad(event: Event) {
    if ((event.srcElement as HTMLElement).scrollTop === 0) this.loadMore();
  }
}
</script>

<style lang="scss" scoped>
.chat-component-wrapper {
  position: relative;
  &.glow {
    padding-top: 1rem;
  }
}

.form-group {
  position: relative;
}

.send-btn {
  position: absolute;
  right: 0;
  top: 0;
}

.form-control {
  color: #b0b3b8;
  border: 1px solid transparent;
  background-color: transparent;
  padding: 0 0.5rem;
  height: calc(1em + 0.75rem + 2px);

  &:disabled,
  &[readonly] {
    background-color: transparent;
  }

  &:focus {
    color: #b0b3b8;
    box-shadow: none;
    border-color: transparent;
    background-color: transparent;
  }
}

.message-box {
  padding: 0;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.3s;
  height: 0;

  &.glow {
    height: 30vh;
    margin-bottom: 0.5rem;
    padding: 0.5rem 1rem;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    width: 0.3rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #18191a;
    border-radius: 1rem;

    &:hover {
      background-color: #3a3b3c;
    }
  }
}

.message-item {
  width: 100%;
  height: auto;
  margin: 1rem 0;
  position: relative;
  padding: 0 1rem;
  display: flex;
  &.text-left {
    justify-content: flex-start;
  }
  &.text-right {
    justify-content: flex-end;
  }
}

.same-sender-msg {
  &.message-item {
    margin-top: -0.65rem;
  }
}

.message-bubble {
  border-radius: 2rem;
  padding: 0.3rem 0.6rem;
  background: #4d4f50;
  width: fit-content;
}

.media {
  position: absolute;
  top: -0.6rem;
  display: flex;
  align-items: center !important;
  justify-content: center;
  margin-bottom: 0.5rem;

  .circle {
    border-radius: 50%;
    padding: 0.2rem;

    .avatar {
      width: 0.9rem;
      border-radius: 50%;
    }
  }

  .text-left & {
    left: -0.5rem;
  }

  .text-right & {
    right: -0.5rem;
  }
}

.btn-hide {
  position: absolute;
  right: 0.5rem;
  top: -0.2rem;
}

.loading-message {
  text-align: center;
  width: 100%;
  margin-top: -1.2rem;
  font-size: 0.8rem;
}
</style>
