<template>
  <ul class="dropdown-menu" aria-labelledby="language">
    <overlay-scrollbars class="notification-dropdown" :options="scrollOption">
      <!-- Notification -->
      <template v-if="notifications">
        <template v-for="(noti, index) in notifications">
          <li class="dropdown-item notification-preview" :key="index">
            <a href="" @click.prevent="readNoti(noti)">
              <div class="media">
                <span class="mr-3">
                  <font-awesome-icon
                    size="2x"
                    :class="iconClass(noti.title).class"
                    :icon="['fas', iconClass(noti.title).icon]"
                  />
                </span>
                <div class="media-body">
                  <div class="d-flex justify-content-between">
                    <h6 class="media-heading noti-title mb-1">
                      {{ noti.title }}
                      <font-awesome-icon
                        v-if="!noti.read"
                        :icon="['fas', 'circle']"
                        class="text-violet"
                        size="xs"
                      ></font-awesome-icon>
                    </h6>
                  </div>
                  <p class="text noti-content mb-0">{{ noti.content }}</p>
                  <p class="small text-muted mb-1">
                    {{ formatTime(noti.created) }}
                  </p>
                </div>
              </div>
            </a>
          </li>
        </template>
      </template>

      <li class="dropdown-item" v-if="!notifications || !notifications.length">
        <span class="d-inline-block text-center w-100">
          Chưa có thông báo để hiển thị
        </span>
      </li>
    </overlay-scrollbars>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { getModule } from "vuex-module-decorators";
import AuthModule from "@/store/auth/auth.module";
import NotificationModule from "@/store/notification/notification.module";

import { Notification } from "@/types/notification";

import { db } from "@/firebase/firebase";

import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

@Component({
  components: {
    "overlay-scrollbars": OverlayScrollbarsComponent
  }
})
export default class GeneralNotification extends Vue {
  scrollOption = {
    overflowBehavior: {
      x: "hidden",
      y: "scroll"
    }
  };
  AuthInstance = getModule(AuthModule, this.$store);
  NotificationInstance = getModule(NotificationModule, this.$store);
  notiRef = this.AuthInstance.currentUser
    ? db.ref(`notifications/${this.AuthInstance.currentUser.username}`)
    : null;
  index = 0;

  generalNoti = 0;

  get notifications() {
    console.log(this.NotificationInstance.getNotifications);
    return this.NotificationInstance.getNotifications;
  }

  created() {
    this.getNotifications();
  }

  iconClass(title: string) {
    switch (title) {
      case "LỜI MỜI":
        return {
          icon: "share",
          class: "text-info"
        };
      case "NHẬN YÊU CẦU":
        return {
          icon: "share",
          class: "text-info"
        };
      case "CHẤP NHẬN YÊU CẦU":
        return {
          icon: "check",
          class: "text-violet"
        };
      case "CHÚC MỪNG":
        return {
          icon: "trophy",
          class: "text-warning"
        };
      case "HỦY YÊU CẦU":
        return {
          icon: "exclamation-circle",
          class: "text-danger"
        };
      case "PHẢN HỒI":
        return {
          icon: "exclamation-triangle",
          class: "text-warning"
        };
      case "XÁC NHẬN":
        return {
          icon: "check",
          class: "text-success"
        };
      case "MÂU THUẪN":
        return {
          icon: "times",
          class: "text-danger"
        };
      default:
        return {
          icon: "bell",
          class: "text-warning"
        };
    }
  }

  getNotifications() {
    if (this.notiRef) {
      this.notiRef.on("value", snapshot => {
        const response = snapshot.val();
        if (response) {
          this.NotificationInstance.setNotifications(
            Object.entries(response)
              .map(entry => this.mapper(...entry))
              .reverse()
          ).then(() => {
            this.$emit(
              "newNotiNumber",
              Object.values(this.notifications).reduce(
                (acc, item) => acc + (!item || item.read ? 0 : 1),
                0
              )
            );
          });
        }
      });
    }
  }

  mapper(key: string, value: unknown) {
    const noti = value as Notification;
    noti.id = key;
    return noti;
  }

  readNoti(notification: Notification) {
    if (this.notiRef) {
      this.notiRef
        .child(`/${notification.id}`)
        .update({ read: true })
        .then(() => {
          if (notification.title.trim() === "HOÀN THÀNH") {
            this.$router.push({
              name: "TransactionHistory"
            });
            return;
          }
          this.$router
            .push({
              name: "RequestDetail",
              params: { id: notification.requestId }
            })
            .catch(() => {
              console.log("current request");
            });
        });
    }
  }
}
</script>

<style lang="scss" scss scoped>
@import "~@/assets/scss/components/navbar.scss";
.message-dropdown {
  min-width: 20rem !important;
}
a:hover {
  color: #e4e6eb !important;
}
.text-unread {
  font-weight: 700;
  color: #e4e6eb;
}

.media {
  min-width: 20rem;
}

.dropdown-menu {
  display: absolute;
  transform: translate3d(-130px, 34px, 0px) !important;
}

.notification-dropdown {
  max-height: 30rem;
  max-width: 24rem;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
}

.noti-title {
  margin-bottom: 0.5rem;
}

.noti-content {
  white-space: normal;
  font-weight: 300 !important;
}
</style>
