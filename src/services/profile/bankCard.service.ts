/* eslint-disable @typescript-eslint/no-explicit-any */
import { anestAxios } from "@/libs/axios";
import { BankCard } from "@/types/profile/bankCard";

const api = "api/mentor/bank-cards";
const registerApi = "api/mentor/bank-card";
class BankCardService {
  getBankCards() {
    return anestAxios.get<any>(`${api}`);
  }

  postBankCard(registerBank: BankCard) {
    return anestAxios.post<any>(`${registerApi}`, registerBank);
  }

  putBankCard(updateBank: BankCard, cardId: number) {
    return anestAxios.put<any>(`${registerApi}/${cardId}`, updateBank);
  }

  deleteBankCard(cardId: number) {
    return anestAxios.delete<any>(`${registerApi}/${cardId}`);
  }
}

// Export a singleton instance in the global namespace
export const bankCardService = new BankCardService();
