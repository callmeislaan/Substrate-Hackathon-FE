<template>
  <div>
    <div class="quick-action">
      <div class="row">
        <div class="col-12 col-md-4 col-lg-4">
          <a
            class="border-ui"
            data-toggle="collapse"
            href="#add-bank-card"
            role="button"
            aria-expanded="false"
            aria-controls="multiCollapseExample1"
          >
            <font-awesome-icon
              class="text-violet mr-2"
              :icon="['fas', 'plus']"
            />Thêm thẻ ngân hàng
          </a>
        </div>
      </div>
      <!--Collapse-->
      <div class="row input-bank-card-info" v-if="registerBank">
        <div class="col-12 mt-3">
          <div class="collapse multi-collapse mb-3" id="add-bank-card">
            <div class="card card-body">
              <ValidationObserver v-slot="{ invalid }">
                <form>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <validation-provider rules="required" v-slot="{ errors }">
                        <fieldset
                          v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                          v-tooltip.bottom="{
                            content: errors[0],
                            class:
                              errors.length !== 0
                                ? 'anest-tooltip'
                                : 'tooltip-hide'
                          }"
                        >
                          <legend>Họ & tên chủ thẻ</legend>
                          <input
                            v-model="registerBank.holderName"
                            type="text"
                            name="họ và tên"
                            class="form-control"
                          />
                        </fieldset>
                      </validation-provider>
                    </div>
                    <div class="form-group col-md-6">
                      <validation-provider rules="required" v-slot="{ errors }">
                        <fieldset
                          v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                          v-tooltip.bottom="{
                            content: errors[0],
                            class:
                              errors.length !== 0
                                ? 'anest-tooltip'
                                : 'tooltip-hide'
                          }"
                        >
                          <legend>Tên ngân hàng</legend>
                          <input
                            v-model="registerBank.bank"
                            name="tên ngân hàng"
                            type="text"
                            class="form-control"
                          />
                        </fieldset>
                      </validation-provider>
                    </div>
                    <div class="form-group col-md-6">
                      <validation-provider rules="required" v-slot="{ errors }">
                        <fieldset
                          v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                          v-tooltip.bottom="{
                            content: errors[0],
                            class:
                              errors.length !== 0
                                ? 'anest-tooltip'
                                : 'tooltip-hide'
                          }"
                        >
                          <legend>Số tài khoản</legend>
                          <input
                            v-model="registerBank.accountNumber"
                            type="text"
                            name="số tài khoản"
                            class="form-control"
                          />
                        </fieldset>
                      </validation-provider>
                    </div>
                    <div class="form-group col-md-6">
                      <validation-provider rules="required" v-slot="{ errors }">
                        <fieldset
                          v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                          v-tooltip.bottom="{
                            content: errors[0],
                            class:
                              errors.length !== 0
                                ? 'anest-tooltip'
                                : 'tooltip-hide'
                          }"
                        >
                          <legend>Chi nhánh</legend>
                          <input
                            v-model="registerBank.branch"
                            type="text"
                            name="chi nhánh"
                            class="form-control"
                          />
                        </fieldset>
                      </validation-provider>
                    </div>
                    <div class="col-md-12 text-right">
                      <button
                        type="submit"
                        :disabled="invalid"
                        class="btn btn-lg btn-gray mb-3"
                        @click.prevent="register()"
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

    <div class="menu" v-if="bankCards && bankCards.length">
      <h6 class="title">Danh sách thẻ</h6>

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
            aria-controls="'pills-bank-card-1"
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
    </div>

    <!-- Pill bank card content -->
    <div
      class="tab-content mb-4"
      id="pills-tabContent-2"
      v-if="this.bankCards && this.bankCards.length"
    >
      <div
        class="tab-pane fade show active"
        id="pills-bank-card-1"
        role="tabpanel"
        aria-labelledby="pills-bank-card-1-tab"
      >
        <div class="bank-card" v-if="currentBank">
          <h6 class="title">Thông tin thẻ</h6>
          <div class="bank-card-info bg-dark-ui border-ui mb-3">
            <ValidationObserver v-slot="{ invalid }">
              <form>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <validation-provider rules="required" v-slot="{ errors }">
                      <fieldset
                        v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                        v-tooltip.bottom="{
                          content: errors[0],
                          class:
                            errors.length !== 0
                              ? 'anest-tooltip'
                              : 'tooltip-hide'
                        }"
                      >
                        <legend>Họ & tên chủ thẻ</legend>
                        <input
                          type="text"
                          name="họ và tên"
                          class="form-control"
                          v-model="currentBank.holderName"
                        />
                      </fieldset>
                    </validation-provider>
                  </div>
                  <div class="form-group col-md-6">
                    <validation-provider rules="required" v-slot="{ errors }">
                      <fieldset
                        v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                        v-tooltip.bottom="{
                          content: errors[0],
                          class:
                            errors.length !== 0
                              ? 'anest-tooltip'
                              : 'tooltip-hide'
                        }"
                      >
                        <legend>Ngân hàng</legend>
                        <input
                          type="text"
                          name="ngân hàng"
                          class="form-control"
                          v-model="currentBank.bank"
                        />
                      </fieldset>
                    </validation-provider>
                  </div>
                  <div class="form-group col-md-6">
                    <validation-provider rules="required" v-slot="{ errors }">
                      <fieldset
                        v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                        v-tooltip.bottom="{
                          content: errors[0],
                          class:
                            errors.length !== 0
                              ? 'anest-tooltip'
                              : 'tooltip-hide'
                        }"
                      >
                        <legend>Số tài khoản</legend>
                        <input
                          type="text"
                          name="số tài khoản"
                          class="form-control"
                          v-model="currentBank.accountNumber"
                        />
                      </fieldset>
                    </validation-provider>
                  </div>
                  <div class="form-group col-md-6">
                    <validation-provider rules="required" v-slot="{ errors }">
                      <fieldset
                        v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                        v-tooltip.bottom="{
                          content: errors[0],
                          class:
                            errors.length !== 0
                              ? 'anest-tooltip'
                              : 'tooltip-hide'
                        }"
                      >
                        <legend>Chi nhánh</legend>
                        <input
                          type="text"
                          name="chi nhánh"
                          class="form-control"
                          v-model="currentBank.branch"
                        />
                      </fieldset>
                    </validation-provider>
                  </div>
                  <div class="col-md-12 text-right">
                    <button
                      type="submit"
                      class="btn btn-lg btn-gray mb-3 mr-2"
                      @click.prevent="deleteBankCard(currentBank.id)"
                    >
                      <font-awesome-icon
                        class="text-danger mr-2"
                        :icon="['fas', 'ban']"
                      />Xoá thẻ
                    </button>
                    <button
                      type="submit"
                      :disabled="invalid"
                      class="btn btn-lg btn-gray mb-3 ml-1"
                      @click.prevent="update(currentBank.id)"
                    >
                      <font-awesome-icon
                        class="text-sea-green mr-2"
                        :icon="['fas', 'check']"
                      />Cập nhật thông tin
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
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QuickAction from "@/components/utils/QuickAction.vue";
import { getModule } from "vuex-module-decorators";
import BankCardModule from "../../store/profile/bankCard.module";
import { BankCard, BankCards } from "@/types/profile/bankCard";
import { bankCardService } from "../../services/profile/bankCard.service";

