<template>
  <ul class="dropdown-menu" aria-labelledby="language">
    <overlay-scrollbars class="message-dropdown" :options="scrollOption">
      <template v-if="orderedNotifications && orderedNotifications.length">
        <template v-for="noti in orderedNotifications">
          <li
            v-if="noti.lastMessage && noti.lastMessage.content"
            class="dropdown-item message-preview"
            :key="noti.key"
            @click="gotoDetail(noti.key)"
          >
            <a href="">
              <div class="media">
                <span class="mr-3">
                  <img
                    class="media-object"
                    v-if="noti.lastMessage.fromAvatar"
                    :src="data.lastMessage.fromAvatar"
                    alt="avatar"
                    width="50"
                  />
                  <img
                    v-else
                    class="media-object"
                    src="../../assets/images/system/v.png"
                    alt="avatar"
                    width="50"
                  />
                </span>
                <div class="media-body">
                  <h6 class="media-heading mb-1">
                    {{ noti.lastMessage.fromFullname }}
                  </h6>
                  <p
                    class="text message-content mb-0"
                    :class="
                      noti.lastMessage.read ? 'text-muted' : 'text-unread'
                    "
                  >
                    {{ noti.lastMessage.content }}
                  </p>
                  <p class="small text-muted mb-0">
                    {{ format(noti.lastMessage.timestamp) }}
                  </p>
                </div>
              </div>
            </a>
          </li>
        </template>
      </template>
      <template v-else>
        <li class="dropdown-item">
          <span class="d-inline-block w-100 text-center">
            Chưa có tin nhắn để hiển thị
          </span>
        </li>
      </template>
    </overlay-scrollbars>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { getModule } from "vuex-module-decorators";
import AuthModule from "@/store/auth/auth.module";

import { User } from "@/types/auth/user.ts";

import { db } from "@/firebase/firebase";

import { format } from "date-fns";

import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import { ChatNofications } from "@/types/notification";

@Component({
  components: {
    "overlay-scrollbars": OverlayScrollbarsComponent
  }
})
export default class ChatNotification extends Vue {
  orderedNotifications: ChatNofications = [];

  scrollOption = {
    overflowBehavior: {
      x: "scroll",
      y: "hidden"
    }
  };

  AuthInstance = getModule(AuthModule, this.$store);
  user: User = this.AuthInstance.currentUser;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notifications: Record<string, any> = {};

  get existChatNoti() {
    let exist = false;
    if (!this.notifications) return exist;
    Object.keys(this.notifications).forEach(uid => {
      if (this.notifications[uid].lastMessage != null) exist = true;
    });
    return exist;
  }

  created() {
    db.ref(
      `messages/subscribed_channels/${this.AuthInstance.currentUser?.username}`
    ).on("value", snapshot => {
      if (snapshot.exists()) {
        this.notifications = snapshot.val();
        this.$emit(
          "newMessageNumber",
          Object.values(this.notifications).reduce(
            (acc, item) =>
              acc + (!item.lastMessage || item.lastMessage.read ? 0 : 1),
            0
          )
        );
        this.orderedNotifications.length = 0;
        const ordered: ChatNofications = [];
        Object.keys(this.notifications).forEach(key => {
          const noti = Object.assign({}, this.notifications[key]);
          noti.key = key;
          if (noti.lastMessage && noti.lastMessage.from) ordered.push(noti);
        });
        this.orderedNotifications = ordered.sort((notiA, notiB) => {
          return notiB.lastMessage.timestamp - notiA.lastMessage.timestamp;
        });
      } else {
        this.orderedNotifications = [];
        this.notifications = {};
      }
    });
  }

  format(milisec: number) {
    return format(milisec, "HH:mm dd/MM/yyyy");
  }

  gotoDetail(requestId: string) {
    this.$router.push({ name: "RequestDetail", params: { id: requestId } });
  }
}
</script>

<style lang="scss" scss scoped>
@import "~@/assets/scss/components/navbar.scss";
.dropdown-menu {
  position: absolute;
  min-width: 20rem !important;
}

.message-dropdown {
  max-height: 30rem;
  max-width: 24rem;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
}

a:hover {
  color: #e4e6eb !important;
}
.text-unread {
  font-weight: 700;
  color: #e4e6eb;
}

.message-content {
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
