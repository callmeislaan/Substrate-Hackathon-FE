<template>
  <div class="wrapper" :class="{ show: modalShown }">
    <div
      ref="register-modal"
      class="modal"
      :class="{ show: modalShown }"
      id="registerModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="registerModal"
      aria-hidden="true"
      @click.self="hideModal"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="hideModal"
            >
              <span aria-hidden="true">
                <svg
                  class="bi bi-x"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                  />
                </svg>
              </span>
            </button>
          </div>
          <div class="modal-body p-0" id="style-modal">
            <div class="container"></div>
            <div class="container">
              <div class="divider tan">THUÊ MENTOR</div>
              <ValidationObserver v-slot="{ invalid }">
                <form id="register-form">
                  <input type="hidden" name="time" id="time" />
                  <div class="form-group text">
                    <label class="color-tan"
                      >Tiêu đề<sup><i class=" ml-1"></i></sup
                    ></label>
                    <validation-provider rules="required" v-slot="{ errors }">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <i>
                              <font-awesome-icon
                                class="tan mr-2"
                                :icon="['fas', 'code']"
                                fixed-width
                              />
                            </i>
                          </div>
                        </div>

                        <input
                          v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                          v-tooltip.bottom="{
                            content: errors[0],
                            class:
                              errors.length !== 0
                                ? 'anest-tooltip'
                                : 'tooltip-hide'
                          }"
                          type="text"
                          class="form-control form-control-lg"
                          name="course"
                          v-model="mentorHiring.title"
                        />
                      </div>
                    </validation-provider>
                  </div>
                  <div class="form-group text">
                    <label class="color-tan"
                      >Nội dung thuê<sup
                        ><i class="far fa-comment ml-1"></i></sup
                    ></label>
                    <validation-provider rules="required" v-slot="{ errors }">
                      <textarea
                        v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                        v-tooltip.bottom="{
                          content: errors[0],
                          class:
                            errors.length !== 0
                              ? 'anest-tooltip'
                              : 'tooltip-hide'
                        }"
                        class="form-control form-control-lg"
                        name="your_expectations_for_mentor"
                        rows="2"
                        v-model="mentorHiring.note"
                      ></textarea>
                    </validation-provider>
                  </div>
                  <button
                    type="submit"
                    id="submit-form"
                    :disabled="invalid"
                    class="btn-submit tan"
                    @click.prevent="requestRentMentor"
                  >
                    THUÊ MENTOR
                  </button>
                </form>
              </ValidationObserver>
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
import { MentorHiring } from "@/types/mentor/rentMentor";
import { mentorService } from "@/services/mentor/mentors.service";
import Swal from "sweetalert2";
import { ToastSucess } from "@/mixins/sweetalert.mixin";
import { ToastError } from "@/mixins/sweetalert.mixin";
@Component
export default class RentMentorModal extends Vue {
  @Prop({ type: String, default: "Xác nhận thực hiện tác vụ" })
  readonly title!: string;

  @Prop() params!: string;

  mentorHiring: MentorHiring = {
    mentorId: parseInt(this.params),
    title: "",
    note: ""
  };

  @Prop(Boolean) trigger!: boolean;

  modalShown = false;

  emitConfirm() {
    this.$emit("confirm");
    this.hideModal();
  }

  toastSucess = Swal.mixin(ToastSucess);

  toastError = Swal.mixin(ToastError);

  async requestRentMentor() {
    try {
      await mentorService.requestRentMentor(this.mentorHiring);
      this.toastSucess.fire({
        icon: "success",
        title: "Gửi thông tin thuê mentor thành công"
      });
      this.hideModal();
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  @Watch("trigger")
  toogleModal() {
    this.modalShown = true;
  }

  hideModal() {
    this.modalShown = false;
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: none;
  &.show {
    display: block !important;
  }
}

.modal-content {
  margin: auto;
  width: 16%;
  min-width: 500px;
}
.btn {
  min-width: 8.2rem;
  font-size: 1.05rem !important;
}
#registerModal .modal-content {
  border-radius: 0;
  background-color: #1d1d1d;
  border: none;
}

#registerModal .modal-header {
  border-bottom: 1px solid transparent !important;
  padding: 20px;
}

#registerModal .modal-header .close {
  font-size: 35px;
  padding: 5px 16px;
  color: #d4d4d4;
  text-shadow: none;
}

#registerModal .modal-header .close:hover {
  color: #ffcf5c;
}

#registerModal .modal-header .close:focus {
  outline: none;
}

#registerModal
  .modal-body
  .custom-control-input:checked
  ~ .custom-control-label::before {
  color: #fff;
  border-color: #c7af8b;
  background-color: #c7af8b;
}

#registerModal .modal-body p {
  line-height: 25px;
}

#registerModal .modal-body form {
  max-width: 500px;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 90px;
}

#registerModal .modal-body .form-control {
  border: 1px solid #333;
  background-color: #151515;
  border-radius: 0 5px 5px 0;
  color: #aaa;
}

#registerModal .modal-body .custom-select {
  height: calc(1.5em + 1rem + 2px);
}

#registerModal .modal-body .form-control .custom-control-label {
  font-size: 1rem;
}

#registerModal .modal-body .form-control.form-control-lg {
  font-size: 17px;
}

#registerModal .modal-body .form-control:focus {
  box-shadow: none;
  border-color: #6f6350;
}

#registerModal .modal-body .input-group-text {
  border-radius: 5px 0 0 5px;
  padding: 0.375rem 1rem;
  border: 1px solid #333;
  background-color: #1c1c1c;
  font-size: 17px;
  color: #c7af8b;
}

#registerModal .modal-body input.form-control {
  border-radius: 0 5px 5px 0;
}

#registerModal .modal-body textarea.form-control {
  border-radius: 5px;
}

#registerModal .modal-body .btn-submit {
  border: none;
  font-size: 1rem;
  border: 1px solid #333;
  background-color: #151515;
  border-radius: 0.25rem;
  height: calc(2.25em + 7px);
  width: 94%;
  font-weight: 500;
  color: #c7af8b;
  margin-left: 0.9rem;
}

.text label {
  font-size: 15px;
}

#registerModal .modal-body .btn-submit:hover {
  outline: 0;
  color: #ffcf5c;
  box-shadow: none;
  background-color: #282828;
}

#registerModal .form-group textarea {
  height: 270px;
  resize: none;
}

@media (max-width: 575.98px) {
  #registerModal .modal-dialog {
    margin-left: 0;
    margin-right: 0;
  }
  #registerModal .modal-body {
    max-height: 80vh;
    overflow-y: auto;
  }
  #registerModal .modal-body form {
    margin-top: 40px;
  }
}

.divider {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 20px;
}

.divider:before,
.divider:after {
  content: "";
  // height: 2px;
  background-color: #544e45;
  flex: 1;
}
.color-yellow {
  color: yellow;
}

.tan {
  color: #c7af8b;
}
// .divider:before {
//   margin-right: 20px;
// }

// .divider:after {
//   margin-left: 20px;
// }

#registerModal .form-group {
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>