import Swal from "sweetalert2";
import { ToastError } from "@/mixins/sweetalert.mixin";
import { ToastSucess } from "@/mixins/sweetalert.mixin";

@Component({
  components: {
    QuickAction
  }
})
export default class SettingBankCard extends Vue {
  private bank: BankCard = null;
  private bankCards: BankCards = null;
  private BankCardInstance = getModule(BankCardModule, this.$store);
  private foundBankCard: number | undefined;

  private currentBank: BankCard = {
    id: "",
    holderName: "",
    accountNumber: "",
    bank: "",
    branch: ""
  };
  private registerBank: BankCard = {
    id: "",
    holderName: "",
    accountNumber: "",
    bank: "",
    branch: ""
  };

  toastSucess = Swal.mixin(ToastSucess);

  toastError = Swal.mixin(ToastError);

  async mounted() {
    document.title = "Cài đặt thẻ ngân hàng";
    const loader = this.$loading.show();
    this.firstLoad().then(() => {
      loader.hide();
    });
  }

  async firstLoad() {
    await this.getBankCards();
  }

  async getBankCards() {
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
    }
  }

  async register() {
    const loader = this.$loading.show();
    if (!this.registerBank) return;
    try {
      const response = await bankCardService.postBankCard(this.registerBank);
      if (response.status == 200) {
        this.toastSucess.fire({
          icon: "success",
          title: "Thêm thẻ ngân hàng thành công"
        });
        this.bankCards?.push(this.registerBank);
        await this.BankCardInstance.fetchBankCards();
        this.bankCards = this.BankCardInstance.getBankCards;
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    } finally {
      loader.hide();
    }
  }

  async update(cardId: number) {
    const loader = this.$loading.show();
    if (!this.currentBank) return;
    try {
      const response = await bankCardService.putBankCard(
        this.currentBank,
        cardId
      );
      if (response.status == 200) {
        if (this.bankCards) {
          this.foundBankCard = this.bankCards?.findIndex(
            item => parseInt(item ? item.id : "") === cardId
          );
          this.bankCards[this.foundBankCard] = this.currentBank;
          this.toastSucess.fire({
            icon: "success",
            title: "Chỉnh sửa thẻ ngân hàng thành công"
          });
        }
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    } finally {
      loader.hide();
    }
  }

  async deleteBankCard(cardId: number) {
    const loader = this.$loading.show();
    try {
      const response = await bankCardService.deleteBankCard(cardId);
      if (response.status == 200) {
        if (this.bankCards) {
          for (let i = 0; i < this.bankCards.length; i++) {
            const obj = this.bankCards[i];
            if (obj && parseInt(obj.id) === cardId) {
              this.bankCards.splice(i, 1);
              this.currentBank = null;
            }
          }
        }
        this.toastSucess.fire({
          icon: "success",
          title: "Xóa thẻ ngân hàng thành công"
        });
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    } finally {
      loader.hide();
    }
  }

  selectBank(bank: BankCard) {
    this.currentBank = bank;
  }
}
</script>

<style scoped lang="scss">
.quick-action {
  a {
    color: #b0b3b8;
    font-weight: 500;
    display: block;
    text-align: center;
    background-color: #242526;
    padding: 0.65rem 1rem;

    &:hover {
      text-decoration: none;
      background-color: #3a3b3c;
    }
  }
}

.right {
  .menu ul li a {
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

  .tab-content .bank-card .bank-card-info {
    padding: 1rem 1rem 0.25rem 1rem;
  }

  .input-bank-card-info {
    .card {
      background-color: #242526;
      border: 1px solid #242526;
      border-radius: 0.45rem;
    }

    .card-body {
      padding: 1rem 1rem 0.25rem 1rem;
    }
  }
}
.form-group .is-invalid {
  border-color: #f18072 !important;
}

@import "../../assets/scss/label-info-panel.scss";
@import "../../assets/scss/form.scss";
</style>
