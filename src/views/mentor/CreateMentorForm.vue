<template>
  <div class="about">
    <div class="about-info bg-dark-ui border-ui mb-4">
      <h6 class="title ml-1">Đăng ký mentor</h6>
      <ValidationObserver v-slot="{ invalid }">
        <form>
          <div class="form-row">
            <div class="form-group col-6">
              <validation-provider
                rules="required|limitJob"
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
                  <legend>Nghề nghiệp</legend>
                  <input
                    v-model="signUpMentor.job"
                    placeholder="Nhập nghề nghiệp"
                    name="nghề nghiệp"
                    type="text"
                    class="form-control"
                  />
                </fieldset>
              </validation-provider>
            </div>
            <div class="form-group col-6">
              <validation-provider
                rules="required|priceOfMentor"
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
                  <legend>Giá cơ bản</legend>
                  <input
                    v-model="signUpMentor.price"
                    type="text"
                    name="giá cơ bản"
                    class="form-control"
                  />
                </fieldset>
              </validation-provider>
            </div>
            <div class="form-group col-md-12">
              <validation-provider rules="required" v-slot="{ errors }">
                <fieldset
                  v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                  v-tooltip.bottom="{
                    content: errors[0],
                    class:
                      errors.length !== 0 ? 'anest-tooltip' : 'tooltip-hide'
                  }"
                >
                  <legend>Giới thiệu bản thân</legend>
                  <textarea
                    v-model="signUpMentor.introduction"
                    placeholder="Nhập thông tin bản thân"
                    type="text"
                    name="giới thiệu bản thân"
                    class="form-control"
                    rows="8"
                  />
                </fieldset>
              </validation-provider>
            </div>
            <div class="form-group col-md-12">
              <validation-provider rules="required" v-slot="{ errors }">
                <fieldset
                  v-bind:class="errors.length !== 0 ? 'p-3 is-invalid' : 'p-3'"
                  v-tooltip.bottom="{
                    content: errors[0],
                    class:
                      errors.length !== 0 ? 'anest-tooltip' : 'tooltip-hide'
                  }"
                >
                  <textarea
                    v-model="signUpMentor.skillDescription"
                    placeholder="Tổng quan về kỹ năng cá nhân"
                    name="tổng quan về kỹ năng"
                    type="text"
                    class="form-control"
                    rows="3"
                  />
                  <legend>Kỹ năng</legend>
                  <list-skill :selectable="999999" @selected="setListSkill" />
                  <skill-slider
                    class="m-2 mt-4"
                    :list-skill="skills"
                    @changed="setListMentorSkill"
                  />
                </fieldset>
              </validation-provider>
            </div>
            <div class="form-group col-md-12">
              <fieldset class="bg-dark-ui">
                <legend>Thành tích</legend>
                <mentor-achievement-form></mentor-achievement-form>
              </fieldset>
            </div>
            <div class="form-group col-md-12">
              <validation-provider rules="required" v-slot="{ errors }">
                <fieldset
                  v-bind:class="errors.length !== 0 ? 'p-3 is-invalid' : 'p-3'"
                  v-tooltip.bottom="{
                    content: errors[0],
                    class:
                      errors.length !== 0 ? 'anest-tooltip' : 'tooltip-hide'
                  }"
                >
                  <legend>Dịch vụ cung cấp</legend>
                  <textarea
                    v-model="signUpMentor.service"
                    placeholder="Nhập thông tin dịch vụ"
                    type="text"
                    name="dịch vụ cung cấp"
                    class="form-control"
                    rows="4"
                  />
                </fieldset>
              </validation-provider>
            </div>
            <div class="form-group col-md-12 text-right">
              <button
                class="btn-anest"
                :disabled="invalid"
                @click.prevent="showConfirm('Xác nhận đăng ký')"
              >
                <font-awesome-icon
                  :icon="['fas', 'check']"
                  class="text-tan"
                  fixed-width
                />
                Đăng ký
              </button>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { getModule } from "vuex-module-decorators";
import AuthModule from "@/store/auth/auth.module";
import AchievementModule from "@/store/profile-mentor/achievement.module";

import { Skills } from "@/types/skill.ts";
import { SignUpMentor } from "@/types/mentor.ts";

import ListSkill from "@/components/ListSkill.vue";
import SkillSlider from "@/components/skill/SkillSlider.vue";
import MentorAchievementForm from "@/views/mentor-profile/MentorAchievementForm.vue";
import { mentorService } from "@/services/mentor/mentors.service";

import ConfirmModal from "@/components/modal/ConfirmModal.vue";

import Swal from "sweetalert2";
import { ToastError, ConfirmMixin } from "@/mixins/sweetalert.mixin";

@Component({
  components: {
    ListSkill,
    SkillSlider,
    MentorAchievementForm,
    ConfirmModal
  }
})
export default class CreateMentorForm extends Vue {
  AuthInstance = getModule(AuthModule, this.$store);
  AchievementInstance = getModule(AchievementModule, this.$store);
  signUpMentor: SignUpMentor = {
    job: "",
    introduction: "",
    skillDescription: "",
    mentorSkills: [],
    service: "",
    price: 50000,
    achievements: []
  };
  skills: Skills = null;

  toastError = Swal.mixin(ToastError);
  confirmMixin = Swal.mixin(ConfirmMixin);

  created() {
    this.AchievementInstance.clearAchievements();
  }

  confirmAlert = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success ml-1",
      cancelButton: "btn btn-anest-light mr-1"
    },
    buttonsStyling: false
  });

  setListSkill(skills: Skills) {
    if (this.signUpMentor === null) return;
    this.skills = skills;
    if (this.skills) {
      this.skills.forEach(skill => {
        if (!skill) return;
        const mentorSkillIds =
          this.signUpMentor?.mentorSkills?.map(skill => skill?.id) || [];
        if (!mentorSkillIds.includes(skill.id)) {
          this.signUpMentor?.mentorSkills?.push(skill);
        }
      });
    }
  }

  showConfirm() {
    this.confirmMixin
      .fire({
        title: "Xác nhận đăng ký"
      })
      .then(result => {
        if (result.isConfirmed) {
          this.submit();
        }
      });
  }

  setListMentorSkill(listSkillMentor: Skills) {
    if (this.signUpMentor) {
      this.signUpMentor.mentorSkills = listSkillMentor;
    }
  }

  async submit() {
    const loader = this.$loading.show();
    if (!this.signUpMentor) return;
    try {
      this.signUpMentor.achievements = this.AchievementInstance.getAchievements;
      const response = await mentorService.register(this.signUpMentor);
      if (response.status == 200) {
        this.AuthInstance.toogleSignUpMentor(true);
        this.AchievementInstance.clearAchievements();
        this.$router.push({ name: "MentorProfile" });
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

<style lang="scss">
@import "~@/assets/scss/components/datepicker.scss";
</style>

<style lang="scss" scoped>
@import "~@/assets/scss/form.scss";

.about .about-info {
  padding: 1rem 1rem 0.25rem 1rem;
}
.btn-anest {
  border: 2px solid #3a3b3c;
}

$default-color: red;
$primary-color: blue;
</style>

<style scoped>
.skills >>> .tag {
  margin-bottom: 0.5rem;
}
.form-group .is-invalid {
  border-color: #f18072 !important;
}
</style>
