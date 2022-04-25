/* eslint-disable @typescript-eslint/no-explicit-any */
import { anestAxios } from "@/libs/axios";

const api = "api/money-out-history";
class MoneyOutService {
  constructor() {
    console.log("creating new instance of transaction.service");
  }

  getTransactions(perPage: number, pageIndex: number) {
    return anestAxios.get<any>(`${api}`, {
      params: {
        page: pageIndex,
        size: perPage
      }
    });
  }
}

// Export a singleton instance in the global namespace
export const moneyOutService = new MoneyOutService();