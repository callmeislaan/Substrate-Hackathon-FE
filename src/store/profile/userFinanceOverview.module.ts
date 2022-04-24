import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { userFinanceOverviewService } from "@/services/profile/userFinanceOverview.service";
import { UserFinanceOverview } from "@/types/profile/userFinanceOverview";

@Module({
  namespaced: true,
  name: "userFinanceOverview"
})
export default class UserFinanceOverviewModule extends VuexModule {
  // State
  userFinanceOverview: UserFinanceOverview = null;
  reloadTrigger = false;

  // Getters
  get getUserFinanceOverview(): UserFinanceOverview {
    if (!this.userFinanceOverview) {
      return null;
    }

    return {
      totalBudgetCurrent: this.userFinanceOverview.totalBudgetCurrent,
      totalBudgetIn: this.userFinanceOverview.totalBudgetIn,
      totalMoneyCurrent: this.userFinanceOverview.totalMoneyCurrent
    };
  }

  get triggerState() {
    return this.reloadTrigger;
  }

  // Mutations
  @Mutation
  setUserFinanceOverview(data: UserFinanceOverview): void {
    this.userFinanceOverview = data;
  }

  // Actions
  @Action({ commit: "setUserFinanceOverview", rawError: true })
  async fetchUserFinanceOverview() {
    const response = await userFinanceOverviewService.getUserFinanceOverview();
    return response.data;
  }

  @Mutation
  _triggerReload() {
    this.reloadTrigger = !this.reloadTrigger;
  }

  @Action({ commit: "_triggerReload" })
  triggerReload() {
    return;
  }
}
