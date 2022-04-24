<template>
  <div class="container">
    <!-- Left Side -->
    <left-side>
      <sidebar />
    </left-side>

    <!-- Right Side -->
    <right-side>
      <div class="overview">
        <div class="row" v-if="userFinanceOverview">
          <div class="col-12 col-md-6 col-lg-6 mb-3">
            <div class="label-info bg-dark-ui border-ui">
              <div class="flex">
                <div class="icon">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-wallet2 text-sea-green"
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
                      userFinanceOverview.totalBudgetCurrent.toLocaleString(
                        "vi-VI"
                      )
                    }}<sup>đ</sup>
                  </h4>
                </div>
              </div>
              <div class="description">
                <span>Ví nạp / Tổng tiền còn lại</span>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-6 mb-3">
            <div class="label-info bg-dark-ui border-ui">
              <div class="flex">
                <div class="icon">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-plus-circle text-violet"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                    />
                  </svg>
                </div>
                <div class="number">
                  <h4>
                    {{
                      userFinanceOverview.totalBudgetIn.toLocaleString("vi-VI")
                    }}<sup>đ</sup>
                  </h4>
                </div>
              </div>
              <div class="description">
                <span>Tổng tiền đã nạp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h6 class="title" v-if="this.requests">
        {{
          this.requests.length !== 0
            ? "Danh sách yêu cầu đã tạo"
            : "Danh sách yêu cầu đã tạo trống"
        }}
      </h6>
      <request-item
        v-for="(item, index) in this.requests"
        :key="index"
        :displayType="'request-created'"
        :request="item"
      >
      </request-item>
      <!-- Views -->
      <router-view />
      <paginate
        v-if="pageCount > 1"
        :page-count="pageCount"
        :page-range="3"
        :click-handler="getCreatedRequestByUser"
        :prev-text="'Trước'"
        :next-text="'Sau'"
        :container-class="'pagination'"
        :page-class="'page-item'"
      >
      </paginate>
    </right-side>
    <confirm-modal
      :title="confirmTitle"
      :trigger="confirmTrigger"
      @confirm="confirmAction"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import LeftSide from "@/components/layout/LeftSide.vue";
import RightSide from "@/components/layout/RightSide.vue";
import Sidebar from "@/components/utils/Sidebar.vue";
import UserFinanceOverviewModule from "../../store/profile/userFinanceOverview.module";
import { UserFinanceOverview } from "@/types/profile/userFinanceOverview";
import RequestItem from "@/components/request/RequestItem.vue";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";

import RequestModule from "@/store/request/request.module";

import { Requests } from "@/types/request";

import Paginate from "vuejs-paginate";

import Swal from "sweetalert2";
import { ToastError } from "@/mixins/sweetalert.mixin";

@Component({
  components: {
    LeftSide,
    RightSide,
    Sidebar,
    RequestItem,
    ConfirmModal,
    Paginate
  }
})
export default class RequestCreated extends Vue {
  private userFinanceOverview: UserFinanceOverview = null;
  private requests: Requests = null;
  private UserFinanceOverviewInstance = getModule(
    UserFinanceOverviewModule,
    this.$store
  );

  toastError = Swal.mixin(ToastError);

  private RequestInstance = getModule(RequestModule, this.$store);

  // paginate
  pageCount = 1;
  perPage = 3;

  //confirm modal data
  confirmTitle = "";
  confirmTrigger = false;
  callback: Function | null = null;
  callbackParams: Array<unknown> = [];

  toggleConfirm(
    title: string,
    callback: Function,
    params: Array<unknown> = []
  ) {
    this.confirmTitle = title;
    this.callback = callback;
    this.callbackParams = params;
    this.confirmTrigger = !this.confirmTrigger;
  }

  confirmAction() {
    if (this.callback) {
      this.callback(...this.callbackParams);
    }
  }

  async mounted() {
    document.title = "Yêu cầu đã tạo";
    this.getUserFinanceOverview();
    this.getCreatedRequestByUser();
  }

  async getUserFinanceOverview() {
    try {
      await this.UserFinanceOverviewInstance.fetchUserFinanceOverview();
      this.userFinanceOverview = this.UserFinanceOverviewInstance.getUserFinanceOverview;
    } catch (e) {
      this.userFinanceOverview = null;
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  async getCreatedRequestByUser(pageIndex = 1) {
    const loader = this.$loading.show();
    try {
      await this.RequestInstance.getCreatedRequestByUser([
        this.perPage,
        pageIndex
      ]);
      this.requests = this.RequestInstance.getRequestCreated.requests;
      if (this.requests !== null) {
        this.pageCount = Math.ceil(
          (this.RequestInstance.getRequestCreated.totalRecord || this.perPage) /
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
@media (max-width: 575.98px) {
  .container {
    padding-top: 0;
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
}

@import "../../assets/scss/label-info-panel.scss";
</style>
