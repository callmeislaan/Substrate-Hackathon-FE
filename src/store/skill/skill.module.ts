import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { skillService } from "@/services/skill/skills.service";
import { Skill, Skills } from "@/types/skill";

@Module({
  namespaced: true,
  name: "skill"
})
export default class SkillModule extends VuexModule {
  // State
  skills: Skills = null;
  skill: Skill = null;

  // Getters
  get getSkills(): Skills {
    return this.skills;
  }

  get getSkill(): Skill {
    return this.skill;
  }

  // Mutations
  @Mutation
  setSkills(data: Skills): void {
    this.skills = data;
  }

  @Mutation
  setSkill(data: Skill): void {
    this.skill = data;
  }

  @Action({ commit: "setSkills", rawError: true })
  async fetchSkills() {
    const response = await skillService.getSkills();
    return response.data.data;
  }

  @Action({ commit: "setSkill", rawError: true })
  async getSkillById(id: string) {
    const response = await skillService.getSkill(id);
    return response.data;
  }
}
