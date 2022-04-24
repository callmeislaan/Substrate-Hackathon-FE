/* eslint-disable @typescript-eslint/no-explicit-any */
import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { moneyInService } from "@/services/transaction/money-in.service";
import { moneyOutService } from "@/services/transaction/money-out.service";
import { moneyExchangeService } from "@/services/transaction/money-exchange.service";
import { TransactionHistorys } from "@/types/transaction/TransactionHistory";

@Module({
  namespaced: true,
  name: "transaction"
})
export default class TransactionHistoryModule extends VuexModule {
  // State
  totalRecord = 0;
  transactionHistorys: TransactionHistorys = null;

  // Getters
  get getTransactionHistorys(): any {
    return {
      transactionHistorys: this.transactionHistorys,
      totalRecord: this.totalRecord
    };
  }

  // Mutations
  @Mutation
  setTransactionHistorys(data: any): void {
    this.transactionHistorys = data.data;
    this.totalRecord = data.totalRecords;
  }

  @Action({ commit: "setTransactionHistorys", rawError: true })
  async fetchTransactionHistorys(params: Array<any>) {
    const response = await moneyInService.getTransactions(params[0], params[1]);
    return response.data;
  }

  @Action({ commit: "setTransactionHistorys", rawError: true })
  async fetchTransactionHistorysForOutMoney(params: Array<any>) {
    const response = await moneyOutService.getTransactions(
      params[0],
      params[1]
    );
    return response.data;
  }

  @Action({ commit: "setTransactionHistorys", rawError: true })
  async fetchTransactionHistorysForExchangeMoney(params: Array<any>) {
    const response = await moneyExchangeService.getTransactions(
      params[0],
      params[1]
    );
    return response.data;
  }
}
