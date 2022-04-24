<template>
  <div class="skill-checkbox-wrapper">
    <div
      class="skill-checkbox custom-control custom-checkbox"
      v-for="(skill, index) in skills"
      :key="index"
    >
      <input
        v-model="selected"
        type="checkbox"
        class="custom-control-input"
        :id="skill.id"
        :value="skill.id"
        @change="emitChange"
      />
      <label class="custom-control-label" :for="skill.id">
        {{ skill.name }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { getModule } from "vuex-module-decorators";
import SkillModule from "@/store/skill/skill.module";

import { Skills } from "@/types/skill";

@Component
export default class SkillCheckbox extends Vue {
  SkillInstance = getModule(SkillModule, this.$store);

  skills: Skills = [];
  selected: Skills = [];

  created() {
    this.getSkills();
  }

  async getSkills() {
    await this.SkillInstance.fetchSkills();
    this.skills = this.SkillInstance.getSkills;
  }

  emitChange() {
    this.$emit("change", this.selected);
  }
}
</script>

<style lang="scss" scoped>
.skill-checkbox {
  display: inline-block;
  width: 50%;
  margin-left: 0;
  margin-right: 0;
  padding-left: 2rem;
  font-size: 0.8rem;
}

.custom-control-input {
  z-index: 1;
  left: 0.5rem;
}

.custom-control-input:checked ~ .custom-control-label {
  font-weight: bold;
  color: #fff;
}
</style>
