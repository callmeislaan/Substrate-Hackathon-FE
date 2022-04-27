<template>
  <div>
    <div class="container" v-if="request || isLoading">
      <div class="left">
        <template
          v-if="request && !['COMPLETE', 'DOING'].includes(request.status)"
        >
          <info-panel :profileProp="request && request.userInfoResponse" />
          <div
            class="sidebar-menu bg-dark-ui border-ui mb-3"
            v-if="this.role !== 'mentor' || showMentorReceiveAction"
          >
            <ul>
              <li v-for="(item, index) in sideBarItems" :key="index">
                <router-link :to="item.path">
                  <font-awesome-icon
                    class="text-sea-green mr-2"
                    :icon="['fas', item.icon]"
                    :class="item.class"
                    fixed-width
                  />
                  {{ item.text }}
                </router-link>
              </li>

              <!-- mentor-action -->
              <li v-if="showMentorReceiveAction">
                <a
                  v-if="!request.reserved"
                  type="submit"
                  @click="receiveRequest"
                >
                  <font-awesome-icon
                    :icon="['fas', 'check']"
                    class="text-sea-green mr-3"
                  />Nhận yêu cầu
                </a>
                <a v-else type="submit" @click="unReceiveRequest">
                  <font-awesome-icon
                    :icon="['fas', 'times']"
                    class="text-danger mr-3"
                  />Bỏ nhận yêu cầu
                </a>
              </li>

              <!-- owner-action -->
              <li v-if="role === 'owner'">
                <a
                  v-if="request.status === 'OPEN'"
                  type="submit"
                  @click="closeRequest"
                >
                  <font-awesome-icon
                    :icon="['fas', 'trash-alt']"
                    class="text-danger mr-3"
                  />Đóng yêu cầu
                </a>
                <a
                  v-if="request.status === 'DELETE'"
                  type="submit"
                  @click="reopenRequest"
                >
                  <font-awesome-icon
                    :icon="['fas', 'trash-restore']"
                    class="text-success mr-3"
                  />Mở lại yêu cầu
                </a>
              </li>
            </ul>
          </div>
        </template>
        <template v-else>
          <user-info-card :profile="request && request.userInfoResponse" />
        </template>
      </div>

      <div class="right">
        <div class="container-right">
          <div class="middle-col">
            <!-- Request Infomation -->
            <request-item :request="request" class="request-item">
              <!-- MARK AS COMPLETE/FAILED ACTION -->
              <div class="request-item-slot-wrapper">
                <div class="action text-center" v-if="showMarkAsCompleteAction">
                  <button
                    type="submit"
                    class="btn btn-md btn-owner-action btn-anest-light m-1"
                    @click="triggerConfirm('complete')"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'check']"
                      class="text-sea-green mr-2"
                    />
                    Hoàn thành
                  </button>
                  <button
                    type="submit"
                    class="btn btn-md btn-owner-action btn-anest-light m-1"
                    v-tooltip.bottom="{
                      content:
                        'Bạn có quyền huỷ mentor và nhận ngay lại tiền trong 5 phút',
                      class: timeLeft > 0 ? 'anest-tooltip' : 'tooltip-hide',
                    }"
                    @click="
                      triggerModalConfirm(
                        'Xác nhận yêu cầu không được hoàn thành',
                        markAsFailed
                      )
                    "
                  >
                    <font-awesome-icon
                      :icon="['fas', 'times']"
                      class="text-danger mr-2"
                    />
                    Không hoàn thành
                    <span class="text-muted" v-if="timeLeft > 0">{{
                      `${Math.floor(timeLeft / 60000)}:${(
                        "0" + Math.floor((timeLeft / 1000) % 60)
                      ).slice(-2)}`
                    }}</span>
                  </button>

                  <button
                    v-show="false"
                    type="submit"
                    class="btn btn-md btn-owner-action btn-anest-light m-1"
                    @click="
                      triggerModalConfirm(
                        'Xác nhận yêu cầu không được hoàn thành',
                        markAsFailed
                      )
                    "
                  >
                    <font-awesome-icon
                      :icon="['fas', 'times']"
                      class="text-danger mr-2"
                    />
                    Không hoàn thành
                  </button>
                </div>

                <!-- MENTOR ACTION -->
                <div class="action text-center">
                  <div class="mb-3" v-if="showConfirmCompleteAction">
                    <p class="confirm-status-text mb-2">
                      Yêu cầu được đánh giá không hoàn thành. Hãy xác nhận!
                    </p>
                    <button
                      type="submit"
                      class="btn btn-md btn-mentor-action btn-anest-light m-1"
                      @click="confirmReject"
                    >
                      <font-awesome-icon
                        :icon="['fas', 'check']"
                        class="text-sea-green mr-2"
                      />Đồng ý
                    </button>
                    <button
                      type="submit"
                      class="btn btn-md btn-mentor-action btn-anest-light m-1"
                      @click="confirmConflict"
                    >
                      <font-awesome-icon
                        :icon="['fas', 'times']"
                        class="text-danger mr-2"
                      />Không đồng ý
                    </button>
                  </div>
                </div>

                <!-- CONFIRM STATUS -->
                <div class="confirm-status-wrapper text-center">
                  <p
                    class="confirm-status-text"
                    v-if="
                      request &&
                      request.confirmStatus === 'REJECT' &&
                      role === 'owner'
                    "
                  >
                    Bạn đã đánh dấu yêu cầu này không được hoàn thành, đang chờ
                    mentor xác nhận
                  </p>
                  <p
                    class="confirm-status-text"
                    v-if="
                      request &&
                      request.confirmStatus === 'CONFLICT' &&
                      ['mentor-support', 'owner'].includes(role)
                    "
                  >
                    Đã xảy ra bất đồng giữa mentor và mentee, vui lòng chờ phản
                    hồi từ phía admin
                  </p>
                </div>
              </div>
            </request-item>

            <!-- LIST PENDING-MENTOR -->
            <div class="row mb-3" v-if="showMentorPending">
              <div class="col-12">
                <fieldset class="bg-darker-ui m-0">
                  <legend>Người nhận</legend>
                  <pending-mentor
                    :key="renderKey"
                    :request="request"
                    @hired="reloadPage"
                    @hided="reloadPage"
                  />
                </fieldset>
              </div>
            </div>

            <div
              v-if="showChatComponent"
              class="chat-wrapper bg-dark-ui border-ui"
            >
              <chat-component
                :request="request"
                :users="[
                  this.request.userInfoResponse,
                  this.request.mentorInfoResponse,
                ]"
              />
            </div>
          </div>

          <div class="right-col" :class="{ 'ml-3': showMentorProfile }">
            <!-- REQUEST SUGGEST -->
            <div class="list-anest-mentor" v-if="showSuggestRequest">
              <span class="mentor-list-title">Yêu cầu khác</span>
              <template v-for="(request, index) in suggestRequests">
                <request-item
                  :key="index"
                  :request="request"
                  display-type="small-card"
                />
              </template>
            </div>

            <!-- MENTOR SUGGEST -->
            <template v-if="showMentorSuggest">
              <h6>MENTOR GỢI Ý</h6>
              <select
                v-model="mentorSuggestType"
                class="custom-select mentor-suggest-select"
              >
                <option value="all">Tất cả</option>
                <option value="anest">Anest mentor</option>
                <option value="best">Mentor có skill phù hợp</option>
                <option value="following">Mentor đang theo dõi</option>
                <option value="hired">Mentor đã thuê</option>
              </select>

              <div class="list-anest-mentor suggest-wrap mt-4">
                <mentor-suggest
                  :request="request"
                  :type="suggestType(mentorSuggestType)"
                  :skills="request ? request.skills : []"
                />
              </div>
            </template>

            <!-- MENTOR PROFILE -->
            <user-info-card
              v-if="showMentorProfile"
              :profile="request.mentorInfoResponse"
              role="mentor"
            ></user-info-card>
          </div>
        </div>
      </div>
    </div>
    <div class="container text-center" v-else>
      <h4>Request không tồn tại</h4>
      <button class="btn-anest w-25" @click="$router.push({ name: 'Home' })">
        Quay về trang chủ
      </button>
    </div>

    <rating-request-modal
      :type="actionConfirm"
      :trigger="modalTrigger"
      :request="request"
      @success="reloadPage"
    ></rating-request-modal>
  </div>
