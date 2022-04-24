export type TransactionHistory = {
  transactionId: string;
  createdDate: string;
  paymentMethod: string;
  amount: number;
  status: string;
};

export type TransactionHistorys = TransactionHistory[] | null;
