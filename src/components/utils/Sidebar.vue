<template>
  <div>
    <info-panel />
    <div class="sidebar-menu bg-dark-ui border-ui mb-3">
      <ul>
        <li v-if="profile && profile.mentor">
          <router-link :to="{ name: 'MentorProfile' }">
            <font-awesome-icon
              class="text-sea-green mr-2"
              :icon="['fas', 'eye']"
              fixed-width
            />Trang hồ sơ
          </router-link>
        </li>
        <li v-else>
          <router-link :to="{ name: 'CreateMentor' }">
            <font-awesome-icon
              class="text-success mr-2"
              :icon="['fas', 'user-plus']"
              fixed-width
            />Đăng ký mentor
          </router-link>
        </li>
      </ul>
    </div>
    <div class="sidebar-menu bg-dark-ui border-ui mb-3">
      <ul>
        <li v-if="profile && profile.mentor">
          <router-link :to="{ name: 'BookmarkRequest' }">
            <font-awesome-icon
              class="text-tan mr-2"
              :icon="['fas', 'bookmark']"
              fixed-width
            />Yêu cầu đã lưu
          </router-link>
        </li>
        <li v-if="profile && profile.mentor">
          <router-link :to="{ name: 'InvitationRequests' }">
            <font-awesome-icon
              class="text-blue-sky mr-2"
              :icon="['fas', 'door-open']"
              fixed-width
            />Yêu cầu được mời
          </router-link>
        </li>
        <li v-if="profile && profile.mentor">
          <router-link :to="{ name: 'ReceiveRequest' }">
            <font-awesome-icon
              class="text-pink mr-2"
              :icon="['fas', 'vote-yea']"
              fixed-width
            />Yêu cầu đã nhận
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'RequestCreated' }">
            <font-awesome-icon
              class="text-yellow mr-2"
              :icon="['fas', 'pencil-alt']"
              fixed-width
            />Yêu cầu đã tạo
          </router-link>
        </li>
      </ul>
    </div>

    <div class="sidebar-menu bg-dark-ui border-ui mb-3">
      <ul>
        <li>
          <router-link :to="{ name: 'RentMentor' }">
            <font-awesome-icon
              class="text-violet mr-2"
              :icon="['fas', 'user-check']"
              fixed-width
            />Mentor đã thuê
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'FollowMentor' }">
            <font-awesome-icon
              class="text-slate-blue mr-2"
              :icon="['fas', 'user-tag']"
              fixed-width
            />Mentor đang theo dõi
          </router-link>
        </li>
      </ul>
    </div>
    <div class="sidebar-menu bg-dark-ui border-ui mb-3">
      <ul>
        <li>
          <router-link :to="{ name: 'ProfilePayIn' }">
            <font-awesome-icon
              class="text-danger mr-2"
              :icon="['fas', 'plus']"
              fixed-width
            />Nạp tiền
          </router-link>
        </li>
        <li v-if="profile && profile.mentor">
          <router-link :to="{ name: 'ProfileWithdraw' }">
            <font-awesome-icon
              class="text-orange mr-2"
              :icon="['fas', 'reply']"
              fixed-width
            />Rút tiền
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'TransactionHistory' }">
            <font-awesome-icon
              class="text-info mr-2"
              :icon="['fas', 'history']"
              fixed-width
            />Lịch sử giao dịch
          </router-link>
        </li>
      </ul>
    </div>
    <div class="sidebar-menu bg-dark-ui border-ui mb-3">
      <ul>
        <!-- <li>
          <a href="profile-manager.html">
            <font-awesome-icon
              class="text-primary mr-2"
              :icon="['fas', 'chart-line']"
              fixed-width
            />Quản lý tài khoản
          </a>
        </li> -->
        <li>
          <router-link :to="{ name: 'SettingUpdateInfo' }">
            <font-awesome-icon
              class="text-warning mr-2"
              :icon="['fas', 'cog']"
              fixed-width
            />Cài đặt tài khoản
          </router-link>
        </li>
        <hr />
        <li>
          <a @click="signOut">
            <font-awesome-icon
              class="text-tomato mr-2"
              :icon="['fas', 'sign-out-alt']"
              fixed-width
            />Đăng xuất
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InfoPanel from "@/components/utils/InfoPanel.vue";
import { getModule } from "vuex-module-decorators";
import ProfileModule from "../../store/profile/profile.module";
import { Profile } from "@/types/profile/profile";
import AuthModule from "@/store/auth/auth.module";
import Swal from "sweetalert2";
import { ToastError } from "@/mixins/sweetalert.mixin";

@Component({
  components: {
    InfoPanel
  }
})
export default class Sidebar extends Vue {
  private isPartner = false;
  private profile: Profile = null;
  private ProfileInstance = getModule(ProfileModule, this.$store);
  private AuthInstance = getModule(AuthModule, this.$store);

  async mounted() {
    this.getProfile();
  }
  toastError = Swal.mixin(ToastError);

  async signOut() {
    this.AuthInstance.signoutSuccess();
    this.$router.push({ name: "LogIn" });
  }

  async getProfile() {
    try {
      await this.ProfileInstance.fetchProfile();
      this.profile = this.ProfileInstance.getProfile;
    } catch (e) {
      this.profile = null;
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/sidebar.scss";
</style>
