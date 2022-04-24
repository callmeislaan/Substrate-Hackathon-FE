import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { mentorIncomeReportService } from "@/services/profile/mentorIncomeReport.service";
import { MentorIncomeReport } from "@/types/profile/mentorIncomeReport";

@Module({
  namespaced: true,
  name: "mentorIncomeReport"
})
export default class MentorIncomeReportModule extends VuexModule {
  // State
  mentorIncomeReport: MentorIncomeReport = null;

  // Getters
  get getMentorIncomeReport(): MentorIncomeReport {
    if (!this.mentorIncomeReport) {
      return null;
    }

    return {
      dailyIncome: this.mentorIncomeReport.dailyIncome,
      weeklyIncome: this.mentorIncomeReport.weeklyIncome,
      monthlyIncome: this.mentorIncomeReport.monthlyIncome
    };
  }

  // Mutations
  @Mutation
  setMentorIncomeReport(data: MentorIncomeReport): void {
    this.mentorIncomeReport = data;
  }

  // Actions
  @Action({ commit: "setMentorIncomeReport", rawError: true })
  async fetchMentorIncomeReport() {
    const response = await mentorIncomeReportService.getMentorIncomeReport();
    return response.data;
  }
}
