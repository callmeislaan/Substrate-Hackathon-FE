<template>
  <div class="profile bg-dark-ui border-ui mb-3">
    <div class="media">
      <router-link :to="{ name: 'ProfileInfo' }" class="circle">
        <img
          class="avatar"
          v-if="profile && profile.avatar"
          :src="profile.avatar"
          alt="avatar"
          width="50"
        />
        <img
          v-else-if="profile && profile.gender"
          class="avatar"
          src="../../assets/images/system/v.png"
          alt="avatar"
          width="50"
        />
        <img
          v-else
          class="avatar"
          src="../../assets/images/system/v2.png"
          alt="avatar"
          width="50"
        />
      </router-link>
      <div class="media-body">
        <router-link :to="{ name: 'ProfileInfo' }">
          {{ profile ? profile.fullName : fullName }}
        </router-link>
        <router-link :to="{ name: 'ProfileInfo' }" class="username">
          @{{ profile ? profile.username : userName }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import { Profile } from "@/types/profile/profile";

import ProfileModule from "../../store/profile/profile.module";

import Swal from "sweetalert2";
import { ToastError } from "@/mixins/sweetalert.mixin";

@Component
export default class InfoPanel extends Vue {
  @Prop() readonly profileProp: Profile | undefined;

  private profile: Profile = null;

  private userName = window.localStorage.getItem("id_user_name");
  private fullName = window.localStorage.getItem("id_full_name");
  private ProfileInstance = getModule(ProfileModule, this.$store);
  async mounted() {
    this.getProfile();
  }

  toastError = Swal.mixin(ToastError);

  @Watch("profileProp", { immediate: true })
  async getProfile() {
    if (this.profileProp) {
      this.profile = this.profileProp;
      return;
    }
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
@import "../../assets/scss/info-panel.scss";
</style>
