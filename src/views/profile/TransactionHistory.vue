<template>
  <div>
    <div class="menu">
      <ul
        class="row nav nav-pills"
        id="pills-tab"
        role="tablist"
        v-if="this.profile"
      >
        <li
          :class="
            this.profile.mentor
              ? 'col-4 col-md-4' + 'mb-3 nav-item text-center'
              : 'col-6 col-md-6' + 'mb-3 nav-item text-center'
          "
          role="presentation"
        >
          <a
            class="nav-link font-weight-500 active"
            id="pills-pay-in-history-tab"
            data-toggle="pill"
            href="#pills-pay-in"
            role="tab"
            aria-controls="pills-pay-in"
            aria-selected="true"
          >
            Lịch sử nạp tiền
          </a>
        </li>
        <li
          class="col-4 col-md-4 mb-3 nav-item text-center"
          role="presentation"
          v-if="this.profile.mentor"
        >
          <a
            class="nav-link font-weight-500"
            id="pills-pay-in-history-tab"
            data-toggle="pill"
            href="#pills-pay-out"
            role="tab"
            aria-controls="pills-pay-in"
            aria-selected="true"
            v-if="this.profile.mentor"
          >
            Lịch sử rút tiền
          </a>
        </li>
        <li
          :class="
            this.profile.mentor
              ? 'col-4 col-md-4' + 'mb-3 nav-item text-center'
              : 'col-6 col-md-6' + 'mb-3 nav-item text-center'
          "
          role="presentation"
        >
          <a
            class="nav-link font-weight-500"
            id="pills-withdraw-tab"
            data-toggle="pill"
            href="#pills-withdraw"
            role="tab"
            aria-controls="pills-withdraw"
            aria-selected="false"
          >
            Lịch sử giao dịch
          </a>
        </li>
      </ul>
    </div>

    <div class="tab-content" id="pills-tabContent">
      <div
        class="tab-pane fade show active"
        id="pills-pay-in"
        role="tabpanel"
        aria-labelledby="pills-pay-in-history-tab"
      >
        <div class="row">
          <div class="col-md-12" v-if="transactionHistorysMoneyIn">
            <div
              class="transaction-history"
              v-if="transactionHistorysMoneyIn.transactionHistorys.length"
            >
              <h6 class="title">Chi tiết giao dịch</h6>
              <div
                class="transaction-history-info content bg-dark-ui border-ui"
              >
                <div class="row data-tables">
                  <div class="col-lg-12">
                    <table
                      id="pay-in-table"
                      table
                      class="table"
                      cellspacing="0"
                      width="100%"
                    >
                      <thead>
                        <tr>
                          <th>Mã giao dịch</th>
                          <th>Thời gian</th>
                          <th>Nguồn tiền</th>
                          <th>Số tiền</th>
                          <th>Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(transaction, index) in this
                            .transactionHistorysMoneyIn.transactionHistorys"
                          :key="index"
                        >
                          <td>#{{ transaction.transactionId }}</td>
                          <td>
                            {{
                              transaction
                                ? formatTime(
                                    transaction.createdDate,
                                    "dd/MM/yyyy"
                                  )
                                : "--/--/----"
                            }}
                          </td>
                          <td>{{ transaction.paymentMethod }}</td>
                          <td class="font-weight-500">
                            +{{
                              transaction.amount
                                ? transaction.amount.toLocaleString("vi-VI")
                                : 0
                            }}<sup>đ</sup>
                          </td>
                          <td
                            :class="
                              transaction.status == 'ACTIVE'
                                ? 'text-sea-green'
                                : transaction.status == 'PENDING'
                                ? 'text-tan'
                                : 'text-tomato'
                            "
                          >
                            {{
                              transaction.status == "ACTIVE"
                                ? "Thành công"
                                : transaction.status == "PENDING"
                                ? "Đang chờ"
                                : "Thất bại"
                            }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <!-- in the absence of deposit history -->
            <div class="transaction-history" v-else>
              <h6 class="title">Không có lịch sử rút tiền</h6>
            </div>
          </div>
        </div>
        <paginate
          v-if="this.pageCount > 1"
          :page-count="pageCount"
          :page-range="3"
          :click-handler="getTransactionHistorysForMoneyIn"
          :prev-text="'Trước'"
          :next-text="'Sau'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        >
        </paginate>
      </div>
      <div
        class="tab-pane fade show"
        id="pills-pay-out"
        role="tabpanel"
        aria-labelledby="pills-pay-in-history-tab"
      >
        <div class="row">
          <div class="col-md-12" v-if="this.transactionHistorysMoneyOut">
            <div
              class="transaction-history"
              v-if="this.transactionHistorysMoneyOut.transactionHistorys.length"
            >
              <h6 class="title">Chi tiết giao dịch</h6>
              <div
                class="transaction-history-info content bg-dark-ui border-ui"
              >
                <div class="row data-tables">
                  <div class="col-lg-12">
                    <table
                      id="pay-in-table"
                      table
                      class="table"
                      cellspacing="0"
                      width="100%"
                    >
                      <thead>
                        <tr>
                          <th>Mã giao dịch</th>
                          <th>Thời gian</th>
                          <th>Nguồn tiền</th>
                          <th>Số tiền</th>
                          <th>Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(transaction, index) in this
                            .transactionHistorysMoneyOut.transactionHistorys"
                          :key="index"
                        >
                          <td>#{{ transaction.transactionId }}</td>
                          <td>
                            {{
                              transaction
                                ? formatTime(
                                    transaction.createdDate,
                                    "dd/MM/yyyy"
                                  )
                                : "--/--/----"
                            }}
                          </td>
                          <td>{{ transaction.paymentMethod }}</td>
                          <td class="font-weight-500">
                            -{{
                              transaction.amount
                                ? transaction.amount.toLocaleString("vi-VI")
                                : 0
                            }}<sup>đ</sup>
                          </td>
                          <td
                            :class="
                              transaction.status == 'ACTIVE'
                                ? 'text-sea-green'
                                : transaction.status == 'PENDING'
                                ? 'text-tan'
                                : 'text-tomato'
                            "
                          >
                            {{
                              transaction.status == "ACTIVE"
                                ? "Thành công"
                                : transaction.status == "PENDING"
                                ? "Đang chờ"
                                : "Thất bại"
                            }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="transaction-history" v-else>
              <h6 class="title">Không có lịch sử rút tiền</h6>
            </div>
          </div>
        </div>
        <paginate
          v-if="this.pageCountOut > 1"
          :page-count="pageCountOut"
          :page-range="3"
          :click-handler="getTransactionHistorysForMoneyOut"
          :prev-text="'Trước'"
          :next-text="'Sau'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        >
        </paginate>
      </div>
      <div
        class="tab-pane fade"
        id="pills-withdraw"
        role="tabpanel"
        aria-labelledby="pills-withdraw-tab"
      >
        <div class="row">
          <div class="col-md-12" v-if="this.transactionHistorysMoneyExchange">
            <div
              class="transaction-history"
              v-if="
                this.transactionHistorysMoneyExchange.transactionHistorys.length
              "
            >
              <h6 class="title">Chi tiết giao dịch</h6>
              <div
                class="transaction-history-info content bg-dark-ui border-ui"
              >
                <div class="row data-tables">
                  <div class="col-lg-12">
                    <table
                      id="withdraw-table"
                      table
                      class="table"
                      cellspacing="0"
                      width="100%"
                    >
                      <thead>
                        <tr>
                          <th>Mã giao dịch</th>
                          <th>Thời gian</th>
                          <th>Loại giao dịch</th>
                          <th>Số tiền</th>
                          <th>Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(transaction, index) in this
                            .transactionHistorysMoneyExchange
                            .transactionHistorys"
                          :key="index"
                        >
                          <td>#{{ transaction.transactionId }}</td>
                          <td>
                            {{
                              transaction
                                ? formatTime(
                                    transaction.createdDate,
                                    "dd/MM/yyyy"
                                  )
                                : "--/--/----"
                            }}
                          </td>
                          <td>{{ transaction.paymentMethod }}</td>
                          <td class="font-weight-500">
                            {{
                              transaction.paymentMethod === "Nhận tiền"
                                ? "+"
                                : "-"
                            }}
                            {{
                              transaction.amount
                                ? transaction.amount.toLocaleString("vi-VI")
                                : 0
                            }}<sup>đ</sup>
                          </td>
                          <!-- <td class="text-tomato">Thất bại</td> -->
                          <td
                            :class="
                              transaction.status == 'ACTIVE'
                                ? 'text-sea-green'
                                : transaction.status == 'PENDING'
                                ? 'text-tan'
                                : 'text-tomato'
                            "
                          >
                            {{
                              transaction.status == "ACTIVE"
                                ? "Thành công"
                                : transaction.status == "PENDING"
                                ? "Đang chờ"
                                : "Thất bại"
                            }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="transaction-history" v-else>
              <h6 class="title">Không có lịch sử nạp tiền</h6>
            </div>
          </div>
        </div>
        <paginate
          v-if="this.pageCountExchange > 1"
          :page-count="pageCountExchange"
          :page-range="3"
          :click-handler="getTransactionHistorysForMoneyExchange"
          :prev-text="'Trước'"
          :next-text="'Sau'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        >
        </paginate>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QuickAction from "@/components/utils/QuickAction.vue";
import { getModule } from "vuex-module-decorators";
import TransactionModule from "../../store/transaction/transaction.module";

import ProfileModule from "../../store/profile/profile.module";
import { Profile } from "@/types/profile/profile";
import Paginate from "vuejs-paginate";

import Swal from "sweetalert2";
import { ToastError } from "@/mixins/sweetalert.mixin";

@Component({
  components: {
    QuickAction,
    Paginate
    // Vuetable
  }
})
export default class TransactionHistory extends Vue {
  private TransactionHistoryInstance = getModule(
    TransactionModule,
    this.$store
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private transactionHistorysMoneyIn: any = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private transactionHistorysMoneyOut: any = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private transactionHistorysMoneyExchange: any = null;

  private profile: Profile = null;

  private ProfileInstance = getModule(ProfileModule, this.$store);

  private isMentor = false;

  // paginate
  pageCount = 1;
  pageCountOut = 1;
  pageCountExchange = 1;
  perPage = 10;

  toastError = Swal.mixin(ToastError);

  async mounted() {
    document.title = "Lịch sử giao dịch";
    this.getProfile();
    this.getTransactionHistorysForMoneyIn();
    this.getTransactionHistorysForMoneyExchange();
  }

  async getProfile() {
    try {
      await this.ProfileInstance.fetchProfile();
      this.profile = this.ProfileInstance.getProfile;
      if (this.profile?.mentor) {
        this.getTransactionHistorysForMoneyOut();
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  async getTransactionHistorysForMoneyIn(pageIndex = 1) {
    const loader = this.$loading.show();
    try {
      await this.TransactionHistoryInstance.fetchTransactionHistorys([
        this.perPage,
        pageIndex
      ]);
      this.transactionHistorysMoneyIn = this.TransactionHistoryInstance.getTransactionHistorys;
      if (this.transactionHistorysMoneyIn !== null) {
        this.pageCount = Math.ceil(
          (this.transactionHistorysMoneyIn.totalRecord || this.perPage) /
            this.perPage
        );
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    } finally {
      loader.hide();
    }
  }

  async getTransactionHistorysForMoneyOut(pageIndex = 1) {
    const loader = this.$loading.show();
    try {
      await this.TransactionHistoryInstance.fetchTransactionHistorysForOutMoney(
        [this.perPage, pageIndex]
      );
      this.transactionHistorysMoneyOut = this.TransactionHistoryInstance.getTransactionHistorys;
      if (this.transactionHistorysMoneyOut !== null) {
        this.pageCountOut = Math.ceil(
          (this.transactionHistorysMoneyOut.totalRecord || this.perPage) /
            this.perPage
        );
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    } finally {
      loader.hide();
    }
  }

  async getTransactionHistorysForMoneyExchange(pageIndex = 1) {
    const loader = this.$loading.show();
    try {
      await this.TransactionHistoryInstance.fetchTransactionHistorysForExchangeMoney(
        [this.perPage, pageIndex]
      );
      this.transactionHistorysMoneyExchange = this.TransactionHistoryInstance.getTransactionHistorys;
      if (this.transactionHistorysMoneyExchange !== null) {
        this.pageCountExchange = Math.ceil(
          (this.transactionHistorysMoneyExchange.totalRecord || this.perPage) /
            this.perPage
        );
      }
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
  .tab-content .content {
    padding: 1.25rem 1.25rem 0 1.25rem;
  }

  .bg-color {
    background-color: #1e1e1e;
  }
}

.right #pills-tabContent h6 {
  font-size: 1.05rem !important;
  margin-left: 1rem !important;
  margin-top: 0.5rem !important;
  margin-bottom: 1rem !important;
}

@import "../../assets/scss/nav-pills.scss";
@import "../../assets/scss/data-table.scss";
@import "../../assets/scss/mentor-profiles/mentor-profiles.scss";
</style>
<style lang="scss">
@import "../../assets/scss/paginate.scss";
</style>
