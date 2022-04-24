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
            />Thêm ví điện tử
          </a>
        </div>
      </div>
      <!--Collapse-->
      <div class="row input-bank-card-info">
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
                          <legend>Họ & tên</legend>
                          <input
                            v-model="registerEwallet.holderName"
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
                          <legend>Tên ví</legend>
                          <input
                            v-model="registerEwallet.eWalletName"
                            type="text"
                            name="tên ví"
                            class="form-control"
                          />
                        </fieldset>
                      </validation-provider>
                    </div>
                    <div class="form-group col-md-12">
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
                          <legend>Số điện thoại</legend>
                          <input
                            v-model="registerEwallet.phone"
                            name="số điện thoại"
                            type="text"
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

    <div class="menu" v-if="eWallets && eWallets.length">
      <h6 class="title">Danh sách ví điện tử</h6>

      <!-- Pill select bank card -->
      <ul class="row nav nav-pills" id="pills-tab-2" role="tablist">
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
                <h4>{{ eWallet.phone }}</h4>
              </div>
            </div>
            <div class="description text-left">
              <span>{{ eWallet.eWalletName }}</span>
            </div>
          </a>
        </li>
      </ul>
    </div>

    <!-- Pill bank card content -->
    <div
      class="tab-content mb-4"
      id="pills-tabContent-2"
      v-if="eWallets && eWallets.length"
    >
      <div
        class="tab-pane fade show active"
        id="pills-bank-card-1"
        role="tabpanel"
        aria-labelledby="pills-bank-card-1-tab"
      >
        <div class="bank-card" v-if="currentEwallet">
          <h6 class="title">Thông tin ví điện tử</h6>
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
                        <legend>Họ & tên</legend>
                        <input
                          type="text"
                          name="họ và tên"
                          class="form-control"
                          v-model="currentEwallet.holderName"
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
                        <legend>Tên ví</legend>
                        <input
                          type="text"
                          name="tên ví"
                          class="form-control"
                          v-model="currentEwallet.eWalletName"
                        />
                      </fieldset>
                    </validation-provider>
                  </div>
                  <div class="form-group col-md-12">
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
                        <legend>Số điện thoại</legend>
                        <input
                          type="text"
                          name="số điện thoại"
                          class="form-control"
                          v-model="currentEwallet.phone"
                        />
                      </fieldset>
                    </validation-provider>
                  </div>
                  <div class="col-md-12 text-right">
                    <button
                      type="submit"
                      class="btn btn-lg btn-gray mb-3 mr-2"
                      @click.prevent="deleteEwallet(currentEwallet.id)"
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
                      @click.prevent="update(currentEwallet.id)"
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

import EWalletModule from "../../store/profile/eWallet.module";
import { EWallet, EWallets } from "@/types/profile/eWallet";
import { eWalletService } from "../../services/profile/eWallet.service";

import Swal from "sweetalert2";
import { ToastSucess, ToastError } from "@/mixins/sweetalert.mixin";

@Component({
  components: {
    QuickAction
  }
})
export default class SettingEwallet extends Vue {
  private currentEwallet: EWallet = {
    id: "",
    holderName: "",
    eWalletName: "",
    phone: ""
  };

  private registerEwallet: EWallet = {
    id: "",
    holderName: "",
    eWalletName: "",
    phone: ""
  };

  // private eWallet: EWallet = null;
  private eWallets: EWallets = [];
  private EWalletInstance = getModule(EWalletModule, this.$store);
  private foundEwalletIndex: number | undefined;

  toastSucess = Swal.mixin(ToastSucess);

  toastError = Swal.mixin(ToastError);
  async mounted() {
    document.title = "Cài đặt ví điện tử";
    const loader = this.$loading.show();
    this.firstLoad().then(() => {
      loader.hide();
    });
  }
  async firstLoad() {
    await this.getEWallets();
  }
  async getEWallets() {
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
    }
  }

  async register() {
    const loader = this.$loading.show();
    if (!this.registerEwallet) return;
    try {
      const response = await eWalletService.postEWallets(this.registerEwallet);
      if (response.status == 200) {
        this.toastSucess.fire({
          icon: "success",
          title: "Thêm ví điện tử thành công"
        });
        this.eWallets?.push(this.registerEwallet);
        await this.EWalletInstance.fetchEWallets();
        this.eWallets = this.EWalletInstance.getEWallets;
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    } finally {
      loader.hide();
    }
  }

  async update(ewalletId: number) {
    const loader = this.$loading.show();
    if (!this.currentEwallet) return;
    try {
      const response = await eWalletService.putEwallet(
        this.currentEwallet,
        ewalletId
      );
      if (response.status == 200) {
        if (this.eWallets) {
          this.foundEwalletIndex = this.eWallets?.findIndex(
            item => parseInt(item ? item.id : "") === ewalletId
          );
          this.eWallets[this.foundEwalletIndex] = this.currentEwallet;
          this.toastSucess.fire({
            icon: "success",
            title: "Chỉnh sửa ví điện tử thành công"
          });
        }
        // this.$router.go(0);
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    } finally {
      loader.hide();
    }
  }

  async deleteEwallet(ewalletId: number) {
    const loader = this.$loading.show();
    try {
      const response = await eWalletService.deleteEwallet(ewalletId);
      if (response.status == 200) {
        if (this.eWallets) {
          for (let i = 0; i < this.eWallets.length; i++) {
            const obj = this.eWallets[i];
            if (obj && parseInt(obj.id) === ewalletId) {
              this.eWallets.splice(i, 1);
              this.currentEwallet = null;
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

  selectEwallet(ewallet: EWallet) {
    this.currentEwallet = ewallet;
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
