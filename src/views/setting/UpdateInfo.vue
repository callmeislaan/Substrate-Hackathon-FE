<template>
  <div>
    <div class="about" v-if="profile">
      <h6 class="title">Thông tin cá nhân</h6>
      <div class="about-info bg-dark-ui border-ui mb-4">
        <ValidationObserver v-slot="{ invalid }">
          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <fieldset class="bg-dark-ui">
                  <legend>Email</legend>
                  <input
                    type="email"
                    class="form-control"
                    v-model="profile.email"
                    disabled
                  />
                </fieldset>
              </div>
              <div class="form-group col-md-6">
                <fieldset class="bg-dark-ui">
                  <legend>Ngày tham gia</legend>
                  <input
                    type="date"
                    class="form-control"
                    value="2020-08-28"
                    disabled
                  />
                </fieldset>
              </div>
              <div class="form-group col-md-6">
                <validation-provider rules="required" v-slot="{ errors }">
                  <fieldset
                    v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                    v-tooltip.bottom="{
                      content: errors[0],
                      class:
                        errors.length !== 0 ? 'anest-tooltip' : 'tooltip-hide'
                    }"
                  >
                    <legend>Họ & tên</legend>
                    <input
                      type="text"
                      name="họ và tên"
                      class="form-control"
                      v-model="profile.fullName"
                    />
                  </fieldset>
                </validation-provider>
              </div>
              <div class="form-group col-md-6">
                <validation-provider
                  name="ngày sinh"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <fieldset
                    v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                    v-tooltip.bottom="{
                      content: errors[0],
                      class:
                        errors.length !== 0 ? 'anest-tooltip' : 'tooltip-hide'
                    }"
                  >
                    <legend>Ngày sinh</legend>
                    <date-picker
                      v-model="dateOfBirth"
                      format="DD/MM/YYYY"
                      prefix-class="anest"
                      placeholder="Chọn ngày"
                    ></date-picker>
                  </fieldset>
                </validation-provider>
              </div>
              <div class="form-group col-md-6">
                <fieldset class="bg-dark-ui">
                  <legend>Giới tính</legend>
                  <div
                    class="custom-control custom-radio custom-control-inline fix-height ml-2"
                  >
                    <input
                      type="radio"
                      v-model="profile.gender"
                      id="male"
                      name="gender"
                      class="custom-control-input"
                      autocomplete="off"
                      v-bind:value="true"
                      checked
                    />
                    <label class="custom-control-label" for="male">Nam</label>
                  </div>
                  <div
                    class="custom-control custom-radio custom-control-inline fix-height"
                  >
                    <input
                      type="radio"
                      v-model="profile.gender"
                      id="female"
                      name="gender"
                      class="custom-control-input"
                      v-bind:value="false"
                      checked
                    />
                    <label class="custom-control-label" for="female">Nữ </label>
                  </div>
                </fieldset>
              </div>

              <div class="form-group col-md-6">
                <validation-provider rules="required" v-slot="{ errors }">
                  <fieldset
                    v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                    v-tooltip.bottom="{
                      content: errors[0],
                      class:
                        errors.length !== 0 ? 'anest-tooltip' : 'tooltip-hide'
                    }"
                  >
                    <legend>Số điện thoại</legend>
                    <input
                      type="text"
                      name="số điện thoại"
                      class="form-control"
                      v-model="profile.phone"
                    />
                  </fieldset>
                </validation-provider>
              </div>

              <div class="col-md-12 text-right">
                <button
                  type="submit"
                  :disabled="invalid"
                  class="btn btn-lg btn-gray mb-3"
                  @click.prevent="updateProfile()"
                >
                  <font-awesome-icon
                    class="text-sea-green mr-2"
                    :icon="['fas', 'check']"
                  />Cập nhật thông tin
                </button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>

    <div class="change-password">
      <h6 class="title">Đổi mật khẩu</h6>
      <div
        class="change-password-info bg-dark-ui border-ui mb-4"
        v-if="this.changePassword"
      >
        <ValidationObserver v-slot="{ invalid }">
          <form>
            <div class="form-row">
              <div class="form-group col-md-4">
                <validation-provider rules="required" v-slot="{ errors }">
                  <fieldset
                    v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                    v-tooltip.bottom="{
                      content: errors[0],
                      class:
                        errors.length !== 0 ? 'anest-tooltip' : 'tooltip-hide'
                    }"
                  >
                    <legend>Mật khẩu cũ</legend>
                    <input
                      type="password"
                      name="mật khẩu cũ"
                      class="form-control"
                      v-model="changePassword.oldPassword"
                    />
                  </fieldset>
                </validation-provider>
              </div>
              <div class="form-group col-md-4">
                <validation-provider
                  vid="password"
                  rules="required"
                  name="mật khẩu mới"
                  v-slot="{ errors }"
                >
                  <fieldset
                    v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                    v-tooltip.bottom="{
                      content: errors[0],
                      class:
                        errors.length !== 0 ? 'anest-tooltip' : 'tooltip-hide'
                    }"
                  >
                    <legend>Mật khẩu mới</legend>
                    <input
                      type="password"
                      class="form-control"
                      v-model="changePassword.currentPassword"
                    />
                  </fieldset>
                </validation-provider>
              </div>
              <div class="form-group col-md-4">
                <validation-provider
                  rules="required|checkRePassword:@password"
                  v-slot="{ errors }"
                >
                  <fieldset
                    v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                    v-tooltip.bottom="{
                      content: errors[0],
                      class:
                        errors.length !== 0 ? 'anest-tooltip' : 'tooltip-hide'
                    }"
                  >
                    <legend>Xác nhận mật khẩu mới</legend>
                    <input
                      type="password"
                      name="mật khẩu xác nhận"
                      class="form-control"
                      v-model="changePassword.newPassword"
                    />
                  </fieldset>
                </validation-provider>
              </div>
              <div class="col-md-12 text-right">
                <button
                  type="submit"
                  :disabled="invalid"
                  class="btn btn-lg btn-gray mb-3"
                  @click.prevent="updatePassword()"
                >
                  <font-awesome-icon
                    class="text-sea-green mr-2"
                    :icon="['fas', 'check']"
                  />Xác nhận
                </button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Watch, Component, Vue } from "vue-property-decorator";
