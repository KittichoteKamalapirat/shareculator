import { Expense, Spender, Summary, ToPayAndPaid } from "./interface";

export const summarizeToBySpender = (
  expenseArray: Expense[],
  memberArray: string[]
) => {
  const result: number[] = memberArray.map((member) => 0);
  // [{nameIndex: 0, paidAmount: 20},{nameIndex: 1, paidAmount: 20}]
  for (const expense of expenseArray) {
    result[expense.paidByIndex] += parseInt(expense.amount as any);
  }
  return result;
};

export const finalize = (
  bySpenders: number[], //[{nameIndex: 0, amountPaid: 30}, {nameIndex: 1, amountPaid: 30}]
  byMembers: number[] //[30,10,30]
) => {
  const result: Summary[] = [];

  //reformat

  // for(let i = 0 ; i < bySpenders.length ; i++){

  // }

  const toPayAndPaidArray: ToPayAndPaid[] = byMembers.map((amount, index) => {
    const debt = amount - bySpenders[index];

    const toPayAndPaid: ToPayAndPaid = {
      memberIndex: index,
      toPay: amount,
      paid: bySpenders[index],
      debt,
    };

    return toPayAndPaid;
  });

  //   { name: Shane, toPay: 33.33, paid: 100, debt: 33.33-100 }
  //   { name: Ant, toPay: 33.33, paid: 0, debt: 33.33-0 }
  //   { name: Joe, toPay: 33.33, paid: 0, debt: 33.33-0 }

  //firstly, max debt => Ant
  //firstly, max lender => Shane
  //firstly, Ant is removed AND Shan'es debt from -66.66 -> -33.33

  //secondly, max debt => Joe
  //secondly, max lender => Shane
  //secondly, Joe is removed AND Shan'es debt from -33.33 -> 0

  //thirdly, max debtor => Shane
  //secondly, max lender => Shane

  //who pays who algorithm

  //> 0 -> give bugs
  while (toPayAndPaidArray.length > 1) {
    //max Debtor and maxLender could be the same person when Shane (as a lender) does not get 100 returned, 99.99
    const maxDebtor = toPayAndPaidArray.reduce((prev, current) => {
      if (prev.debt > 0) {
        return prev.debt - current.debt ? prev : current;
      }
      return prev.debt - current.debt ? current : prev;
    });

    const maxLender = toPayAndPaidArray.reduce((prev, current) => {
      if (prev.debt < 0) {
        return prev.debt - current.debt ? prev : current;
      }
      return prev.debt - current.debt ? current : prev;
    });

    const lenderIndex = toPayAndPaidArray.findIndex(
      (object) => object.memberIndex === maxLender.memberIndex
    );
    const debtorIndex = toPayAndPaidArray.findIndex(
      (object) => object.memberIndex === maxDebtor.memberIndex
    );

    const debtPlusLent = maxDebtor.debt + maxLender.debt;

    let summaryItem: Summary = {
      payerIndex: maxDebtor.memberIndex,
      receiverIndex: maxLender.memberIndex,
      amount: 0,
    };

    //Lent a lot
    if (debtPlusLent < 0) {
      console.log("lent alot");
      //remove borrower

      const prevDebt = toPayAndPaidArray[lenderIndex].debt; //- 385
      const returnAmount = maxDebtor.debt; //215
      toPayAndPaidArray[lenderIndex].debt = prevDebt + returnAmount; // - 385 + 215
      summaryItem.amount = returnAmount;
      //add to result

      result.push(summaryItem);

      toPayAndPaidArray.splice(debtorIndex, 1);

      //borrowed alot
    } else if (debtPlusLent > 0) {
      //remove lender

      const prevDebt = toPayAndPaidArray[debtorIndex].debt; //120
      const returnAmount = maxLender.debt; // - 90
      toPayAndPaidArray[debtorIndex].debt = prevDebt + returnAmount; //30
      summaryItem.amount = -returnAmount;

      result.push(summaryItem);
      toPayAndPaidArray.splice(lenderIndex, 1);
      //same amount
    } else {
      const removeIndex = [lenderIndex, debtorIndex];
      //sort from large to small

      summaryItem.amount = maxDebtor.debt; //or maxDebtor, doesn't matter
      removeIndex.sort((a, b) => b - a);
      for (let i = removeIndex.length; i >= 0; i--) {
        toPayAndPaidArray.splice(removeIndex[i], 1);
      }
      result.push(summaryItem);
    }
  }

  return result;
};
