export type EWallet = {
  id: string,
  holderName: string;
  eWalletName: string;
  phone: string;
} | null;

export type EWallets = EWallet[] | null;
