<template>
  <div>
    <div class="overview">
      <div class="row">
        <div class="col-12 col-md-6 col-lg-6 mb-3">
          <div class="label-info bg-dark-ui border-ui">
            <div class="flex">
              <div class="icon">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-wallet2 text-tomato"
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
              <div class="number">
                <h4>
                  {{
                    formatMoney(
                      this.UserFinanceInstance.userFinanceOverview
                        .totalMoneyCurrent
                    )
                  }}<sup>đ</sup>
                </h4>
              </div>
            </div>
            <div class="description">
              <span>Ví thu / Ví rút</span>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-6 mb-3">
          <div class="label-info bg-dark-ui border-ui">
            <p class="mb-0">
              – Bạn chỉ có thể rút được số tiền có trong
              <span class="text-tomato">VÍ THU</span>.
            </p>
            <p class="mb-0">
              – Giao dịch rút tiền sẽ được xử lý trong 3 - 5 ngày làm việc.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="menu">
      <ul class="row nav nav-pills" id="pills-tab" role="tablist">
        <li
          class="col-6 col-md-6 mb-3 nav-item text-center"
          role="presentation"
        >
          <a
            class="nav-link font-weight-500 active"
            id="pills-bank-card-tab"
            data-toggle="pill"
            href="#pills-bank-card"
            role="tab"
            aria-controls="pills-bank-card"
            aria-selected="true"
          >
            Thẻ ngân hàng
          </a>
        </li>
        <li
          class="col-6 col-md-6 mb-3 nav-item text-center"
          role="presentation"
        >
          <a
            class="nav-link font-weight-500"
            id="pills-e-wallet-tab"
            data-toggle="pill"
            href="#pills-e-wallet"
            role="tab"
            aria-controls="pills-e-wallet"
            aria-selected="false"
          >
            Ví điện tử
          </a>
        </li>
      </ul>
    </div>

    <div class="tab-content" id="pills-tabContent">
      <div
        class="tab-pane fade show active"
        id="pills-bank-card"
        role="tabpanel"
        aria-labelledby="pills-bank-card-tab"
      >
        <div class="row">
          <div class="col-md-12">
            <div class="withdraw" v-if="bankCards.length && currentBank">
              <h6 class="title">Thẻ ngân hàng liên kết</h6>
              <div class="withdraw-info">
                <!-- Pill select bank card -->

                <ul class="row nav nav-pills" id="pills-tab-2" role="tablist">
                  <li
                    v-for="(bank, index) in bankCards"
                    :key="index"
                    class="col-12 col-md-6 col-lg-4 mb-3 nav-item text-center"
                    role="presentation"
                    @click="selectBank(bank)"
                  >
                    <a
                      class="label-info d-block border-ui"
                      :class="{ active: bankCards[index] === currentBank }"
                      data-toggle="pill"
                      role="tab"
                      aria-controls="pills-bank-card-1"
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
                        <div class="number">
                          <h4>{{ bank.accountNumber }}</h4>
                        </div>
                      </div>
                      <div class="description text-left">
                        <span>{{ bank.bank }}</span>
                      </div>
                    </a>
                  </li>
                </ul>

                <!-- Pill bank card content -->
                <div class="tab-content" id="pills-tabContent-2">
                  <div class="tab-pane fade show active">
                    <div class="bank-card">
                      <h6 class="title">Thông tin rút tiền</h6>
                      <div class="bank-card-info bg-dark-ui border-ui mb-3">
                        <ValidationObserver v-slot="{ invalid }">
                          <form>
                            <div class="form-row">
                              <div class="form-group col-md-6">
                                <fieldset class="bg-dark-ui">
                                  <legend>Họ & tên chủ thẻ</legend>
                                  <input
                                    type="text"
                                    class="form-control"
                                    :value="currentBank.holderName"
                                    readonly
                                  />
                                </fieldset>
                              </div>
                              <div class="form-group col-md-6">
                                <fieldset class="bg-dark-ui">
                                  <legend>Ngân hàng</legend>
                                  <input
                                    type="text"
                                    class="form-control"
                                    :value="currentBank.bank"
                                    readonly
                                  />
                                </fieldset>
                              </div>
                              <div class="form-group col-md-6">
                                <fieldset class="bg-dark-ui">
                                  <legend>Số tài khoản</legend>
                                  <input
                                    type="text"
                                    class="form-control"
                                    :value="currentBank.accountNumber"
                                    readonly
                                  />
                                </fieldset>
                              </div>
                              <div class="form-group col-md-6">
                                <fieldset class="bg-dark-ui">
                                  <legend>Chi nhánh</legend>
                                  <input
                                    type="text"
                                    class="form-control"
                                    :value="currentBank.branch"
                                    readonly
                                  />
                                </fieldset>
                              </div>
                              <div class="form-group col-md-12">
                                <validation-provider
                                  ref="amount-bank"
                                  rules="required|amount|limitAmount"
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
                                    <legend>Số tiền</legend>
                                    <input
                                      type="number"
                                      name="số tiền muốn rút"
                                      class="form-control"
                                      placeholder="Nhập số tiền muốn rút"
                                      v-model="amount.amount"
                                      required
                                    />
                                  </fieldset>
                                </validation-provider>
                              </div>
                              <div class="col-md-12 text-right">
                                <button
                                  type="submit"
                                  :disabled="invalid"
                                  class="btn btn-lg btn-gray mb-3"
                                  @click.prevent="
                                    withdrawWithBankCard(currentBank.id)
                                  "
                                >
                                  <font-awesome-icon
                                    class="text-sea-green mr-2"
                                    :icon="['fas', 'reply']"
                                  />Rút tiền
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
            </div>
            <div class="withdraw" v-else>
              <div class="col-12 col-md-12 col-lg-12 mb-3">
                <div class="label-info bg-dark-ui border-ui">
                  <h6 class="title">Chưa thêm thẻ ngân hàng</h6>
                </div>
              </div>
            </div>
            <quick-action>
              <div class="row">
                <div class="col-12 col-md-4 col-lg-4 mb-3">
                  <router-link
                    class="border-ui"
                    :to="{ name: 'TransactionHistory' }"
                  >
                    <font-awesome-icon
                      class="mr-2"
                      :icon="['fas', 'history']"
                    />Lịch sử giao dịch
                  </router-link>
                </div>
                <div class="col-12 col-md-4 col-lg-4 mb-3">
                  <router-link
                    class="border-ui"
                    :to="{ name: 'SettingBankCard' }"
                  >
                    <font-awesome-icon
                      class="fa-flip-horizontal mr-2"
                      :icon="['fas', 'pencil-alt']"
                    />Sửa thông tin thẻ
                  </router-link>
                </div>
                <div class="col-12 col-md-4 col-lg-4 mb-3">
                  <router-link
                    class="border-ui"
                    :to="{ name: 'SettingBankCard' }"
                  >
                    <font-awesome-icon
                      class="mr-2"
                      :icon="['fas', 'plus']"
                    />Thêm thẻ ngân hàng
                  </router-link>
                </div>
              </div>
            </quick-action>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="pills-e-wallet"
        role="tabpanel"
        aria-labelledby="pills-e-wallet-tab"
      >
        <div class="row">
          <div class="col-md-12">
            <div class="withdraw" v-if="eWallets.length && currentEwallet">
              <h6 class="title">Ví điện tử liên kết</h6>
              <div class="withdraw-info">
                <!-- Pill select e-wallet card -->
                <ul class="row nav nav-pills" id="pills-tab-3" role="tablist">
                  <li
                    v-for="(eWallet, index) in eWallets"
                    :key="index"
                    class="col-12 col-md-6 col-lg-4 mb-3 nav-item text-center"
                    role="presentation"
                    @click="selectEwallet(eWallet)"
                  >
                    <a
                      class="label-info d-block border-ui"
                      :class="{ active: eWallets[index] === currentEwallet }"
                      data-toggle="pill"
                      role="tab"
                      aria-selected="true"
                    >
                      <div class="flex">
                        <div class="icon">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            class="bi bi-credit-card-2-back"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M14 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"
                            />
                            <path
                              d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1zM1 9h14v2H1V9z"
                            />
                          </svg>
                        </div>
                        <div class="number">
                          <h4>{{ eWallet.phone }}</h4>
                        </div>
                      </div>
                      <div class="description text-left">
                        <span>{{ eWallet.eWalletName }}</span>
                      </div>
                    </a>
                  </li>
                </ul>

                <!-- Pill e-wallet content -->
                <div
                  class="tab-content"
                  id="pills-tabContent-2"
                  v-if="currentEwallet && amount"
                >
                  <div
                    class="tab-pane fade show active"
                    id="pills-e-wallet-1"
                    role="tabpanel"
                    aria-labelledby="pills-e-wallet-1-tab"
                  >
                    <div class="row">
                      <div class="col-md-12">
                        <div class="bank-card">
                          <h6 class="title">Thông tin rút tiền</h6>
                          <div class="bank-card-info bg-dark-ui border-ui mb-3">
                            <div class="row">
                              <div class="col-md-12">
                                <ValidationObserver v-slot="{ invalid }">
                                  <form>
                                    <div class="form-row">
                                      <div class="form-group col-md-6">
                                        <fieldset class="bg-dark-ui">
                                          <legend>Họ & tên</legend>
                                          <input
                                            type="text"
                                            class="form-control"
                                            :value="currentEwallet.holderName"
                                            readonly
                                          />
                                        </fieldset>
                                      </div>
                                      <div class="form-group col-md-6">
                                        <fieldset class="bg-dark-ui">
                                          <legend>Tên ví</legend>
                                          <input
                                            type="text"
                                            class="form-control"
                                            :value="currentEwallet.eWalletName"
                                            readonly
                                          />
                                        </fieldset>
                                      </div>
                                      <div class="form-group col-md-6">
                                        <fieldset class="bg-dark-ui">
                                          <legend>Số điện thoại</legend>
                                          <input
                                            type="text"
                                            class="form-control"
                                            :value="currentEwallet.phone"
                                            readonly
                                          />
                                        </fieldset>
                                      </div>
                                      <div class="form-group col-md-6">
                                        <validation-provider
                                          ref="amount-ewallet"
                                          rules="required|amount"
                                          v-slot="{ errors }"
                                        >
                                          <fieldset
                                            v-bind:class="
                                              errors.length !== 0
                                                ? 'is-invalid'
                                                : ''
                                            "
                                            v-tooltip.bottom="{
                                              content:
                                                errors.length !== 0
                                                  ? errors[0]
                                                  : '',
                                              class:
                                                errors.length !== 0
                                                  ? 'anest-tooltip'
                                                  : 'tooltip-hide'
                                            }"
                                          >
                                            <legend>Số tiền</legend>
                                            <input
                                              type="number"
                                              class="form-control"
                                              placeholder="Nhập số tiền muốn rút"
                                              v-model="amount.amount"
                                              name="số tiền muốn rút"
                                            />
                                          </fieldset>
                                        </validation-provider>
                                      </div>
                                      <div class="col-md-12 text-right">
                                        <button
                                          type="submit"
                                          :disabled="invalid"
                                          class="btn btn-lg btn-gray mb-3"
                                          @click.prevent="
                                            withdrawWithEwallet(
                                              currentEwallet.id
                                            )
                                          "
                                        >
                                          <font-awesome-icon
                                            class="text-sea-green mr-2"
                                            :icon="['fas', 'reply']"
                                          />Rút tiền
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="withdraw" v-else>
              <div class="col-12 col-md-12 col-lg-12 mb-3">
                <div class="label-info bg-dark-ui border-ui">
                  <h6 class="title">Chưa thêm ví điện tử</h6>
                </div>
              </div>
            </div>
            <quick-action>
              <div class="row">
                <div class="col-12 col-md-4 col-lg-4 mb-3">
                  <router-link
                    class="border-ui"
                    :to="{ name: 'TransactionHistory' }"
                  >
                    <font-awesome-icon
                      class="mr-2"
                      :icon="['fas', 'history']"
                    />Lịch sử giao dịch
                  </router-link>
                </div>
                <div class="col-12 col-md-4 col-lg-4 mb-3">
                  <router-link
                    class="border-ui"
                    :to="{ name: 'SettingEwallet' }"
                  >
                    <font-awesome-icon
                      class="fa-flip-horizontal mr-2"
                      :icon="['fas', 'pencil-alt']"
                    />Sửa thông tin ví
                  </router-link>
                </div>
                <div class="col-12 col-md-4 col-lg-4 mb-3">
                  <router-link
                    class="border-ui"
                    :to="{ name: 'SettingEwallet' }"
                  >
                    <font-awesome-icon
                      class="mr-2"
                      :icon="['fas', 'plus']"
                    />Thêm ví điện tử
                  </router-link>
                </div>
              </div>
            </quick-action>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QuickAction from "@/components/utils/QuickAction.vue";
