export type BankCard = {
  id: string;
  holderName: string;
  accountNumber: string;
  bank: string;
  branch: string;
} | null;

export type BankCards = BankCard[] | null;
