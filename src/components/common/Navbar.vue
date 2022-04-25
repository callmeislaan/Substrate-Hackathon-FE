<template>
  <div class="nav-bar bg-dark-ui border-ui">
    <div class="container-fluid">
      <div class="nav-bar-content px-fix">
        <div class="navbar-brand">
          <router-link :to="{ name: 'Home' }" class="color-gradient">
            ANEST LEARNING
          </router-link>
          <!-- <button class="btn btn-anest text-light" @click="pushNoti">
            <font-awesome-icon :icon="['fas', 'plus']" fixed-width />
          </button> -->
        </div>
        <div class="nav-btn">
          <ul class="m-0 p-0">
            <!-- <li class="dropdown btn-icon">
              <a class="icon" href="javascript:void(0)">
                <font-awesome-icon :icon="['fas', 'search']" fixed-width />
              </a>
            </li> -->
            <template v-if="AuthInstance.isAuth">
              <li class="dropdown btn-icon">
                <a
                  class="icon dropdown-toggle"
                  href="javascript:void(0)"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <font-awesome-icon :icon="['fas', 'bell']" fixed-width />
                </a>
                <span class="c-badge" v-if="generalNoti > 0">
                  {{ generalNoti }}
                </span>
                <general-notification
                  v-if="this.AuthInstance.currentUser"
                  @newNotiNumber="updateGeneralNotiNumber"
                />
              </li>
              <li class="dropdown btn-icon">
                <a
                  class="icon dropdown-toggle"
                  href="javascript:void(0)"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <font-awesome-icon
                    :icon="['fab', 'facebook-messenger']"
                    fixed-width
                  />
                </a>
                <span class="c-badge" v-if="messageNoti > 0">
                  {{ messageNoti }}
                </span>
                <chat-notification
                  v-if="this.AuthInstance.currentUser"
                  @newMessageNumber="updateMessageNotiNumber"
                />
              </li>
              <li class="dropdown btn-icon">
                <a
                  class="icon dropdown-toggle"
                  href="javascript:void(0)"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <font-awesome-icon
                    :icon="['fas', 'caret-down']"
                    fixed-width
                  />
                </a>
                <ul class="dropdown-menu action-dropdown">
                  <li class="dropdown-item">
                    <router-link :to="{ name: 'CreateRequest' }">
                      <font-awesome-icon
                        class="text-success"
                        :icon="['fas', 'pencil-alt']"
                        fixed-width
                      />Tạo yêu cầu
                    </router-link>
                  </li>
                  <li class="dropdown-item">
                    <router-link :to="{ name: 'ListMentor' }">
                      <font-awesome-icon
                        class="text-violet"
                        :icon="['fas', 'user-check']"
                        fixed-width
                      />Thuê Mentor
                    </router-link>
                  </li>
                </ul>
              </li>
              <li class="dropdown label-amount" v-if="userFinanceOverview">
                <a
                  class="icon dropdown-toggle"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span class="text-tan d-inline-block">
                    {{
                      (AuthInstance.currentUser.role === "ROLE_MENTOR"
                        ? userFinanceOverview.totalMoneyCurrent
                        : userFinanceOverview.totalBudgetCurrent
                      ).toLocaleString("vi-VI")
                    }}
                    UNIT
                  </span>
                </a>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import ChatNotification from "@/components/chat/ChatNotification.vue";
import GeneralNotification from "@/components/GeneralNotification.vue";

import { getModule } from "vuex-module-decorators";
import AuthModule from "@/store/auth/auth.module";

import UserFinanceOverviewModule from "../../store/profile/userFinanceOverview.module";
import { UserFinanceOverview } from "@/types/profile/userFinanceOverview";

import Swal from "sweetalert2";
import { ToastError } from "@/mixins/sweetalert.mixin";
@Component({
  components: {
    ChatNotification,
    GeneralNotification
  }
})
export default class Navbar extends Vue {
  AuthInstance = getModule(AuthModule, this.$store);

  messageNoti = 0;
  generalNoti = 0;

  private userFinanceOverview: UserFinanceOverview = null;

  toastError = Swal.mixin(ToastError);
  private UserFinanceOverviewInstance = getModule(
    UserFinanceOverviewModule,
    this.$store
  );

  get triggerReload() {
    return this.UserFinanceOverviewInstance.triggerState;
  }

  async mounted() {
    this.getUserFinanceOverview();
  }

  updateMessageNotiNumber(number: number) {
    this.messageNoti = number;
  }

  updateGeneralNotiNumber(number: number) {
    this.generalNoti = number;
  }

  @Watch("triggerReload")
  async getUserFinanceOverview() {
    console.log(this.triggerReload);
    if (!this.AuthInstance.isAuthenticated) return;
    try {
      await this.UserFinanceOverviewInstance.fetchUserFinanceOverview();
      this.userFinanceOverview = this.UserFinanceOverviewInstance.getUserFinanceOverview;
    } catch (e) {
      this.userFinanceOverview = null;
      if (!this.AuthInstance.isAuthenticated) {
        const message =
          e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
        this.toastError.fire({ icon: "error", title: message });
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/scss/components/navbar.scss";
.media {
  min-width: 20rem;
}

.notification-dropdown {
  position: absolute;
  max-height: 30rem;
  max-width: 27rem;
  overflow-y: auto;
  overflow-x: hidden;
}

.nav-bar .nav-btn .label-amount {
  height: 2.5rem;
  background-color: #3a3b3c;
  border-radius: 30px;
  margin-left: 0.5rem;
  margin-right: 0.15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  transition: 0.3s;
  position: relative;
  padding-right: 0.85rem;
  padding-left: 0.85rem;
}

.nav-bar .nav-btn .dropdown-toggle::after {
  display: none;
}

.nav-bar .nav-btn .label-amount > a {
  font-weight: 500;
  font-size: 1rem;
  pointer-events: auto;
  position: relative;
}

.nav-bar .nav-btn .label-amount a:hover {
  text-decoration: none;
}
</style>