import { getModule } from "vuex-module-decorators";
import BankCardModule from "../../store/profile/bankCard.module";
import { BankCard, BankCards } from "@/types/profile/bankCard";

import EWalletModule from "../../store/profile/eWallet.module";
import { EWallet, EWallets } from "@/types/profile/eWallet";

import { mentorService } from "../../services/mentor/mentors.service";

import { Amount } from "@/types/withdrawal/amount";

import UserFinanceOverviewModule from "../../store/profile/userFinanceOverview.module";

import { ValidationProvider } from "vee-validate";

import Swal from "sweetalert2";
import { ToastSucess } from "@/mixins/sweetalert.mixin";
import { ToastError } from "@/mixins/sweetalert.mixin";

@Component({
  components: {
    QuickAction,
    ValidationProvider
  }
})
export default class Withdraw extends Vue {
  private UserFinanceOverviewInstance = getModule(
    UserFinanceOverviewModule,
    this.$store
  );

  private currentBank: BankCard = {
    id: "",
    holderName: "",
    accountNumber: "",
    bank: "",
    branch: ""
  };

  private currentEwallet: EWallet = {
    id: "",
    holderName: "",
    eWalletName: "",
    phone: ""
  };
  private bankCards: BankCards = [];
  private BankCardInstance = getModule(BankCardModule, this.$store);

