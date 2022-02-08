import exp from "constants";
import React, { useEffect, useState } from "react";

interface TableProps {}

interface MemberExpense {
  name: string;
  // item: string;
  amount: number;
}

interface Expense {
  name: string;
  amount: number;
  paidBy: string;
  detail: MemberExpense[];
}

const memberArray = ["Shane", "Joe", "Ant"];
const expenseArray: Expense[] = [
  {
    name: "Saney",
    amount: 500,
    paidBy: "Shane",
    detail: [
      { name: "Shane", amount: 500 / 3 },
      { name: "Joe", amount: 500 / 3 },
      { name: "ant", amount: 500 / 3 },
    ],
  },
  {
    name: "Roti",
    amount: 100,
    paidBy: "Shane",
    detail: [
      { name: "Shane", amount: 100 / 3 },
      { name: "Joe", amount: 100 / 3 },
      { name: "ant", amount: 100 / 3 },
    ],
  },
  {
    name: "taxi",
    amount: 45,
    paidBy: "Ant",
    detail: [
      { name: "Shane", amount: 45 / 3 },
      { name: "Joe", amount: 45 / 3 },
      { name: "ant", amount: 45 / 3 },
    ],
  },
];

const summarize = (expenseArray: Expense[]) => {
  const map = new Map<string, number>();
  for (const expense of expenseArray) {
    const spender = expense.paidBy;
    if (map.has(spender)) {
      map.set(spender, (map.get(spender) as number) + expense.amount);
      continue;
    }
    map.set(spender, expense.amount);
  }
  return map;
};

export const Table: React.FC<TableProps> = ({}) => {
  const [bySpenders, setBySpenders] = useState<Map<string, number> | null>(
    null
  );

  const [byMembers, setByMembers] = useState<Map<string, number> | null>(null);

  //{Shane: 599, Joe, 499}
  const [totalByMembers, setTotalByMembers] = useState();

  useEffect(() => {
    const result = summarize(expenseArray);
    setBySpenders(result);
  }, []);

  useEffect(() => {
    const totalByMemberMap = new Map();
    //map through Shane

    expenseArray.map((expense) => {
      for (const detail of expense.detail) {
        const name = detail.name;
        if (totalByMemberMap.has(name)) {
          totalByMemberMap.set(
            name,
            totalByMemberMap.get(name) + detail.amount
          );
          continue;
        }

        totalByMemberMap.set(name, detail.amount);
      }
      console.log({ totalByMemberMap });
      setByMembers(totalByMemberMap);
    });
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <div>Table</div>
      {/* Table Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          textAlign: "right",
        }}
      >
        <div>Item</div>
        <div>Total</div>
        <div>Paid By</div>

        {memberArray.map((name, index) => (
          <div key={index}>{name}</div>
        ))}
      </div>
      <div>
        {expenseArray.map((expense, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-around",
              border: "1px solid black",
              textAlign: "right",
              gap: "1px",
            }}
          >
            <div>{expense.name}</div>
            <div>{expense.amount}</div>
            <div>{expense.paidBy}</div>
            {expense.detail.map((detail, index) => (
              <div key={index}>{Math.round(detail.amount)}</div>
            ))}
          </div>
        ))}

        {/* Last row to summarize */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            textAlign: "right",
          }}
        >
          <div>Total to pay</div>
          <div>
            {expenseArray
              .map((expense) => expense.amount)
              .reduce((a, b) => a + b)}
          </div>
          <div> </div>

          {byMembers &&
            [...byMembers.keys()].map((key, index) => (
              <div key={index}>{byMembers.get(key)}</div>
            ))}
        </div>
      </div>
      <div>
        Total spend
        {bySpenders &&
          [...bySpenders.keys()].map((key, index) => {
            return (
              <div key={index}>
                {key} has spent {bySpenders.get(key)}
              </div>
            );
          })}
      </div>
    </div>
  );
};
