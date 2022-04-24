<template>
  <div class="pay-in">
    <h6 class="title">Phương thức thanh toán</h6>

    <div class="pay-in-info">
      <!-- Pill select bank card -->
      <ul class="row nav nav-pills" id="pills-tab" role="tablist">
        <!-- Card -->
        <li
          class="col-6 col-md-4 col-lg-3 mb-3 nav-item text-center"
          role="presentation"
        >
          <a
            class="label-info d-block border-ui active"
            id="pills-card-pay-in-tab"
            data-toggle="pill"
            href="#pills-card-pay-in"
            role="tab"
            aria-controls="pills-card"
            aria-selected="true"
          >
            <div class="flex">
              <div class="icon">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-credit-card-2-front"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"
                  />
                  <path
                    d="M2 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M2 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </div>
              <div class="number" />
            </div>
            <div class="description text-left">
              <span>Thẻ cào</span>
            </div>
          </a>
        </li>

        <!-- Banking -->
        <li
          class="col-6 col-md-4 col-lg-3 mb-3 nav-item text-center"
          role="presentation"
        >
          <a
            class="label-info d-block border-ui"
            id="pills-message-tab"
            data-toggle="pill"
            href="#pills-message"
            role="tab"
            aria-controls="pills-message"
            aria-selected="false"
          >
            <div class="flex">
              <div class="icon">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-upc-scan"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"
                  />
                  <path
                    d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"
                  />
                </svg>
              </div>
              <div class="number" />
            </div>
            <div class="description text-left">
              <span>Banking</span>
            </div>
          </a>
        </li>

        <!-- E-Wallet -->
        <li
          class="col-6 col-md-4 col-lg-3 mb-3 nav-item text-center"
          role="presentation"
        >
          <a
            class="label-info d-block border-ui"
            id="pills-e-wallet-tab"
            data-toggle="pill"
            href="#pills-e-wallet"
            role="tab"
            aria-controls="pills-e-wallet"
            aria-selected="false"
          >
            <div class="flex">
              <div class="icon">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-wallet2"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 4l10-3A1.5 1.5 0 0 1 14 2.5v2h-1v-2a.5.5 0 0 0-.5-.5L5.833 4H2.5z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M1 5.5A1.5 1.5 0 0 1 2.5 4h11A1.5 1.5 0 0 1 15 5.5v8a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 13.5v-8zM2.5 5a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-11z"
                  />
                </svg>
              </div>
              <div class="number" />
            </div>
            <div class="description text-left">
              <span>MoMo</span>
            </div>
          </a>
        </li>

        <!-- QR Pay -->
        <li
          class="col-6 col-md-4 col-lg-3 mb-3 nav-item text-center"
          role="presentation"
        >
          <a
            class="label-info d-block border-ui"
            id="pills-qr-pay-tab"
            data-toggle="pill"
            href="#pills-qr-pay"
            role="tab"
            aria-controls="pills-qr-pay"
            aria-selected="false"
          >
            <div class="flex">
              <div class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  class="bi bi-wallet"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z"
                  />
                </svg>
              </div>
              <div class="number" />
            </div>
            <div class="description text-left">
              <span>AirPay</span>
            </div>
          </a>
        </li>
      </ul>

      <!-- Pill bank card content -->
      <div class="row">
        <div class="col-md-12">
          <div class="tab-content" id="pills-tabContent">
            <!-- Card -->
            <div
              class="tab-pane fade show active"
              id="pills-card-pay-in"
              role="tabpanel"
              aria-labelledby="pills-card-pay-in-tab"
            >
              <div class="method-pay-in">
                <h6 class="title">Thông tin thẻ</h6>
                <div class="method-pay-in-info bg-dark-ui border-ui mb-3">
                  <div class="row">
                    <div class="col-md-12">
                      <ValidationObserver v-slot="{ invalid }">
                        <form>
                          <div class="form-row" v-if="anestCard">
                            <div class="form-group col-md-6">
                              <validation-provider
                                ref="serial"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <fieldset
                                  v-bind:class="
                                    errors.length !== 0 ? 'is-invalid' : ''
                                  "
                                  v-tooltip.bottom="{
                                    content: errors[0],
                                    class:
                                      errors.length !== 0
                                        ? 'anest-tooltip'
                                        : 'tooltip-hide'
                                  }"
                                >
                                  <legend>Số serial</legend>
                                  <input
                                    type="text"
                                    name="số serial"
                                    class="form-control"
                                    v-model="anestCard.serial"
                                  />
                                </fieldset>
                              </validation-provider>
                            </div>
                            <div class="form-group col-md-6">
                              <validation-provider
                                ref="code"
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <fieldset
                                  v-bind:class="
                                    errors.length !== 0 ? 'is-invalid' : ''
                                  "
                                  v-tooltip.bottom="{
                                    content: errors[0],
                                    class:
                                      errors.length !== 0
                                        ? 'anest-tooltip'
                                        : 'tooltip-hide'
                                  }"
                                >
                                  <legend>Mã thẻ nạp</legend>
                                  <input
                                    type="text"
                                    name="mã thẻ nạp"
                                    class="form-control"
                                    v-model="anestCard.code"
                                  />
                                </fieldset>
                              </validation-provider>
                            </div>
                            <div class="col-md-12 text-right">
                              <button
                                @click.prevent="payInMoney"
                                type="submit"
                                :disabled="invalid"
                                class="btn btn-lg btn-gray mb-3"
                              >
                                <font-awesome-icon
                                  class="text-sea-green mr-2"
                                  :icon="['fas', 'check']"
                                />Xác nhận
                              </button>
                            </div>
                          </div>
                        </form>
                      </ValidationObserver>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- SMS -->
            <div
              class="tab-pane fade"
              id="pills-message"
              role="tabpanel"
              aria-labelledby="pills-message-tab"
            >
              <div class="method-pay-in">
                <h6 class="title">Thanh toán bằng tài khoản ngân hàng</h6>
                <div class="method-pay-in-info bg-dark-ui border-ui mb-3">
                  <div class="tab-content" id="v-pills-tabContent">
                    <div>
                      <div class="px-5 text-center">
                        <p class="mt-2">
                          Quét mã QR dưới đây để thanh toán.
                        </p>
                        <div class="qr-code my-3">
                          <img
                            src="../../assets/images/QR_TPB.png"
                            width="180"
                          />
                        </div>
                        <p class="small text-muted mb-2">
                          Cú pháp: ANEST_username_nội dung_số điện thoại
                        </p>
                        <p class="small text-muted mb-2">
                          Ví dụ: ANEST_anhth_nạp tiền_0345090445
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- E-Wallet -->
            <div
              class="tab-pane fade"
              id="pills-e-wallet"
              role="tabpanel"
              aria-labelledby="pills-e-wallet-tab"
            >
              <div class="method-pay-in">
                <h6 class="title">Thanh toán bằng ví MoMo</h6>
                <div class="method-pay-in-info bg-dark-ui border-ui mb-3">
                  <div class="tab-content" id="v-pills-tabContent">
                    <div
                      class="tab-pane fade show active"
                      id="v-pills-1-2"
                      role="tabpanel"
                      aria-labelledby="v-pills-1-2-tab"
                    >
                      <div class="px-5 text-center">
                        <p class="mt-2">
                          Quét mã QR dưới đây để thanh toán.
                        </p>
                        <div class="qr-code my-3">
                          <img src="../../assets/images/momo.png" width="180" />
                        </div>
                        <p class="small text-muted mb-2">
                          Cú pháp: ANEST_username_nội dung_số điện thoại
                        </p>
                        <p class="small text-muted mb-2">
                          Ví dụ: ANEST_anhth_nạp tiền_0345090445
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- QR Pay -->
            <div
              class="tab-pane fade"
              id="pills-qr-pay"
              role="tabpanel"
              aria-labelledby="pills-qr-pay-tab"
            >
              <div class="method-pay-in">
                <h6 class="title">Thanh toán bằng ví AirPay</h6>
                <div class="method-pay-in-info bg-dark-ui border-ui mb-3">
                  <div class="tab-content" id="v-pills-tabContent">
                    <div
                      class="tab-pane fade show active"
                      id="v-pills-1-4"
                      role="tabpanel"
                      aria-labelledby="v-pills-1-4-tab"
                    >
                      <div class="px-5 text-center">
                        <p class="mt-2">
                          Quét mã QR dưới đây để thanh toán.
                        </p>
                        <div class="qr-code my-3">
                          <img
                            src="../../assets/images/airpay.png"
                            width="180"
                          />
                        </div>
                        <p class="small text-muted mb-2">
                          Cú pháp: ANEST_username_nội dung_số điện thoại
                        </p>
                        <p class="small text-muted mb-2">
                          Ví dụ: ANEST_anhth_nạp tiền_0345090445
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <quick-action>
      <div class="row">
        <div class="col-12 col-md-4 col-lg-4 mb-3">
          <router-link class="border-ui" :to="{ name: 'TransactionHistory' }">
            <font-awesome-icon class="mr-2" :icon="['fas', 'history']" />Lịch sử
            giao dịch
          </router-link>
        </div>
        <div class="col-12 col-md-4 col-lg-4 mb-3">
          <router-link class="border-ui" :to="{ name: 'SettingEwallet' }">
            <font-awesome-icon
              class="fa-flip-horizontal mr-2"
              :icon="['fas', 'pencil-alt']"
            />Sửa thông tin ví
          </router-link>
        </div>
        <div class="col-12 col-md-4 col-lg-4 mb-3">
          <router-link class="border-ui" :to="{ name: 'SettingEwallet' }">
            <font-awesome-icon class="mr-2" :icon="['fas', 'plus']" />Thêm ví
            điện tử
          </router-link>
        </div>
      </div>
    </quick-action>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import QuickAction from "@/components/utils/QuickAction.vue";
