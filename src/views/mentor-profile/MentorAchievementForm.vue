<template>
  <div class="achievement-form">
    <div
      class="pl-4 position-relative"
      v-for="(achievement, index) in achievements"
      :key="index"
    >
      <div class="form-group col-md-4">
        <textarea
          placeholder="Tiêu đề"
          type="text"
          class="form-control"
          v-model="achievement.title"
          @input="updateToState"
        />
      </div>
      <div class="form-group col-md-8">
        <textarea
          placeholder="Nội dung"
          type="text"
          class="form-control scroll"
          v-model="achievement.content"
          @input="updateToState"
        />
      </div>
      <button class="btn btn-remove" @click.prevent="removeLine(index)">
        <font-awesome-icon :icon="['fas', 'minus']" />
      </button>
    </div>
    <span class="d-block w-100 text-center text-danger" v-if="isEmpty">
      Tiêu đề thành tích không được rỗng
    </span>
    <span
      class="d-block w-100 text-center text-danger"
      v-if="!isEmpty && isDuplicate"
    >
      Tiêu đề thành tích không được trùng lặp
    </span>
    <button class="btn btn-add" @click.prevent="addLine">
      <font-awesome-icon :icon="['fas', 'plus']" />
      Thêm thành tích
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import { getModule } from "vuex-module-decorators";
import AchievementModule from "@/store/profile-mentor/achievement.module";

import { Achievement } from "@/types/achievement";

@Component
export default class MentorAchievementForm extends Vue {
  AchievementInstance = getModule(AchievementModule, this.$store);

  achievements = this.AchievementInstance.getAchievements;

  @Prop() readonly mentorId: number | undefined;

  @Watch("mentorId", { immediate: true })
  async getMentorAchievementInfo() {
    if (!this.mentorId) {
      this.achievements = [];
      return;
    }
    await this.AchievementInstance.fetchAchievements(this.mentorId.toString());
    this.achievements = this.AchievementInstance.getAchievements;
  }

  created() {
    if (this.achievements.length === 0) this.addLine();
  }

  get isEmpty() {
    return this.achievements.find(item => item?.title === "");
  }

  get isDuplicate() {
    const set = new Set(this.achievements.map(item => item?.title));
    return set.size != this.achievements.length;
  }

  addLine() {
    const newAchievement: Achievement = { title: "", content: "" };
    this.achievements.push(newAchievement);
  }

  removeLine(index: number) {
    this.achievements.splice(index, 1);
  }

  updateToState() {
    this.AchievementInstance.updateAchievements(this.achievements);
    this.AchievementInstance.updateDuplicateStatus(this.isDuplicate);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/form.scss";

.form-group {
  display: inline-block;
  padding: 0.5rem;
  margin-bottom: 0.25rem;

  .form-control {
    padding-bottom: 0.25rem !important;
    border-bottom: 1px solid #90929693 !important;
  }
}

.right form fieldset textarea.form-control {
  height: 5rem;
}

.btn-add,
.btn-remove {
  color: #b0b3b8;
  font-size: 0.93rem;
  opacity: 0.8;

  &:hover {
    opacity: 1;
    color: #b0b3b8;
  }
}

.btn-remove {
  position: absolute;
  top: 0.25rem;
  left: 0rem;
}
</style>
