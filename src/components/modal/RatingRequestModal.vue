<template>
  <div class="wrapper" :class="{ show: modalShown }">
    <div
      ref="confirm-modal"
      class="modal"
      :class="{ show: modalShown }"
      id="confirmModal"
      tabindex="-1"
      role="dialog"
      @click.self="hideModal(false)"
    >
      <div
        class="modal-dialog modal-dialog-centered"
        role="document"
        v-if="modalShown"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="text-center w-100 mt-3">
              Đánh giá mentor
            </h4>
            <button type="button" class="close" @click="hideModal(false)">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body pt-3" v-if="request">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div class="mentor-info mr-5">
                <div class="media align-items-center">
                  <a href="" class="circle">
                    <img
                      class="avatar"
                      v-if="mentor.profileImgPath"
                      :src="mentor.profileImgPath"
                      alt="avatar"
                    />
                    <img
                      v-else-if="mentor.gender"
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
                  <div class="media__body">
                    <a href="">{{ mentor.fullName }}</a>
                    <a href="" class="username">@{{ mentor.username }}</a>
                  </div>
                </div>
              </div>
              <rating-input
                class="text-warning"
                @rate="setRating"
              ></rating-input>
            </div>
            <fieldset class="bg-dark-ui">
              <legend>Đánh giá</legend>
              <textarea
                v-model="comment"
                placeholder="Đánh giá của bạn"
                type="text"
                class="form-control"
                rows="6"
              />
            </fieldset>
          </div>
          <div class="modal-footer pb-4">
            <div class="text-center w-100">
              <button
                type="button"
                class="btn btn-lg btn-anest-light"
                @click="emitConfirm"
              >
                <font-awesome-icon
                  :icon="['fas', 'check']"
                  class="text-sea-green"
                ></font-awesome-icon>
                <span class="btn-text" @click="submitRating">
                  Xác nhận đánh giá
                </span>
              </button>
              <button
                v-if="type === 'reject'"
                type="button"
                class="btn btn-lg btn-anest-light ml-3"
                @click="emitConfirm"
              >
                <font-awesome-icon
                  :icon="['fas', 'times']"
                  class="text-danger"
                ></font-awesome-icon>
                <span class="btn-text" @click="hideModal(false)">
                  Bỏ qua đánh giá
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop" :class="{ show: modalShown }"></div>
  </div>
</template>

<script lang="ts">
import { Watch, Prop, Component, Vue } from "vue-property-decorator";

import { Request, RequestRating } from "@/types/request";

import RatingInput from "@/components/utils/RatingInput.vue";
import { requestService } from "@/services/request/requests.service";

import Swal from "sweetalert2";
import { ToastError } from "@/mixins/sweetalert.mixin";

@Component({
  components: {
    RatingInput
  }
})
export default class RatingRequestModal extends Vue {
  @Prop(Boolean) trigger!: boolean;

  @Prop() readonly request!: Request;

  @Prop() readonly type!: string;

  get mentor() {
    if (!this.request || !this.request.mentorInfoResponse) return null;
    return this.request.mentorInfoResponse;
  }

  modalShown = false;
  rating = 0;
  comment = "";

  emitConfirm() {
    this.$emit("confirm");
  }

  @Watch("trigger")
  toogleModal() {
    this.reset();
    this.modalShown = true;
  }

  reset() {
    this.rating = 0;
    this.comment = "";
  }

  toastError = Swal.mixin(ToastError);

  async hideModal(submited = false) {
    if (!this.request) {
      this.modalShown = false;
      return;
    }
    if (!submited && this.type === "reject") {
      const response = await requestService.markAsFailed({
        requestId: this.request.id,
        rating: null,
        comment: null
      });
      if (response && response.status === 200) {
        this.$emit("success", response.data.message);
      }
    }
    this.modalShown = false;
  }

  setRating(value: number) {
    this.rating = value;
  }

  async submitRating() {
    if (!this.request) return;
    const params: RequestRating = {
      requestId: this.request.id,
      rating: this.rating,
      comment: this.comment
    };
    try {
      let response;
      switch (this.type) {
        case "complete":
          response = await requestService.markAsComplete(params);
          break;
        case "reject":
          response = await requestService.markAsFailed(params);
          break;
      }
      if (response && response.status === 200) {
        this.hideModal(true);
        this.$emit("success", response.data.message);
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }
}
</script>

<style lang="scss" scoped>
fieldset {
  border: 2px solid #3a3b3c;
  padding: 0 0.75rem 0.5rem;
  border-radius: 0.45rem;

  legend {
    background-color: #242526;
    width: auto;
    max-width: 100%;
    font-size: 0.9rem;
    padding: 0 0.5rem;
    border-radius: 0.45rem;
    margin-bottom: 0;
    font-weight: 500;
    color: #b0b3b8;
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
  textarea.form-control {
    height: auto !important;
  }
}

.wrapper {
  display: none;
  &.show {
    display: block !important;
  }
}
.btn {
  min-width: 12rem;
}

.media {
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
      margin: 0;
    }
  }

  .circle {
    border: 3px solid #28a745;
    border-radius: 50%;
    margin-right: 1rem;
    padding: 0.35rem;

    &:hover {
      border: 3px solid #18d844;
    }

    .avatar {
      width: 3.25rem;
      border-radius: 50%;
    }
  }
}

.modal-body {
  width: 576px;
  margin: auto;
}

.modal-dialog {
  justify-content: center;
}

.modal-content {
  border-radius: 1rem !important;
  width: 60vh;
  min-width: 625px;
}
</style>
