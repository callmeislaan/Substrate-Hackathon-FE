import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { mentorService } from "@/services/mentor/mentors.service";
import { Achievements } from "@/types/achievement";

@Module({
  namespaced: true,
  name: "achievement"
})
export default class AchievementModule extends VuexModule {
  achievements: Achievements = [];
  isDuplicate = false;

  get getAchievements(): Achievements {
    return this.achievements;
  }

  @Mutation
  _updateAchievement(achievements: Achievements) {
    this.achievements = achievements;
  }

  @Action({ commit: "_updateAchievement", rawError: true })
  updateAchievements(data: Achievements) {
    return data;
  }

  @Mutation
  _clearAchievement() {
    this.achievements.length = 0;
  }

  @Action({ commit: "_clearAchievement", rawError: true })
  clearAchievements() {
    return;
  }

  @Mutation
  _updateDuplicateStatus(isDuplicate: boolean) {
    this.isDuplicate = isDuplicate;
  }

  @Action({ commit: "_updateDuplicateStatus", rawError: true })
  updateDuplicateStatus(isDuplicate: boolean) {
    return isDuplicate;
  }

  @Action({ commit: "_updateAchievement", rawError: true })
  async fetchAchievements(mentorId: string) {
    const response = await mentorService.getAchievements(mentorId);
    return response.data.data;
  }
}