  // private eWallet: EWallet = null;
  private eWallets: EWallets = [];
  private EWalletInstance = getModule(EWalletModule, this.$store);
  private UserFinanceInstance = getModule(
    UserFinanceOverviewModule,
    this.$store
  );

  toastSucess = Swal.mixin(ToastSucess);
  toastError = Swal.mixin(ToastError);
  private amount: Amount = {
    amount: 0
  };

  async mounted() {
    document.title = "Trang rút tiền";
    this.getBankCards();
    this.getEWallets();
  }

  async getBankCards() {
    const loader = this.$loading.show();
    try {
      await this.BankCardInstance.fetchBankCards();
      this.bankCards = this.BankCardInstance.getBankCards;
      if (this.bankCards) {
        this.selectBank(this.bankCards[0]);
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    } finally {
      loader.hide();
    }
  }

  async getEWallets() {
    const loader = this.$loading.show();
    try {
      await this.EWalletInstance.fetchEWallets();
      this.eWallets = this.EWalletInstance.getEWallets;
      if (this.eWallets) {
        this.selectEwallet(this.eWallets[0]);
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    } finally {
      loader.hide();
    }
  }

  async withdrawWithBankCard(cardId: string) {
    const loader = this.$loading.show();
    if (!this.amount) return;
    try {
      const response = await mentorService.withdrawWithBankCard(
        cardId,
        this.amount
      );
      if (response.status == 200) {
        if (this.UserFinanceInstance.userFinanceOverview) {
          this.UserFinanceInstance.userFinanceOverview.totalMoneyCurrent =
            this.UserFinanceInstance.userFinanceOverview.totalMoneyCurrent -
            this.amount.amount;
        }
        this.UserFinanceOverviewInstance.triggerReload();
        this.toastSucess.fire({
          icon: "success",
          title: "Rút tiền thành công"
        });
        this.amount.amount = 0;
        (this.$refs["amount-bank"] as InstanceType<
          typeof ValidationProvider
        >).reset();
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    } finally {
      loader.hide();
    }
  }

  async withdrawWithEwallet(ewalletId: string) {
    const loader = this.$loading.show();
    if (!this.amount) return;
    try {
      const response = await mentorService.withdrawWithEwallet(
        ewalletId,
        this.amount
      );
      if (response.status == 200) {
        if (this.UserFinanceInstance.userFinanceOverview) {
          this.UserFinanceInstance.userFinanceOverview.totalMoneyCurrent =
            this.UserFinanceInstance.userFinanceOverview.totalMoneyCurrent -
            this.amount.amount;
        }
        this.UserFinanceOverviewInstance.triggerReload();
        this.toastSucess.fire({
          icon: "success",
          title: "Rút tiền thành công"
        });
        this.amount.amount = 0;
      }
      (this.$refs["amount-ewallet"] as InstanceType<
        typeof ValidationProvider
      >).reset();
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    } finally {
      loader.hide();
    }
  }

  selectEwallet(ewallet: EWallet) {
    this.currentEwallet = ewallet;
  }

  formatMoney(date: number | null): string {
    if (!date) date = 0;
    return date.toLocaleString("vi-VN");
  }

  selectBank(bank: BankCard) {
    this.currentBank = bank;
  }
}
</script>

<style scoped lang="scss">
.right {
  .tab-content {
    .bank-card .bank-card-info {
      padding: 1rem 1rem 0.25rem 1rem;
    }

    .tab-pane {
      display: none;
      &.active.show {
        display: block !important;
      }
    }

    .withdraw {
      .withdraw-info ul li a {
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
    }
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.message-error {
  color: #e87093;
  margin-left: 5px;
}
.form-group .is-invalid {
  border-color: #f18072 !important;
}

@import "../../assets/scss/nav-pills.scss";
@import "../../assets/scss/label-info-panel.scss";
@import "../../assets/scss/form.scss";
</style>
