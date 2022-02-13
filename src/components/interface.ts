export interface Expense {
  item: string;
  amount: number;
  paidBy: string;
  detail: MemberExpense[];
  isEquallySplit: boolean;
  isInvalid: boolean;
}

export interface MemberExpense {
  name: string;
  amount: number;
}

export interface ToPayAndPaid {
  name: string;
  toPay: number;
  paid: number;
  debt: number;
}

export interface Summary {
  payer: string;
  receiver: string;
  amount: number;
}
export interface Debt {
  name: string;
  debt: number;
}
