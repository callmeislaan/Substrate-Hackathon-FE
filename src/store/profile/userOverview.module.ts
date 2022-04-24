import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { userOverviewService } from "@/services/profile/userOverview.service";
import { UserOverview } from "@/types/profile/userOverview";

@Module({
  namespaced: true,
  name: "userOverview"
})
export default class UserOverviewModule extends VuexModule {
  // State
  userOverview: UserOverview = null;

  // Getters
  get getUserOverview(): UserOverview {
    if (!this.userOverview) {
      return null;
    }

    return {
      // totalBudgetCurrent: this.profile?.totalBudgetCurrent,
      // totalBudgetIn: this.profile?.totalBudgetIn,
      totalRequestCreate: this.userOverview?.totalRequestCreate,
      totalHoursHiredMentor: this.userOverview?.totalHoursHiredMentor,
      totalPeopleHired: this.userOverview?.totalPeopleHired
    };
  }

  // Mutations
  @Mutation
  setUserOverview(data: UserOverview): void {
    this.userOverview = data;
  }

  // Actions
  @Action({ commit: "setUserOverview", rawError: true })
  async fetchUserOverview() {
    const response = await userOverviewService.getUserOverview();
    return response.data;
  }
}
