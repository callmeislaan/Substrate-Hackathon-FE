<template>
  <div class="row vh-100 register-page">
    <div class="col-md-9">
      <div class="row">
        <div class="banner col-12 mt-auto mb-auto ml-5">
          <h1 class="banner__title align-bottom">
            <span class="text-pink">ANEST</span>
            LEARNING
          </h1>
          <span class="banner__description text-pink">
            TIẾT KIỆM THỜI GIAN VÀ TIỀN BẠC CỦA BẠN BẰNG SỰ LỰA CHỌN ĐÚNG ĐẮN_
          </span>
        </div>
      </div>
      <div class="row animated-wrap">
        <div class="col-md-7"></div>
        <div class="col-md-5">
          <animated-circles></animated-circles>
        </div>
      </div>
    </div>
    <div class="col-md-3 p-4">
      <ValidationObserver v-slot="{ invalid }">
        <form class="form">
          <h3 class="form__title">
            <span class="text-pink">ANEST</span> <br />
            LEARNING
          </h3>
          <div class="form-group">
            <label class="form__label--icon" for="username">
              <font-awesome-icon :icon="['fas', 'user']" fixed-width />
            </label>
            <validation-provider rules="required" v-slot="{ errors }">
              <input
                v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                v-tooltip.left="{
                  content: errors[0],
                  class: errors.length !== 0 ? 'anest-tooltip' : 'tooltip-hide'
                }"
                v-model="user.username"
                type="text"
                name="tên đăng nhập"
                class="form-control form-control--rounded form-control--icon"
                placeholder="Tên đăng nhập"
              />
            </validation-provider>
          </div>
          <div class="form-group">
            <label class="form__label--icon">
              <font-awesome-icon :icon="['fas', 'lock']" fixed-width />
            </label>
            <validation-provider rules="required" v-slot="{ errors }">
              <input
                v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                v-tooltip.left="{
                  content: errors[0],
                  class: errors.length !== 0 ? 'anest-tooltip' : 'tooltip-hide'
                }"
                v-model="user.password"
                type="password"
                name="mật khẩu"
                class="form-control form-control--rounded form-control--icon"
                placeholder="Mật khẩu"
              />
            </validation-provider>
          </div>
          <div class="form-group">
            <label class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control__input"
                name="rememberLogin"
              />
              <span class="custom-control__indicator"></span>
              <span class="custom-control__description">Ghi nhớ tài khoản</span>
            </label>
          </div>
          <div class="form-group mb-4">
            <button
              type="submit"
              class="btn w-100 btn-login"
              :disabled="invalid"
              @click.prevent="logIn"
            >
              Đăng nhập
            </button>
          </div>
          <div class="form-group">
            <router-link :to="'SignUp'" class="form__link">
              <font-awesome-icon :icon="['far', 'edit']" fixed-width />
              Đăng ký
            </router-link>
            <router-link :to="'SignUp'" class="form__link float-right">
              <font-awesome-icon :icon="['fas', 'unlock']" fixed-width />
              Quên mật khẩu
            </router-link>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { UserLogin } from "@/types/auth/user";
import AuthModule from "../store/auth/auth.module";
import AnimatedCircles from "@/components/animated/AnimatedCircles.vue";
import Swal from "sweetalert2";
import { ToastForLoginAndSignUp } from "@/mixins/sweetalert.mixin";

@Component({
  components: {
    AnimatedCircles
  }
})
export default class LogIn extends Vue {
  private AuthInstance = getModule(AuthModule, this.$store);
  user: UserLogin = {
    username: "",
    password: ""
  };
  toast = Swal.mixin(ToastForLoginAndSignUp);

  created() {
    document.title = "Anest - Đăng nhập";
    if (this.AuthInstance.isAuthenticated) {
      this.$router.push({ name: "Home" });
    }
  }

  async logIn() {
    try {
      await this.AuthInstance.logIn(this.user);
      this.$router.push({ name: "Home" });
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toast.fire({ icon: "error", title: message });
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/scss/components/_form.scss";

.register-page {
  margin: 0 -1.5rem -1.5rem -1.5rem !important;
  overflow: hidden;
}

.animated-wrap {
  margin-top: -8rem;
}

.banner {
  height: 60vh;
  padding-top: 45vh;
  &__title {
    font-size: 5rem !important;
  }
  &__description {
    font-size: 1.4rem;
    text-transform: uppercase;
  }
}

.btn-login {
  border-radius: $border-radius-rounded;
  background-color: #add7ff;
  font-weight: 500;
}

.form {
  height: 100%;
  &__title {
    font-size: 2.7rem;
  }
}
</style>
