import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { eWalletService } from "@/services/profile/eWallet.service";
import { EWallets } from "@/types/profile/eWallet";

@Module({
  namespaced: true,
  name: "eWallets"
})
export default class EWalletModule extends VuexModule {
  // State
  eWallets: EWallets = null;

  // Getters
  get getEWallets(): EWallets {
    return this.eWallets;
  }

  // Mutations
  @Mutation
  setEWallets(data: EWallets): void {
    this.eWallets = data;
  }

  // Actions
  @Action({ commit: "setEWallets", rawError: true })
  async fetchEWallets() {
    const response = await eWalletService.getEWallets();
    return response.data.data;
  }
}
