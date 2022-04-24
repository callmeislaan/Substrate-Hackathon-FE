<template>
  <div>
    <info-panel />
    <div
      class="sidebar-menu bg-dark-ui border-ui mb-3"
      v-if="this.profile && this.profile.mentor"
    >
      <ul>
        <li>
          <router-link :to="{ name: 'UpdateMentor' }">
            <font-awesome-icon
              class="text-info mr-2"
              :icon="['fas', 'user-edit']"
              fixed-width
            />Chỉnh sửa trang hồ sơ
          </router-link>
        </li>
        <li>
          <a
            href=""
            @click.prevent="showConfirm('Đồng ý hủy đăng ký đối tác?')"
          >
            <font-awesome-icon
              class="text-danger mr-2"
              :icon="['fas', 'ban']"
              fixed-width
            />Huỷ đăng ký đối tác
          </a>
        </li>
      </ul>
    </div>
    <div
      class="sidebar-menu bg-dark-ui border-ui mb-3"
      v-if="this.profile && this.profile.mentor"
    >
      <ul>
        <li>
          <router-link :to="{ name: 'SettingBankCard' }">
            <font-awesome-icon
              class="text-violet mr-2"
              :icon="['far', 'credit-card']"
              fixed-width
            />Thẻ ngân hàng
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'SettingEwallet' }">
            <font-awesome-icon
              class="text-sea-green mr-2"
              :icon="['fas', 'wallet']"
              fixed-width
            />Ví điện tử
          </router-link>
        </li>
      </ul>
    </div>
    <div class="sidebar-menu bg-dark-ui border-ui mb-3">
      <ul>
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
    <confirm-modal
      :title="confirmTitle"
      :trigger="confirmTrigger"
      @confirm="confirmAction"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InfoPanel from "@/components/utils/InfoPanel.vue";
import { getModule } from "vuex-module-decorators";
import ProfileModule from "../../store/profile/profile.module";
import { Profile } from "@/types/profile/profile";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import { mentorService } from "../../services/mentor/mentors.service";
import AuthModule from "@/store/auth/auth.module";
import Swal from "sweetalert2";
import {
  ToastSucess,
  ToastError,
  ConfirmMixin
} from "@/mixins/sweetalert.mixin";

@Component({
  components: {
    InfoPanel,
    ConfirmModal
  }
})
export default class Sidebar extends Vue {
  private ProfileInstance = getModule(ProfileModule, this.$store);
  private profile: Profile = null;
  private AuthInstance = getModule(AuthModule, this.$store);

  toastSucess = Swal.mixin(ToastSucess);
  confirmMixin = Swal.mixin(ConfirmMixin);

  toastError = Swal.mixin(ToastError);
  async mounted() {
    this.getProfile();
  }

  //confirm modal data
  confirmTitle = "";
  confirmTrigger = false;
  callback: Function | null = null;
  // callbackParams = "";

  toggleConfirm(title: string, callback: Function) {
    this.confirmTitle = title;
    this.callback = callback;
    // this.callbackParams = params;
    this.confirmTrigger = !this.confirmTrigger;
  }

  showConfirm() {
    this.confirmMixin
      .fire({
        title: "Xác nhận hủy đối tác"
      })
      .then(result => {
        if (result.isConfirmed) {
          this.unRegisterMentor();
        }
      });
  }

  confirmAction() {
    if (this.callback) {
      this.callback();
    }
  }

  async signOut() {
    this.AuthInstance.signoutSuccess();
    this.$router.push({ name: "LogIn" });
  }

  async unRegisterMentor() {
    const loader = this.$loading.show();
    try {
      const response = await mentorService.unRegisterMentor();
      if (response.status == 200) {
        await this.ProfileInstance.fetchProfile();
        this.toastSucess.fire({
          icon: "success",
          title: "Hủy mentor thành công"
        });
        this.profile = this.ProfileInstance.getProfile;
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    } finally {
      loader.hide();
    }
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
