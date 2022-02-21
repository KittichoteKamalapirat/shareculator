export interface Expense {
  item: string;
  amount: number;
  paidByIndex: number; //index of memberArray
  detail: number[]; //array of number match to index
  splitAmong: boolean[];
  isEquallySplit: boolean;
  isInvalid: boolean;
}

// export interface MemberExpense {
//   name: string;
//   amount: number;
// }

export interface ToPayAndPaid {
  memberIndex: number;
  toPay: number;
  paid: number;
  debt: number;
}

export interface Summary {
  payerIndex: number;
  receiverIndex: number;
  amount: number;
}
export interface Debt {
  name: string;
  debt: number;
}

export interface Spender {
  nameIndex: number;
  paidAmount: number;
}
