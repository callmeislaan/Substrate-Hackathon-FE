<template>
  <div class="container">
    <!-- Left Side -->
    <left-side>
      <sidebar />
    </left-side>

    <!-- Right Side -->
    <right-side>
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
                  <h4 v-if="userFinanceOverview">
                    {{
                      userFinanceOverview.totalBudgetCurrent.toLocaleString(
                        "vi-VI"
                      )
                    }}<sup>UNIT</sup>
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
                      userFinanceOverview
                        ? userFinanceOverview.totalBudgetIn.toLocaleString(
                            "vi-VI"
                          )
                        : 0
                    }}<sup>UNIT</sup>
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

      <h6 class="title" v-if="this.rentMentors">
        {{
          this.rentMentors.length !== 0
            ? "Danh sách Mentor đã thuê"
            : "Danh sách Mentor đã thuê trống"
        }}
      </h6>
      <mentor-item
        v-for="(rentMentor, index) in this.rentMentors"
        :key="index"
        :rentMentor="rentMentor"
      >
      </mentor-item>

      <!-- Views -->
      <router-view />
      <paginate
        v-if="pageCount > 1"
        :page-count="pageCount"
        :page-range="3"
        :click-handler="getRentMentors"
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

import RentMentorModule from "../../store/mentor/mentor.module";
import { RentMentors } from "@/types/mentor/rentMentor";
import MentorItem from "./MentorItem.vue";

import ConfirmModal from "@/components/modal/ConfirmModal.vue";

import Paginate from "vuejs-paginate";

import Swal from "sweetalert2";
import { ToastError } from "@/mixins/sweetalert.mixin";

@Component({
  components: {
    LeftSide,
    RightSide,
    Sidebar,
    MentorItem,
    Paginate,
    ConfirmModal
  }
})
export default class RentMentor extends Vue {
  private userFinanceOverview: UserFinanceOverview = null;

  private rentMentors: RentMentors = null;

  private UserFinanceOverviewInstance = getModule(
    UserFinanceOverviewModule,
    this.$store
  );

  private RentMentorsInstance = getModule(RentMentorModule, this.$store);

  private test = 0;

  // paginate
  pageCount = 1;
  perPage = 3;
  toastError = Swal.mixin(ToastError);

  async mounted() {
    document.title = "Mentor đã thuê";
    this.getUserFinanceOverview();
    this.getRentMentors();
  }

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

  async getRentMentors(pageIndex = 1) {
    const loader = this.$loading.show();
    try {
      await this.RentMentorsInstance.fetchRentMentors([
        this.perPage,
        pageIndex
      ]);
      this.rentMentors = this.RentMentorsInstance.getRentMentors.rentMentors;
      if (this.rentMentors !== null) {
        this.pageCount = Math.ceil(
          (this.RentMentorsInstance.getRentMentors.totalRecordOfRentMentor ||
            this.perPage) / this.perPage
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

<style lang="scss">
@import "../../assets/scss/paginate.scss";
</style>