import { payInService } from "@/services/profile/payIn.service";
import { AnestCard } from "@/types/profile/anestCard";

import UserFinanceOverviewModule from "../../store/profile/userFinanceOverview.module";

import { UserFinanceOverview } from "@/types/profile/userFinanceOverview";

import Swal from "sweetalert2";
import { ToastSucess } from "@/mixins/sweetalert.mixin";
import { ToastError } from "@/mixins/sweetalert.mixin";

import { ValidationProvider } from "vee-validate";

@Component({
  components: {
    QuickAction,
    ValidationProvider
  }
})
export default class PayIn extends Vue {
  private userFinanceOverview: UserFinanceOverview = null;

  private UserFinanceOverviewInstance = getModule(
    UserFinanceOverviewModule,
    this.$store
  );
  async mounted() {
    document.title = "Trang nạp tiền";
  }

  anestCard: AnestCard = {
    serial: "",
    code: ""
  };

  toastSucess = Swal.mixin(ToastSucess);

  toastError = Swal.mixin(ToastError);

  async payInMoney() {
    const loader = this.$loading.show();
    try {
      const response = await payInService.requestUsingAnestCard(this.anestCard);

      if (response.status == 200 && this.anestCard) {
        this.toastSucess.fire({
          icon: "success",
          title: "Nạp tiền thành công"
        });
        this.anestCard.serial = "";
        this.anestCard.code = "";
        (this.$refs["serial"] as InstanceType<
          typeof ValidationProvider
        >).reset();
        (this.$refs["code"] as InstanceType<typeof ValidationProvider>).reset();
      }
      await this.UserFinanceOverviewInstance.fetchUserFinanceOverview();
      this.userFinanceOverview = this.UserFinanceOverviewInstance.getUserFinanceOverview;

      this.UserFinanceOverviewInstance.setUserFinanceOverview(
        this.userFinanceOverview
      );

      this.UserFinanceOverviewInstance.triggerReload();
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    } finally {
      loader.hide();
    }
  }
}
</script>

<style scoped lang="scss">
.right {
  .pay-in .pay-in-info ul li a {
    color: #e4e6eb;
    background-color: #242526;

    &:hover {
      text-decoration: none;
      background-color: #3a3b3c !important;
    }

    &.active {
      background-color: #3a3b3c;
    }
  }

  .tab-content .method-pay-in .method-pay-in-info {
    padding: 1rem;

    .nav-link {
      color: #e4e6eb;
      padding: 0.5rem 1rem;
      border-radius: 0.45rem;
    }

    .sms {
      background-color: #3a3b3c;
      padding: 0.75rem;
      font-size: 1.2rem;
      font-weight: 500;

      span {
        font-weight: normal;
        font-size: 0.95rem;
        margin: 0 0.5rem;
      }
    }
  }

  .nav-pills .nav-link.active,
  .nav-pills .show > .nav-link {
    background-color: #3a3b3c;
  }
}
.form-group .is-invalid {
  border-color: #f18072 !important;
}

@import "../../assets/scss/label-info-panel.scss";
@import "../../assets/scss/form.scss";
</style>
