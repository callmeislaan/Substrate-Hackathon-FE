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
            <span class="text-pink">ĐĂNG KÝ</span> <br />
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
                v-model="register.username"
                type="text"
                name="tên tài khoản"
                class="form-control form-control--rounded form-control--icon"
                placeholder="Tên tài khoản"
                required
              />
            </validation-provider>
          </div>
          <div class="form-group">
            <label class="form__label--icon" for="email">
              <font-awesome-icon
                :icon="['fas', 'envelope-square']"
                fixed-width
              />
            </label>
            <validation-provider rules="required|email" v-slot="{ errors }">
              <input
                v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                v-tooltip.left="{
                  content: errors[0],
                  class: errors.length !== 0 ? 'anest-tooltip' : 'tooltip-hide'
                }"
                v-model="register.email"
                type="text"
                name="địa chỉ email"
                class="form-control form-control--rounded form-control--icon"
                placeholder="Email"
                required
              />
            </validation-provider>
          </div>
          <div class="form-group">
            <label class="form__label--icon">
              <font-awesome-icon :icon="['fas', 'unlock-alt']" fixed-width />
            </label>
            <validation-provider
              vid="password"
              rules="required|password"
              v-slot="{ errors }"
            >
              <input
                v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                v-tooltip.left="{
                  content: errors[0],
                  class: errors.length !== 0 ? 'anest-tooltip' : 'tooltip-hide'
                }"
                v-model="register.password"
                type="password"
                name="mật khẩu"
                class="form-control form-control--rounded form-control--icon"
                placeholder="Mật khẩu"
                required
              />
            </validation-provider>
          </div>
          <div class="form-group">
            <label class="form__label--icon">
              <font-awesome-icon :icon="['fas', 'lock']" fixed-width />
            </label>
            <validation-provider
              rules="required|checkRePassword:@password"
              v-slot="{ errors }"
            >
              <input
                v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                v-tooltip.left="{
                  content: errors[0],
                  class: errors.length !== 0 ? 'anest-tooltip' : 'tooltip-hide'
                }"
                v-model="register.rePassword"
                type="password"
                name="xác nhận mật khẩu"
                class="form-control form-control--rounded form-control--icon"
                placeholder="Xác nhận mật khẩu"
                required
              />
            </validation-provider>
          </div>
          <div class="form-group">
            <label class="form__label--icon">
              <font-awesome-icon :icon="['fas', 'user-tie']" fixed-width />
            </label>
            <validation-provider rules="required" v-slot="{ errors }">
              <input
                v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                v-tooltip.left="{
                  content: errors[0],
                  class: errors.length !== 0 ? 'anest-tooltip' : 'tooltip-hide'
                }"
                v-model="register.fullName"
                type="text"
                name="họ và tên"
                class="form-control form-control--rounded form-control--icon"
                placeholder="Họ Và Tên"
                required
              />
            </validation-provider>
          </div>
          <div class="form-group">
            <label class="form__label--icon">
              <font-awesome-icon :icon="['fas', 'phone-alt']" fixed-width />
            </label>
            <validation-provider rules="required" v-slot="{ errors }">
              <input
                v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                v-tooltip.left="{
                  content: errors[0],
                  class: errors.length !== 0 ? 'anest-tooltip' : 'tooltip-hide'
                }"
                v-model="register.phone"
                name="số điện thoại"
                class="form-control form-control--rounded form-control--icon"
                placeholder="Số điện thoại"
                required
              />
            </validation-provider>
          </div>
          <div class="form-group">
            <label class="form__label--icon">
              <font-awesome-icon :icon="['fas', 'calendar-alt']" fixed-width />
            </label>
            <validation-provider
              name="ngày sinh"
              rules="required"
              v-slot="{ errors }"
            >
              <date-picker
                v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                v-tooltip.left="{
                  content: errors[0],
                  class: errors.length !== 0 ? 'anest-tooltip' : 'tooltip-hide'
                }"
                v-model="birthDate"
                class="form-control form-control--rounded form-control--icon birthday-input-signup"
                format="DD-MM-YYYY"
                prefix-class="anest"
                placeholder="Ngày sinh"
              ></date-picker>
            </validation-provider>
          </div>
          <div class="row">
            <div class="form-group col-md-6">
              <label class="custom-control custom-checkbox">
                <input
                  v-model="register.gender"
                  type="radio"
                  class="custom-control__input"
                  name="sexradio"
                  :value="true"
                  checked
                />
                <span class="custom-control__indicator"></span>
                <span class="custom-control__description">Nam</span>
              </label>
            </div>
            <div class="form-group col-md-6">
              <label class="custom-control custom-checkbox">
                <input
                  v-model="register.gender"
                  type="radio"
                  class="custom-control__input"
                  name="sexradio"
                  :value="false"
                />
                <span class="custom-control__indicator"></span>
                <span class="custom-control__description">Nữ</span>
              </label>
            </div>
          </div>
          <div class="form-group">
            <label>
              <span
                >Bạn đã có tài khoản?
                <router-link :to="{ name: 'LogIn' }" class="login">
                  Đăng Nhập
                </router-link>
              </span>
            </label>
          </div>
          <div class="form-group mb-4">
            <button
              type="submit"
              :disabled="invalid"
              class="btn w-100 btn-login"
              @click.prevent="signup"
            >
              Đăng Ký
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
    <confirm-modal
      :title="confirmTitle"
      :trigger="confirmTrigger"
      :flag="confirmFlag"
      @confirm="gotoLogIn"
    />
  </div>
