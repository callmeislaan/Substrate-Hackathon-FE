import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { mentorOverviewService } from "@/services/profile/mentorOverview.service";
import { MentorOverview } from "@/types/profile/mentorOverview";

@Module({
  namespaced: true,
  name: "mentorOverview"
})
export default class MentorOverviewModule extends VuexModule {
  // State
  mentorOverview: MentorOverview = null;

  // Getters
  get getMentorOverview(): MentorOverview {
    if (!this.mentorOverview) {
      return null;
    }

    return {
      totalRequestReceive: this.mentorOverview.totalRequestReceive,
      totalRequestDeny: this.mentorOverview.totalRequestDeny,
      totalHoursBeHired: this.mentorOverview.totalHoursBeHired,
      averageRating: this.mentorOverview.averageRating,
      completionRate: this.mentorOverview.completionRate,
      rejectionRate: this.mentorOverview.rejectionRate
    };
  }

  // Mutations
  @Mutation
  setMentorOverview(data: MentorOverview): void {
    this.mentorOverview = data;
  }

  // Actions
  @Action({ commit: "setMentorOverview", rawError: true })
  async fetchMentorOverview() {
    const response = await mentorOverviewService.getMentorOverview();
    return response.data;
  }
}
