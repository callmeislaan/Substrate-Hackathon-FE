<template>
  <div class="top-header-bar bg-dark-ui border-ui">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-lg-6 top-left">
          <ul class="float-left">
            <li>
              <a href="mailto:anest.academy@gmail.com">
                anest.academy@gmail.com
              </a>
            </li>
            <li><a class="text-secondary" href="javascript:void(0)">|</a></li>
            <li>
              <a
                href="https://www.youtube.com/channel/UCP_JjK3orweIJ23HZ8kniJA"
                target="_blank"
              >
                Youtube
              </a>
            </li>
            <li><a class="text-secondary" href="#">|</a></li>
            <li>
              <a href="https://www.facebook.com/AnestAcademy/" target="_blank">
                Facebook
              </a>
            </li>
          </ul>
        </div>
        <div class="col-12 col-lg-6 top-right">
          <div class="header-bar-menu">
            <ul class="flex" v-if="AuthInstance.isAuth">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {{ this.profile ? this.profile.fullName : "" }}
                </a>
                <div class="dropdown-menu" aria-labelledby="database">
                  <div class="username">
                    <div>
                      <font-awesome-icon
                        :icon="['fas', 'user-tag']"
                        fixed-width
                      />
                    </div>
                    <div>
                      <span>@{{ user ? user.username : "" }}</span>
                    </div>
                  </div>
                  <div class="dropdown-divider" />
                  <a class="dropdown-item" href="#">
                    <font-awesome-icon
                      :icon="['far', 'comment-alt']"
                      fixed-width
                    />Đóng góp ý kiến
                  </a>
                  <div class="dropdown-divider" />
                  <a class="dropdown-item" href="#">
                    <font-awesome-icon
                      :icon="['far', 'question-circle']"
                      fixed-width
                    />Trợ giúp & hỗ trợ
                  </a>
                  <a class="dropdown-item cursor-pointer" @click="signOut">
                    <font-awesome-icon
                      :icon="['fas', 'sign-out-alt']"
                      fixed-width
                    />Đăng xuất
                  </a>
                </div>
              </li>
              <li>
                <router-link :to="{ name: 'ProfileInfo' }">
                  Trang cá nhân
                </router-link>
              </li>
            </ul>
            <ul class="flex" v-else>
              <li>
                <router-link :to="{ name: 'LogIn' }">
                  Đăng nhập
                </router-link>
              </li>
              <li><a class="text-secondary">|</a></li>
              <li>
                <router-link :to="{ name: 'SignUp' }">Đăng ký</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import AuthModule from "@/store/auth/auth.module";
import ProfileModule from "../../store/profile/profile.module";
import { Profile } from "@/types/profile/profile";

import { User } from "@/types/auth/user.ts";

import Swal from "sweetalert2";
import { ToastError } from "@/mixins/sweetalert.mixin";
@Component
export default class TopHeader extends Vue {
  private AuthInstance = getModule(AuthModule, this.$store);
  private user: User = this.AuthInstance.currentUser;
  private profile: Profile = {
    id: "",
    username: "",
    avatar: "",
    fullName: "",
    dateOfBirth: 0,
    gender: false,
    phone: "",
    createdDate: "",
    email: "",
    mentor: false
  };

  toastError = Swal.mixin(ToastError);

  private ProfileInstance = getModule(ProfileModule, this.$store);

  async mounted() {
    if (this.AuthInstance.isAuth) this.getProfile();
  }

  async signOut() {
    this.AuthInstance.signoutSuccess();
    this.$router.push({ name: "Home" });
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
@import "~@/assets/scss/components/top-header.scss";
</style>
