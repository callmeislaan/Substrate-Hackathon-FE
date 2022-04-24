<template>
  <div class="about">
    <div class="about-info bg-dark-ui border-ui mb-4" v-if="this.mentorInfo">
      <h6 class="title ml-1">Cập nhật trang hồ sơ</h6>
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
                    v-model="mentorInfo.job"
                    name="nghề nghiệp"
                    placeholder="Nhập nghề nghiệp"
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
                    v-model="mentorInfo.price"
                    name="giá cơ bản"
                    type="text"
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
                    v-model="mentorInfo.introduction"
                    placeholder="Nhập thông tin bản thân"
                    type="text"
                    name="giới thiệu bản thân"
                    class="form-control scroll"
                    rows="8"
                  />
                </fieldset>
              </validation-provider>
            </div>
            <div class="form-group col-md-12">
              <fieldset class="bg-dark-ui p-3">
                <textarea
                  v-model="mentorInfo.skillDescription"
                  placeholder="Tổng quan về kỹ năng cá nhân"
                  type="text"
                  class="form-control scroll"
                  rows="3"
                  id="skill-textarea"
                />
                <legend>Kỹ năng</legend>
                <list-skill
                  v-if="mentorInfo.mentorSkillResponses"
                  :selected-skills="skills"
                  :selectable="999999"
                  @selected="setListSkill"
                />
                <skill-slider
                  v-if="mentorInfo.mentorSkillResponses"
                  class="m-2 mt-4"
                  :list-skill="skills"
                  @changed="setListMentorSkill"
                />
              </fieldset>
            </div>

            <div class="form-group col-md-12">
              <fieldset class="bg-dark-ui">
                <legend>Thành tích</legend>
                <mentor-achievement-form
                  :mentor-id="AuthInstance.currentUser.id"
                ></mentor-achievement-form>
              </fieldset>
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
                  <legend>Dịch vụ cung cấp</legend>
                  <textarea
                    v-model="mentorInfo.service"
                    placeholder="Nhập thông tin dịch vụ"
                    type="text"
                    class="form-control scroll"
                    rows="4"
                    name="dịch vụ cung cấp"
                    id="service-textarea"
                  />
                </fieldset>
              </validation-provider>
            </div>
            <div class="form-group col-md-12 text-right">
              <button
                class="btn-anest"
                :disabled="invalid"
                @click.prevent="updateMentor"
              >
                <font-awesome-icon
                  :icon="['fas', 'check']"
                  class="text-tan"
                  fixed-width
                />
                Cập nhật
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

import { Skills } from "@/types/skill.ts";
import { Achievements } from "@/types/achievement";
import { SignUpMentor } from "@/types/mentor.ts";
import { MentorInfo } from "@/types/profile-mentor/mentorInfo";
import AchievementModule from "@/store/profile-mentor/achievement.module";

import ListSkill from "@/components/ListSkill.vue";
import SkillSlider from "@/components/skill/SkillSlider.vue";
import { mentorService } from "@/services/mentor/mentors.service";
import MentorInfoModule from "../../store/profile-mentor/mentorInfo.module";
import { getModule } from "vuex-module-decorators";
import AuthModule from "../../store/auth/auth.module";
import MentorAchievementForm from "@/views/mentor-profile/MentorAchievementForm.vue";

import Swal from "sweetalert2";
import { ToastSucess } from "@/mixins/sweetalert.mixin";
import { ToastError } from "@/mixins/sweetalert.mixin";

@Component({
  components: {
    ListSkill,
    SkillSlider,
    MentorAchievementForm
  }
})
export default class UpdateMentorForm extends Vue {
  private mentorInfo: MentorInfo = null;
  private MentorInfoInstance = getModule(MentorInfoModule, this.$store);
  private AuthInstance = getModule(AuthModule, this.$store);
  private AchievementInstance = getModule(AchievementModule, this.$store);

  private signUpMentor: SignUpMentor = {
    job: "",
    introduction: "",
    skillDescription: "",
    mentorSkills: [],
    service: "",
    price: 50000,
    achievements: []
  };
  skills: Skills = null;
  listAchievement: Achievements = [];

  newSkills: Skills = null;

  toastSucess = Swal.mixin(ToastSucess);

  toastError = Swal.mixin(ToastError);

  setListSkill(skills: Skills) {
    if (this.signUpMentor === null || !this.skills) return;
    const oldIds = this.skills.map(item => item?.id);
    const newSkills = skills?.map(item =>
      oldIds.includes(item?.id)
        ? this.skills?.find(skill => skill?.id == item?.id) || null
        : item
    );
    this.skills = newSkills || [];
  }

  // setListAchievement(skills: Skills) {
  //   if (this.signUpMentor === null || !this.skills) return;
  //   const oldIds = this.skills.map(item => item?.id);
  //   const newSkills = skills?.map(item =>
  //     oldIds.includes(item?.id)
  //       ? this.skills?.find(skill => skill?.id == item?.id) || null
  //       : item
  //   );
  //   this.skills = newSkills || [];
  // }

  setListMentorSkill(listSkillMentor: Skills) {
    if (this.signUpMentor) {
      this.signUpMentor.mentorSkills = listSkillMentor;
    }
  }

  setSignUpMentor(mentor: MentorInfo) {
    if (this.signUpMentor && mentor) {
      this.signUpMentor.job = mentor.job;
      this.signUpMentor.introduction = mentor.introduction;
      this.signUpMentor.skillDescription = mentor.skillDescription;
      this.signUpMentor.service = mentor.service;
      this.signUpMentor.price = mentor.price;
      this.signUpMentor.mentorSkills = this.skills;
      this.signUpMentor.achievements = this.AchievementInstance.getAchievements;
    }
  }

  async mounted() {
    const loader = this.$loading.show();
    this.firstLoad().then(() => {
      loader.hide();
    });
  }

  async firstLoad() {
    await this.getMentorInfo();
  }

  async getMentorInfo() {
    try {
      if (this.AuthInstance.currentUser) {
        await this.MentorInfoInstance.getMentorInfoByUserId(
          this.AuthInstance.currentUser.id.toString()
        );
        this.mentorInfo = this.MentorInfoInstance.getMentorInfo;
        this.skills = this.mentorInfo?.mentorSkillResponses || [];
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  async updateMentor() {
    if (!this.signUpMentor) return;
    if (this.signUpMentor && this.mentorInfo) {
      this.signUpMentor.job = this.mentorInfo.job;
      this.signUpMentor.introduction = this.mentorInfo.introduction;
      this.signUpMentor.skillDescription = this.mentorInfo.skillDescription;
      this.signUpMentor.service = this.mentorInfo.service;
      this.signUpMentor.price = this.mentorInfo.price;
      this.signUpMentor.mentorSkills = this.skills;
      this.signUpMentor.achievements = this.AchievementInstance.getAchievements;
    }
    try {
      const response = await mentorService.updateMentor(this.signUpMentor);
      if (response.status == 200) {
        this.toastSucess.fire({
          icon: "success",
          title: "Cập nhật thành công"
        });
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
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

#service-textarea {
  height: 10rem !important;
}

$default-color: red;
$primary-color: blue;
</style>

<style scoped>
.skills >>> .tag {
  margin-bottom: 0.5rem;
}
#skill-textarea {
  height: 10rem !important;
}
.form-group .is-invalid {
  border-color: #f18072 !important;
}
</style>