</template>

<script lang="ts">
import "@/assets/scss/components/datepicker.scss";
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { Register } from "@/types/auth/register";
import AuthModule from "../store/auth/auth.module";
import AnimatedCircles from "@/components/animated/AnimatedCircles.vue";
import DatePicker from "vue2-datepicker";
import { ValidationProvider } from "vee-validate";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import Swal from "sweetalert2";
import { ToastForLoginAndSignUp } from "@/mixins/sweetalert.mixin";

@Component({
  components: {
    AnimatedCircles,
    DatePicker,
    ValidationProvider,
    ConfirmModal
  }
})
export default class SignUp extends Vue {
  private AuthInstance = getModule(AuthModule, this.$store);
  birthDate: string | null = null;
  register: Register = {
    username: "",
    password: "",
    rePassword: "",
    email: "",
    fullName: "",
    phone: "",
    dateOfBirth: null,
    gender: false
  };
  confirmTitle = "";
  confirmTrigger = false;
  confirmFlag = false;

  toggleConfirm(title: string) {
    this.confirmTitle = title;
    this.confirmTrigger = true;
    this.confirmFlag = true;
  }
  toast = Swal.mixin(ToastForLoginAndSignUp);

  created() {
    document.title = "Anest - Đăng ký";
    if (this.AuthInstance.isAuthenticated) {
      this.$router.push({ name: "Home" });
    }
  }

  setRegisterDob(dateString: string) {
    const date = new Date(dateString);
    date.setHours(0);
    if (this.register) this.register.dateOfBirth = date.getTime();
  }

  validated() {
    return true;
  }

  gotoLogIn() {
    this.$router.push({ name: "LogIn" });
  }

  async signup() {
    if (!this.validated()) return;
    try {
      if (this.register) {
        this.register.dateOfBirth = new Date(this.birthDate as string).setHours(
          0
        );
      }
      await this.AuthInstance.signup(this.register);
      this.toggleConfirm("Vui lòng kiểm tra email để hoàn thành đăng ký");
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
.custom-control__input:checked ~ .custom-control__indicator[data-v-6f83b81c] {
  background-color: #28a745;
}
</style>

<style lang="scss">
.birthday-input-signup {
  .anest-input {
    padding: 0;
    font-size: 0.95rem;
    height: 26.3px;
  }

  .anest-icon-calendar {
    display: none;
  }
}
.login {
  color: #28a745;
}

a:hover {
  text-decoration: none !important;
}
.message-error {
  color: #e87093;
  margin-left: 16px;
}
.form-group .is-invalid {
  border-color: #f18072 !important;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: #b0b3b8;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