</template>

<script lang="ts">
// @ts-nochec
import { Watch, Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import AuthModule from "@/store/auth/auth.module";
import RequestModule from "@/store/request/request.module";
import NotificationModule from "@/store/notification/notification.module";
import UserFinanceOverviewModule from "../../store/profile/userFinanceOverview.module";
import { requestService } from "@/services/request/requests.service";

import { Request, Requests, RequestStatus } from "@/types/request";
import { SuggestType } from "@/types/mentor";

import InfoPanel from "@/components/utils/InfoPanel.vue";
import UserInfoCard from "@/components/card/UserInfoCard.vue";
import MentorSuggest from "./MentorSuggest.vue";
import PendingMentor from "./PendingMentor.vue";
import RequestItem from "@/components/request/RequestItem.vue";
import RatingRequestModal from "@/components/modal/RatingRequestModal.vue";
import ChatComponent from "@/components/chat/ChatComponent.vue";

import Swal from "sweetalert2";
import {
  ConfirmMixin,
  ToastError,
  ToastSucess,
} from "@/mixins/sweetalert.mixin";

@Component({
  components: {
    UserInfoCard,
    MentorSuggest,
    PendingMentor,
    RequestItem,
    RatingRequestModal,
    InfoPanel,
    ChatComponent,
  },
})
export default class RequestDetail extends Vue {
  RequestInstance = getModule(RequestModule, this.$store);
  AuthInstance = getModule(AuthModule, this.$store);
  NotificationInstance = getModule(NotificationModule, this.$store);
  UserFinanceOverviewInstance = getModule(
    UserFinanceOverviewModule,
    this.$store
  );

  renderKey = 0;

  request: Request = null;
  suggestRequests: Requests = [];
  isLoading = true;

  modalTrigger = false;
  actionConfirm = "";

  timer: number | undefined;

  timeLeft = -1;

  mentorSuggestType = "all";

  toastSucess = Swal.mixin(ToastSucess);
  toastError = Swal.mixin(ToastError);
  confirm = Swal.mixin(ConfirmMixin);

  get noti() {
    return this.NotificationInstance.lastestNoti;
  }

  @Watch("noti")
  updateOnNoti() {
    if (!this.noti || !this.noti.requestId || this.noti.read) return;
    if (this.$route.params.id == this.noti.requestId) {
      this.reloadPage();
    }
  }

  triggerModalConfirm(title: string, callback: Function) {
    this.confirm
      .fire({
        title,
      })
      .then((result) => {
        if (result.isConfirmed) {
          callback();
        }
      });
  }

  get role() {
    if (!this.AuthInstance.isAuthenticated || !this.AuthInstance.currentUser) {
      return "guest";
    }

    if (
      this.request &&
      this.request.userInfoResponse &&
      this.request.userInfoResponse.username ==
        this.AuthInstance.currentUser.username
    )
      return "owner";

    if (
      this.request &&
      this.request.mentorInfoResponse &&
      this.request.mentorInfoResponse.username ==
        this.AuthInstance.currentUser.username
    )
      return "mentor-support";

    if (this.AuthInstance.currentUser.role === "ROLE_MENTOR") return "mentor";
    return "other-user";
  }

  @Watch("request")
  @Watch("showSuggestRequest")
  async getSuggestRequests(
    newValue: Request | boolean,
    oldValue: Request | boolean
  ) {
    if (!this.request || oldValue === null) return;
    try {
      await this.RequestInstance.fetchSugggestRequests(this.request.id);
      this.suggestRequests = this.RequestInstance.getRequests;
    } catch (e) {
      this.suggestRequests = null;
      const message =
        (e as any).response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({
        icon: "error",
        title: message,
      });
    }
  }

  get sideBarItems() {
    if (this.role === "guest") {
      return [
        {
          path: "/login",
          icon: "sign-in-alt",
          text: "Đăng nhập",
          class: "text-success",
        },
        {
          path: "/signup",
          icon: "user-plus",
          text: "Đăng ký",
          class: "text-primary",
        },
      ];
    }

    if (this.role === "other-user") {
      return [
        {
          path: "/create-request",
          icon: "pencil-alt",
          text: "Tạo yêu cầu",
          class: "text-success",
        },
        {
          path: "/mentors",
          icon: "user-check",
          text: "Thuê mentor",
          class: "text-violet",
        },
      ];
    }

    if (this.role === "owner") {
      if (this.request && this.request.status === "OPEN") {
        return [
          {
            path: "/update-request/" + this.request?.id,
            icon: "pencil-alt",
            text: "Chỉnh sửa yêu cầu",
            class: "text-warning",
          },
        ];
      } else return [];
    }
    return [];
  }

  get status() {
    if (!this.request)
      return {
        text: "",
        class: "",
      };
    return RequestStatus[this.request.status];
  }

  get pathId() {
    return this.$route.params.id;
  }

  @Watch("pathId")
  reloadPage(newValue: number | null = null) {
    if (!this.request) return;
    if (newValue !== null && newValue === this.request.id) return;
    this.renderKey++;
    if (this.$route.params.id) {
      this.getRequest(this.$route.params.id);
    }
    this.UserFinanceOverviewInstance.triggerReload();
  }

  created() {
    if (this.$route.params.id) {
      this.getRequest(this.$route.params.id);
    }
  }

  mounted() {
    document.title = "Anest Learning";
  }

  startCountDownReject(startTime: number | null) {
    clearInterval(this.timer);
    if (!startTime) return;
    const now = new Date().getTime();
    this.timeLeft = startTime + 5 * 60 * 1000 - now;
    if (this.timeLeft < 0) return;
    this.timer = window.setInterval(() => {
      if (this.timeLeft <= 0) {
        this.timeLeft = -1;
        clearInterval(this.timer);
      }
      this.timeLeft -= 1000;
    }, 1000);
  }

  async getRequest(id: string) {
    const loader = this.$loading.show();
    try {
      await this.RequestInstance.getRequestById(id);
      this.request = this.RequestInstance.getRequest;
      if (this.request && this.request.startDoingTime) {
        this.startCountDownReject(this.request.startDoingTime);
      }
    } catch (e) {
      this.isLoading = false;
      this.$router.push({ name: "NotFound" });
    }
    this.isLoading = false;
    loader.hide();
  }

  suggestType(type: string) {
    switch (type) {
      case "all":
        return SuggestType.ALL;
      case "following":
        return SuggestType.FOLLOWING;
      case "hired":
        return SuggestType.HIRED;
      case "best":
        return SuggestType.BEST;
      default:
        return SuggestType.ANEST;
    }
  }

  get showSuggestRequest() {
    if (!this.request || !this.request.id) return false;
    if (
      !(
        ["mentor", "guest", "other-user"].includes(this.role) &&
        this.request.status !== "DOING" &&
        this.request.status !== "COMPLETE"
      )
    )
      return false;
    return true;
  }

  get showMentorSuggest() {
    if (!this.request) return false;
    return (
      this.role === "owner" &&
      this.request.status !== "DOING" &&
      this.request.status !== "COMPLETE"
    );
  }

  get showMentorProfile() {
    if (!this.request) return false;
    return (
      this.request.status === "DOING" || this.request.status === "COMPLETE"
    );
  }

  get showMentorPending() {
    if (!this.request) return false;
    return this.role === "owner" && this.request.status === "OPEN";
  }

  get showMarkAsCompleteAction() {
    if (!this.request) return false;
    return (
      this.role === "owner" &&
      this.request.status === "DOING" &&
      !this.request.confirmStatus
    );
  }

  get showMentorReceiveAction() {
    return (
      this.request && this.request.status === "OPEN" && this.role === "mentor"
    );
  }

  get showConfirmCompleteAction() {
    return (
      this.request &&
      this.request.confirmStatus === "REJECT" &&
      this.role === "mentor-support"
    );
  }

  get showChatComponent() {
    return (
      this.request &&
      this.request.status === "DOING" &&
      (this.role === "mentor-support" || this.role === "owner")
    );
  }

  // ACTIONS
  async closeRequest() {
    if (!this.request || !this.request.id || this.role !== "owner") return;
    try {
      const response = await requestService.closeRequest(this.request.id);
      if (response && response.status === 200) this.reloadPage();
    } catch (e) {
      const message =
        (e as any).response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  async reopenRequest() {
    if (!this.request || !this.request.id || this.role !== "owner") return;
    try {
      const response = await requestService.reopenRequest(this.request.id);
      if (response && response.status === 200) this.reloadPage();
    } catch (e) {
      const message =
        (e as any).response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  async receiveRequest() {
    if (!this.request || !this.request.id || this.role !== "mentor") return;
    try {
      const response = await requestService.receiveRequest(this.request.id);
      if (response && response.status === 200) this.reloadPage();
    } catch (e) {
      const message =
        (e as any).response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  async unReceiveRequest() {
    if (!this.request || !this.request.id || this.role !== "mentor") return;
    try {
      const response = await requestService.unReceiveRequest(this.request.id);
      if (response && response.status === 200) this.reloadPage();
    } catch (e) {
      const message =
        (e as any).response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  async confirmReject() {
    if (!this.request) return;
    try {
      const response = await requestService.mentorAcceptReject(this.request.id);
      if (response && response.status === 200) this.reloadPage();
    } catch (e) {
      const message =
        (e as any).response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  async confirmConflict() {
    if (!this.request) return;
    try {
      const response = await requestService.mentorAcceptConfict(
        this.request.id
      );
      if (response && response.status === 200) this.reloadPage();
    } catch (e) {
      const message =
        (e as any).response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  markAsFailed() {
    this.triggerConfirm("reject");
  }

  triggerConfirm(action: string) {
    this.actionConfirm = action;
    this.modalTrigger = !this.modalTrigger;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/config/color.scss";
@import "../../assets/scss/nav-pills.scss";
@import "../../assets/scss/label-info-panel.scss";

.container {
  align-items: stretch;
  max-width: 1350px;
}

.container-right {
  display: flex;
}

.right-col {
  flex: 0 0 17rem;
  margin-left: 1rem;
}

.label-info {
  padding: 1.25rem 1.25rem 1rem;
  height: 100%;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  flex-wrap: wrap;

  &__header {
    margin-top: -0.5rem;
    flex-basis: 100%;
    display: flex;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #e4e6eb;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 0.9rem;
    font-weight: 500;
  }

  &__body {
    margin-top: 0.75rem;
    display: flex;
    align-items: center;
    height: 3rem;
    font-weight: 500;
    font-size: 1.2rem;
    overflow: hidden;
  }
}

.created-text,
.status-text {
  font-weight: 500;
  margin-left: 0.5rem;
}

fieldset {
  border-radius: 0.75rem;
  padding: 1.25rem 1.25rem 1.25rem;
  margin-top: 1rem;

  legend {
    background-color: #3a3b3c;
    width: auto;
    max-width: 100%;
    font-size: 1rem;
    padding: 0.25rem 0.85rem;
    border-radius: 0.5rem;
    margin-bottom: 0;
  }

  p {
    min-height: 30vh;
  }
}

.mentor-list-title {
  display: block;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 1rem;
}

.middle-col {
  min-width: 756px;
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
}

.middle-col,
.right-col {
  max-height: calc(100vh - 10.5rem);
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar-track {
    background-color: $color-bg-dark;
  }

  &::-webkit-scrollbar {
    width: 0.75rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #24252693;
    border-radius: 1rem;
    border: 0.25rem solid $color-bg-dark;

    &:hover {
      background-color: #3a3b3c;
    }
  }
}

.btn-anest {
  width: 7rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  background-color: #3a3b3c;
  margin: 0.25rem;
  &:hover {
    background-color: #4d4f50;
  }
}

.media {
  display: flex;
  align-items: center !important;
  justify-content: center;
  margin-bottom: 0.5rem;

  &__body {
    a {
      font-size: 1rem;
      color: #c7af8b;
      display: block;

      &.username {
        font-size: 0.8rem;
        margin-bottom: 0.25rem;
      }

      &:hover {
        text-decoration: none;
        color: #ffc107;
      }
    }

    p {
      font-size: 0.895rem;
      color: #b0b3b8;
    }
  }

  .circle {
    border: 2px solid #28a745;
    border-radius: 50%;
    margin-right: 1rem;
    padding: 0.2rem;

    &:hover {
      border: 2px solid #18d844;
    }

    .avatar {
      width: 2.75rem;
      border-radius: 50%;
    }
  }
}

.text-status {
  font-size: 0.85rem !important;
  font-weight: 500 !important;
  letter-spacing: 0;
}

.bg-darker-ui {
  background-color: #24252660;
}

.bookmarked-request-content {
  padding: 1.25rem;
  position: relative;
  flex-grow: 1;
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
  margin-left: 0.25rem;
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

.chat-wrapper {
  padding: 1rem;
}

.request-item {
  padding-bottom: 4.5rem;
}

.request-item-slot-wrapper {
  position: absolute;
  height: fit-content;
  left: 0;
  bottom: 0.25rem;
  width: 100%;
}

.mentor-suggest-select {
  background: #242526;
  color: #c4c6ca;
  border: none;
  border-radius: 7px;
  cursor: pointer;
}

.list-anest-mentor {
  max-height: calc(100vh - 11.5rem);
  overflow-y: auto;
  overflow-x: hidden;

  &.suggest-wrap {
    max-height: calc(100vh - 17rem);
  }

  &::-webkit-scrollbar-track {
    background-color: $color-bg-dark;
  }

  &::-webkit-scrollbar {
    width: 0.75rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #24252693;
    border-radius: 1rem;
    border: 0.25rem solid $color-bg-dark;

    &:hover {
      background-color: #3a3b3c;
    }
  }
}

.btn-owner-action {
  min-width: 12rem !important;
}

.btn-mentor-action {
  min-width: 15rem !important;
}

.confirm-status-text {
  color: #8d8e91;
  font-size: 0.92rem;
}
</style>
