import { Expense, Summary, ToPayAndPaid } from "./interface";

export const summarizeToBySpender = (expenseArray: Expense[]) => {
  const map = new Map<string, number>();
  for (const expense of expenseArray) {
    const spender = expense.paidBy;
    console.log("expense amount");
    console.log(expense.amount);
    if (map.has(spender)) {
      map.set(
        spender,
        parseInt(map.get(spender) as any) + parseInt(expense.amount as any)
      );
      continue;
    }
    map.set(spender, parseInt(expense.amount as any));
  }
  return map;
};

export const finalize = (
  bySpenders: Map<string, number>,
  byMembers: Map<string, number>
) => {
  const result: Summary[] = [];

  //reformat

  const toPayAndPaidArray: ToPayAndPaid[] = [...byMembers.keys()].map(
    (key, index) => {
      const memberName = key;
      const toPayAmount = byMembers.get(key)!;
      const paidAmount = bySpenders.get(memberName) || 0;
      const debt = toPayAmount - paidAmount;
      const toPayAndPaid: ToPayAndPaid = {
        name: memberName,
        toPay: toPayAmount,
        paid: paidAmount,
        debt,
      };
      return toPayAndPaid;
    }
  );

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
  console.log({ toPayAndPaidArray });

  //who pays who algorithm
  let i = 0;

  //> 0 -> give bugs
  while (toPayAndPaidArray.length > 1) {
    i++;

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
      (object) => object.name === maxLender.name
    );
    const debtorIndex = toPayAndPaidArray.findIndex(
      (object) => object.name === maxDebtor.name
    );

    const debtPlusLent = maxDebtor.debt + maxLender.debt;

    let summaryItem: Summary = {
      payer: maxDebtor.name,
      receiver: maxLender.name,
      amount: 0,
    };

    //Lent a lot
    if (debtPlusLent < 0) {
      console.log("<0");
      //remove borrower

      const prevDebt = toPayAndPaidArray[lenderIndex].debt; //- 385
      const returnAmount = maxDebtor.debt; //215
      toPayAndPaidArray[lenderIndex].debt = prevDebt + returnAmount; // - 385 + 215

      //add to result
      summaryItem.amount = returnAmount;
      console.log({ returnAmount });

      result.push(summaryItem);

      toPayAndPaidArray.splice(debtorIndex, 1);

      //borrowed alot
    } else if (debtPlusLent > 0) {
      console.log(">0");

      //remove lender

      const prevDebt = toPayAndPaidArray[debtorIndex].debt; //120
      const returnAmount = maxLender.debt; // - 90
      toPayAndPaidArray[debtorIndex].debt = prevDebt + returnAmount; //30
      summaryItem.amount = -returnAmount;
      console.log({ maxDebtor });
      console.log({ maxLender });
      console.log({ returnAmount });

      result.push(summaryItem);
      toPayAndPaidArray.splice(lenderIndex, 1);
      //same amount
    } else {
      console.log("=0");
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
