import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { bankCardService } from "@/services/profile/bankCard.service";
import { BankCards } from "@/types/profile/bankCard";

@Module({
  namespaced: true,
  name: "bankCards"
})
export default class BankCardModule extends VuexModule {
  // State
  bankCards: BankCards = null;

  // Getters
  get getBankCards(): BankCards {
    // if(!this.bankCards) {
    //   return null;
    // }
    return this.bankCards;

    // return {
    //     dailyIncome: this.mentorIncomeReport.dailyIncome,
    //     weeklyIncome: this.mentorIncomeReport.weeklyIncome,
    //     monthlyIncome: this.mentorIncomeReport.monthlyIncome
    // }
  }

  // Mutations
  @Mutation
  setBankCards(data: BankCards): void {
    this.bankCards = data;
  }

  // Actions
  @Action({ commit: "setBankCards", rawError: true })
  async fetchBankCards() {
    const response = await bankCardService.getBankCards();
    return response.data.data;
  }
}
