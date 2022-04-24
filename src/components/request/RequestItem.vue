<template>
  <div
    class="bg-dark-ui border-ui bookmarked-request-content mb-3"
    :class="[displayType, { 'card-focus': displayType !== 'detail' }]"
    v-if="request"
  >
    <div class="price">
      {{ request.price ? request.price.toLocaleString("vi-VI") : 0 }}
      VND
      <div
        v-if="
          AuthInstance.currentUser &&
            AuthInstance.currentUser.role === 'ROLE_MENTOR'
        "
        class="bookmark"
        @click="toggleFollowRequest(request.id)"
      >
        <font-awesome-icon
          class="text-warning"
          :icon="[request.bookmarked ? 'fas' : 'far', 'bookmark']"
        />
      </div>
    </div>

    <div class="media">
      <svg
        width="3em"
        height="3em"
        viewBox="0 0 16 16"
        class="bi bi-question-circle mr-3 text-tan"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
        />
        <path
          d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"
        />
      </svg>
      <div class="media-body">
        <a href="#" class="mt-0 request-title" @click="goToDetail">{{
          request.title
        }}</a>
        <list-skill
          class="small"
          :class="displayType === 'small-card' ? 'x-small' : ''"
          :list-skill="request ? request.skills : []"
        />
        <div class="time mt-2">
          <span
            class="request-deadline"
            :class="{
              'text-danger':
                request.deadline < new Date().getTime() &&
                request.status == 'OPEN'
            }"
          >
            <font-awesome-icon :icon="['far', 'clock']" />
            {{ request ? formatTime(request.deadline) : "" }}
          </span>
          -
          <span class="text-status request-status" :class="status.class">{{
            status.text
          }}</span>
        </div>
        <slot></slot>
        <div class="request-content" v-if="displayType === 'detail'">
          <p>{{ request.content }}</p>
        </div>
      </div>
    </div>

    <confirm-modal
      :title="confirmTitle"
      :trigger="confirmTrigger"
      @confirm="confirmAction"
    />
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import ListSkill from "@/components/ListSkill.vue";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";

import { Request, RequestStatus } from "@/types/request";

import { requestFollowingService } from "@/services/request/request-following.service";

import AuthModule from "@/store/auth/auth.module";

import Swal from "sweetalert2";
import { ToastError } from "@/mixins/sweetalert.mixin";

@Component({
  components: {
    ListSkill,
    ConfirmModal
  }
})
export default class RequestItem extends Vue {
  @Prop() readonly request: Request | undefined;

  @Prop({ type: String, default: "detail" }) readonly displayType!: string;

  AuthInstance = getModule(AuthModule, this.$store);

  get contentFmt() {
    if (!this.request) return "";
    return this.request.content.replaceAll("\n", "<br />");
  }

  get status() {
    if (!this.request)
      return {
        text: "",
        class: ""
      };
    return RequestStatus[this.request.status];
  }

  toastError = Swal.mixin(ToastError);

  //confirm modal data
  confirmTitle = "";
  confirmTrigger = false;
  callback: Function | null = null;
  callbackParams = "";

  toggleConfirm(title: string, callback: Function, params: string) {
    this.confirmTitle = title;
    this.callback = callback;
    this.callbackParams = params;
    this.confirmTrigger = !this.confirmTrigger;
  }

  confirmAction() {
    if (this.callback) {
      this.callback(this.callbackParams);
    }
  }

  goToDetail() {
    if (this.displayType === "detail" || !this.request) return;
    this.$router
      .push({
        name: "RequestDetail",
        params: { id: `${this.request.id}` }
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  }

  goToUpdateRequest() {
    if (!this.request) return;
    this.$router
      .push({
        name: "UpdateRequest",
        params: { id: `${this.request.id}` }
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  }

  async toggleFollowRequest(requestId: string) {
    const loader = this.$loading.show();
    try {
      const response = await requestFollowingService.postFollowingAndUnfollowing(
        requestId
      );
      if (response.status == 200) {
        if (this.request) {
          this.request.bookmarked = !this.request?.bookmarked;
          this.$emit(
            this.request.bookmarked ? "bookmark" : "unbookmark",
            this.request
          );
        }
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
    loader.hide();
  }
}
</script>

<style lang="scss" scoped>
.bookmarked-request-content {
  padding: 1.25rem;
  position: relative;
}

.bookmarked-request-content .media {
  align-items: flex-start !important;
  padding-right: 10rem;
}

.bookmarked-request-content .media .media-body > a {
  font-size: 1.125rem;
  font-weight: 400;
  color: #e4e6eb;
  margin-bottom: 0.25rem;
  display: block;
}

.bookmarked-request-content .media .media-body a:hover {
  color: #c7af8b;
  text-decoration: none;
}

.bookmarked-request-content .media .media-body .time {
  color: #b0b3b8;
  letter-spacing: 1px;
}

.bookmarked-request-content .media .media-body .time i {
  font-size: 0.85rem;
}

.bookmarked-request-content .media .media-body span {
  font-size: 0.85rem;
  font-weight: 500;
}

.bookmarked-request-content .media .media-body .tags {
  margin-top: 0.25rem;
}

.bookmarked-request-content .media .media-body .tags .tag {
  display: inline-block;
  margin-top: 0.35rem;
  margin-right: 0.15rem;
  padding: 0.2rem 0.75rem;
  border-radius: 0.75rem;
  text-transform: uppercase;
  color: #b0b3b8;
  border: 2px solid #3a3b3c;
  font-style: normal;
  font-weight: 700;
  font-size: 0.6rem;
  transition: 0.3s;
}

.bookmarked-request-content .media .media-body .tags .tag:hover {
  text-decoration: none;
  color: #e4e6eb;
  border: 2px solid #3a3b3c;
  background-color: #3a3b3c;
  cursor: pointer;
}

.bookmarked-request-content .price {
  position: absolute;
  right: 1.75rem;
  background-color: #3a3b3c;
  border-radius: 0.35rem;
  padding: 0.25rem 0.65rem;
  font-weight: 500;

  .bookmark {
    cursor: pointer;
    position: absolute;
    top: 2.5rem;
    right: 50%;
    transform: translateX(50%);
    svg {
      transform: scale(1.2, 1.4);
    }
  }
}

.bookmarked-request-content .media .media-body .action {
  margin-top: 0.8rem;
}

@media (max-width: 767.98px) {
  .bookmarked-request-content .media {
    padding-right: 0;
  }
  .bookmarked-request-content .price {
    display: none;
  }
}

.text-status {
  font-size: 0.85rem !important;
  font-weight: 500 !important;
  letter-spacing: 0;
}

.media-body .request-title {
  font-size: 1.25rem !important;
  max-width: 35rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.request-content {
  margin-top: 1.5rem;
}

.small-card {
  padding: 1rem !important;
  min-height: fit-content !important;

  svg.bi-question-circle {
    display: none;
  }

  .request-title {
    font-size: 1rem !important;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .request-content {
    display: none;
  }

  .request-deadline,
  .request-status {
    font-size: 0.75rem !important;
  }

  .price {
    display: none;
  }

  .media {
    padding-right: 0;
  }
}

.card-focus:hover {
  transform: translateY(-2px);
}
</style>