import QuickAction from "@/components/utils/QuickAction.vue";

import { getModule } from "vuex-module-decorators";
import ProfileModule from "../../store/profile/profile.module";
import { Profile } from "@/types/profile/profile";
import { ChangePassword } from "@/types/auth/changePassword";
import { changePasswordService } from "../../services/setting/changePassword.service";
import { profileService } from "../../services/profile/profile.service";
import { format } from "date-fns";

import DatePicker from "vue2-datepicker";

import Swal from "sweetalert2";
import { ToastSucess, ToastError } from "@/mixins/sweetalert.mixin";

@Component({
  components: {
    QuickAction,
    DatePicker
  }
})
export default class UpdateInfo extends Vue {
  // private profile: Profile = null;

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

  dateOfBirth: Date | null = null;

  private ProfileInstance = getModule(ProfileModule, this.$store);

  private changePassword: ChangePassword = {
    oldPassword: "",
    currentPassword: "",
    newPassword: ""
  };
  toastSucess = Swal.mixin(ToastSucess);

  toastError = Swal.mixin(ToastError);
  async mounted() {
    document.title = "Cập nhật thông tin cá nhân";
    const loader = this.$loading.show();
    this.firstLoad().then(() => {
      loader.hide();
    });
  }

  async firstLoad() {
    await this.getProfile();
  }

  async getProfile() {
    try {
      await this.ProfileInstance.fetchProfile();
      this.profile = this.ProfileInstance.getProfile;
      if (this.profile) {
        this.dateOfBirth = this.getDate(this.profile.dateOfBirth);
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  async updatePassword() {
    const loader = this.$loading.show();
    try {
      const response = await changePasswordService.updatePassword(
        this.changePassword
      );
      if (response.status == 200) {
        this.toastSucess.fire({
          icon: "success",
          title: "Đổi mật khẩu thành công"
        });
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    } finally {
      loader.hide();
    }
  }

  @Watch("dateOfBirth")
  setDateOfBirth() {
    if (this.profile) {
      this.dateOfBirth?.setHours(0);
      this.profile.dateOfBirth = this.dateOfBirth?.getTime() || 0;
    }
  }

  async updateProfile() {
    const loader = this.$loading.show();
    try {
      const response = await profileService.updateProfile(this.profile);
      if (response.status == 200) {
        this.toastSucess.fire({
          icon: "success",
          title: "Cập nhật thành công thông tin cá nhân"
        });
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    } finally {
      loader.hide();
    }
  }

  setRegisterDob(dateString: string) {
    const date = new Date(dateString);
    date.setHours(0);
    if (this.profile) this.profile.dateOfBirth = date.getTime();
  }

  getDate(date: number): Date {
    return new Date(format(date, "MM/dd/yyyy"));
  }
}
</script>

<style scoped lang="scss">
.right {
  .fix-height {
    padding-top: 4px;
    padding-bottom: 3px;
  }

  .about .about-info {
    padding: 1rem 1rem 0.25rem 1rem;
  }

  .change-password .change-password-info {
    padding: 1rem 1rem 0.25rem 1rem;
  }
}
.form-group .is-invalid {
  border-color: #f18072 !important;
}

@import "../../assets/scss/nav-pills.scss";
@import "../../assets/scss/form.scss";
</style>
