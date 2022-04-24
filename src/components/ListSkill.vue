<template>
  <div class="skills">
    <template v-for="(skill, index) in skills">
      <a
        href=""
        class="tag"
        :class="{ selected: isSelected(skill) }"
        :key="index"
        @click.prevent="toogleSelectSkill(skill)"
        >{{ skill.name }}</a
      >
    </template>
  </div>
</template>

<script lang="ts">
import { getModule } from "vuex-module-decorators";
import { Watch, Component, Prop, Vue } from "vue-property-decorator";
import { Skill, Skills } from "@/types/skill";

import SkillModule from "../store/skill/skill.module";

import Swal from "sweetalert2";
import { ToastSucess } from "@/mixins/sweetalert.mixin";
import { ToastError } from "@/mixins/sweetalert.mixin";

@Component
export default class ListSkill extends Vue {
  @Prop({ type: Array, default: () => null })
  readonly listSkill!: Skills;

  @Prop({ type: Array, default: () => null })
  readonly selectedSkills!: Skills;

  @Prop({ type: Number, default: 0 })
  readonly selectable!: number;

  selected: Skills = [];

  SkillInstance = getModule(SkillModule, this.$store);
  skills: Skills = null;

  toastSucess = Swal.mixin(ToastSucess);

  toastError = Swal.mixin(ToastError);

  @Watch("listSkill")
  updateListSkill() {
    if (this.listSkill == null) {
      this.getSkills().then(() => {
        if (this.selectedSkills) {
          this.updateSelected(this.selectedSkills);
        }
      });
    } else {
      this.skills = this.listSkill;
    }
  }

  @Watch("selectedSkills")
  updateSelected(value: Skills) {
    if (value) {
      const ids = value.map(item => item?.name);
      this.selected =
        this.skills?.filter(item => ids.includes(item?.name)) || [];
    }
  }

  created() {
    this.updateListSkill();
  }

  async getSkills() {
    try {
      await this.SkillInstance.fetchSkills();
      this.skills = this.SkillInstance.getSkills;
      this.skills =
        this.skills?.map(item => {
          if (item) {
            item.value = 1;
            return item;
          }
          return item;
        }) || [];
    } catch (e) {
      this.skills = null;
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  toogleSelectSkill(skill: Skill) {
    if (!this.selectable) return;

    if (this.selected !== null) {
      if (this.selected.includes(skill)) {
        this.selected.splice(this.selected.indexOf(skill), 1);
      } else {
        if (this.selected.length >= this.selectable) return;
        this.selected.push(skill);
      }
    }

    this.$emit("selected", this.selected);
  }

  isSelected(skill: Skill) {
    if (!this.selected || !skill) return false;
    return this.selected.some(selectedSkill => selectedSkill == skill);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/config/color";

$color-tag-text: #e4e6eb;

.tag {
  font-size: 0.825rem;
  display: inline-block;
  padding: 0.3rem 0.75rem 0.3rem;
  border-radius: 2rem;
  text-transform: uppercase;
  color: $color-tag-text !important;
  border: 2px solid $color-dark;
  font-style: normal;
  font-weight: 500;
  margin-right: 0.75rem;
  transition: 0.3s;
  background-color: transparent;
  white-space: nowrap !important;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    text-decoration: none;
    border: 2px solid $color-dark;
    background-color: $color-dark;
  }

  &.selected {
    text-decoration: none;
    border: 2px solid $color-dark;
    background-color: $color-dark;
  }
}

.skills.home {
  display: flex;
  align-items: stretch;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    height: 0;
  }
}

.small.skills {
  .tag {
    margin-top: 0.35rem;
    padding: 0.2rem 0.5rem;
    color: #b0b3b8 !important;
    border: 2px solid #464646;
    font-weight: 700;
    font-size: 0.6rem;
    margin-bottom: 0.25rem;
  }
  max-height: 4.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.x-small.skills {
  .tag {
    font-weight: 500;
    padding: 0.15rem 0.45rem;
  }
}
</style>
<style scoped>
/* .skills {
  padding-top: 3rem;
} */
</style>
