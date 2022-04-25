<template>
  <div class="container">
    <!-- Left Side -->
    <left-side>
      <div>
        <info-panel />
        <div class="sidebar-menu bg-dark-ui border-ui mb-3">
          <ul>
            <li>
              <router-link :to="{ name: 'ProfileInfo' }">
                <font-awesome-icon
                  class="text-success mr-2"
                  :icon="['fas', 'user-edit']"
                  fixed-width
                />Trang cá nhân
              </router-link>
            </li>
          </ul>
        </div>

        <div class="sidebar-menu bg-dark-ui border-ui mb-3">
          <ul>
            <li>
              <router-link :to="{ name: 'ListMentor' }">
                <font-awesome-icon
                  class="text-danger mr-2"
                  :icon="['fas', 'plus']"
                  fixed-width
                />Thuê mentor
              </router-link>
            </li>
          </ul>
        </div>

        <div class="sidebar-menu bg-dark-ui border-ui mb-3">
          <ul>
            <li>
              <router-link :to="{ name: 'ProfilePayIn' }">
                <font-awesome-icon
                  class="text-pink mr-2"
                  :icon="['fas', 'user-plus']"
                  fixed-width
                />Nạp tiền
              </router-link>
            </li>
          </ul>
        </div>
      </div>
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
                  <h4>
                    {{
                      userFinanceOverview
                        ? userFinanceOverview.totalBudgetCurrent.toLocaleString(
                            "vi-VI"
                          )
                        : 0
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
      <!-- Views -->
      <create-request-form />
    </right-side>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LeftSide from "@/components/layout/LeftSide.vue";
import RightSide from "@/components/layout/RightSide.vue";
import InfoPanel from "@/components/utils/InfoPanel.vue";
import CreateRequestForm from "@/views/request/CreateRequestForm.vue";
import UserFinanceOverviewModule from "../../store/profile/userFinanceOverview.module";
import { UserFinanceOverview } from "@/types/profile/userFinanceOverview";
import { getModule } from "vuex-module-decorators";

@Component({
  components: {
    LeftSide,
    RightSide,
    InfoPanel,
    CreateRequestForm
  }
})
export default class CreateRequest extends Vue {
  private userFinanceOverview: UserFinanceOverview = null;

  private UserFinanceOverviewInstance = getModule(
    UserFinanceOverviewModule,
    this.$store
  );
  created() {
    document.title = "Tạo yêu cầu";
    const loader = this.$loading.show();
    this.firstLoad().then(() => {
      loader.hide();
    });
  }

  async firstLoad() {
    await this.getUserFinanceOverview();
  }

  async getUserFinanceOverview() {
    try {
      await this.UserFinanceOverviewInstance.fetchUserFinanceOverview();
      this.userFinanceOverview = this.UserFinanceOverviewInstance.getUserFinanceOverview;
    } catch (e) {
      this.userFinanceOverview = null;
      this.$toasted.error(e.response.data.message);
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/label-info-panel.scss";
@import "../../assets/scss/sidebar.scss";
</style>
