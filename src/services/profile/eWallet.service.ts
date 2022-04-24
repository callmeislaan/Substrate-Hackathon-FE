/* eslint-disable @typescript-eslint/no-explicit-any */
import { anestAxios } from "@/libs/axios";
import { EWallet } from "@/types/profile/eWallet";

const api = "api/mentor/e-wallets";
const registerApi = "api/mentor/e-wallet";
class EWalletService {
  getEWallets() {
    return anestAxios.get<any>(`${api}`);
  }

  postEWallets(resgiterEwallet: EWallet) {
    return anestAxios.post<any>(`${registerApi}`, resgiterEwallet);
  }

  putEwallet(updateEwallet: EWallet, ewalletId: number) {
    return anestAxios.put<any>(`${registerApi}/${ewalletId}`, updateEwallet);
  }

  deleteEwallet(ewalletId: number) {
    return anestAxios.delete<any>(`${registerApi}/${ewalletId}`);
  }
}

// Export a singleton instance in the global namespace
export const eWalletService = new EWalletService();
