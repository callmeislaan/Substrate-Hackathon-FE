<template>
  <div>
    <div class="row" v-for="(skill, index) in listMentorSkill" :key="index">
      <div class="col-2">
        <span class="skill-name">{{ skill.name }}</span>
      </div>
      <div class="col-8">
        <vue-slider
          v-model="skill.value"
          :min="1"
          :max="10"
          @change="emitChange"
        />
      </div>
      <div class="col-2">
        <p>{{ skill.value }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { Skills } from "@/types/skill";

import VueSlider from "vue-slider-component";

@Component({
  components: {
    VueSlider
  }
})
export default class SkillSlider extends Vue {
  @Prop({ type: Array, default: () => null })
  readonly listSkill!: Skills;

  listMentorSkill: Skills = [];

  @Watch("listSkill")
  onPropertyChanged(value: Skills) {
    if (value) {
      this.listMentorSkill = this.listSkill;
    }
    return null;
  }

  created() {
    if (this.listSkill) {
      this.listMentorSkill = this.listSkill;
    }
  }

  emitChange() {
    this.$emit("changed", this.listMentorSkill);
    this.$forceUpdate();
  }
}
</script>

<style lang="scss">
$themeColor: #7aa849;
@import "~vue-slider-component/lib/theme/default.scss";
</style>

<style lang="scss" scoped>
.skill-name {
  font-size: 0.85rem;
  font-weight: 500;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;
  border-radius: 0.5rem;
  height: 0.45rem;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 1rem;
    height: 1rem;
    background: #4caf50; /* Green background */
    border-radius: 50%;
    cursor: pointer; /* Cursor on hover */
  }
}
</style>
