import { parse } from "path/posix";
import { stringify } from "querystring";
import React, { useEffect, useState } from "react";
import {
  Debt,
  Expense,
  MemberExpense,
  Summary,
  ToPayAndPaid,
} from "./interface";

import { finalize, summarizeToBySpender } from "./utils";

interface TableProps {}

export const Table: React.FC<TableProps> = ({}) => {
  const [bySpenders, setBySpenders] = useState<Map<string, number> | null>(
    null
  );

  const [inputArray, setInputArray] = useState<Expense[]>([
    {
      item: "",
      amount: 0,
      paidBy: "",
      isEquallySplit: false,
      isInvalid: false,
      detail: [{ name: "", amount: Math.round(0) }],
    },
  ]);

  const [memberArray, setMemberArray] = useState<string[]>([""]);

  const [byMembers, setByMembers] = useState<Map<string, number> | null>(null);
  const [summary, setSummary] = useState<Summary[] | null>(null);

  console.log("inputArray");
  console.log(inputArray);
  console.log("summary");
  console.log(summary);

  console.log("bySpenders");
  console.log(bySpenders);

  console.log("byMembers");
  console.log(byMembers);

  //handle field starts
  const handleChangeRowInput = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    subIndex?: number
  ) => {
    const values: Expense[] = [...inputArray];
    //which index in the array values[0][name]
    console.log("index", index);
    console.log("subIndex", subIndex);
    if (
      !subIndex &&
      (event.target.name === "item" ||
        event.target.name === "paidBy" ||
        event.target.name === "amount")
    ) {
      // if (event.target.name === ("item" || "total" || "paidBy")) {\
      values[index][event.target.name] = event.target.value as never;
    } else {
      //name = amount or name
      //detail[0][amount]
      //noww name is detail[0]['shane']
      //index indicates Shane, or Ant

      values[index].detail[subIndex as number].amount = parseInt(
        event.target.value
      );
      values[index].detail[subIndex as number].name = memberArray[index];

      const inputSum = values[index].detail
        .map((detail) => detail.amount)
        .reduce((a, b) => a + b);
      const total = parseInt(values[index].amount as any); //amount is string
      if (inputSum !== total) {
        values[index].isInvalid = true;
      } else {
        values[index].isInvalid = false;
      }
    }

    setInputArray(values);
  };

  const handleChangeMemberArray = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values: string[] = [...memberArray];
    const inputs = [...inputArray];
    values[index] = event.target.value;

    inputs.forEach((input) => (input.detail[index].name = event.target.value));
    setMemberArray(values);
  };

  const handleAddRow = (index: any) => {
    const values = [...inputArray];

    values.splice(index + 1, 0, {
      item: "",
      amount: 0,
      paidBy: "",
      isEquallySplit: false,
      isInvalid: false,
      detail: memberArray.map((member) => {
        return { name: member, amount: Math.round(0) };
      }),
    });

    setInputArray(values);
  };

  const handleAddCol = () => {
    const expenseArray = [...inputArray];
    const memberNames = [...memberArray];

    const newCol: MemberExpense = { name: "", amount: 0 };
    expenseArray.forEach((expense) => {
      expense.detail.splice(expense.detail.length, 0, newCol);
    });

    memberNames.push("");

    setInputArray(expenseArray);
    setMemberArray(memberNames);
  };

  const handleRemoveCol = (index: number) => {
    const expenseArray = [...inputArray];
    const memberNames = [...memberArray];

    expenseArray.forEach((expense) => {
      expense.detail.splice(index, 1);
    });

    memberNames.splice(index, 1);

    setInputArray(expenseArray);
    setMemberArray(memberNames);
  };

  const handleSplitEqually = (
    index: number,
    event: React.MouseEvent<HTMLElement>
  ) => {
    console.log({ index });
    const values = [...inputArray];
    const { isEquallySplit } = values[index];

    if (isEquallySplit) {
      //if isEqual => make it inequal
      values[index].detail.forEach((detail, subIndex) => {
        values[index].detail[subIndex].amount = 0;
      });
    } else {
      const total = values[index].amount;
      //   const memLength = memberArray.length;
      const memLength = values[index].detail.length;
      values[index].detail.forEach((detail, subIndex) => {
        values[index].detail[subIndex].amount = total / memLength;
      });
    }

    console.log({ values });

    values[index].isEquallySplit = !isEquallySplit;
    setInputArray(values);
  };

  const handleRemoveRow = (index: any) => {
    const values = [...inputArray];
    if (values.length === 1) {
      return;
    }

    values.splice(index, 1);
    setInputArray(values);
  };

  //useEffect No.1

  useEffect(() => {
    const result = summarizeToBySpender(inputArray);
    setBySpenders(result);
  }, [inputArray]);

  //handleFieldEnds

  //useEffect No.2
  //byMembers
  useEffect(() => {
    const totalByMemberMap = new Map();
    //map through Shane

    inputArray.map((expense) => {
      for (const detail of expense.detail) {
        const name = detail.name;
        if (totalByMemberMap.has(name)) {
          const prevAmount = totalByMemberMap.get(name);
          const additional = detail.amount;
          const sum = prevAmount + additional;
          console.log("prevAmount", prevAmount);
          console.log("additional", additional);
          console.log("sum", sum);
          totalByMemberMap.set(name, sum);
          continue;
        }

        totalByMemberMap.set(name, detail.amount);
      }
      console.log({ totalByMemberMap });
      setByMembers(totalByMemberMap);
    });
  }, [inputArray]);

  //useEffect No.3
  useEffect(() => {
    if (bySpenders !== null && byMembers !== null) {
      setSummary(finalize(bySpenders, byMembers));
    }
  }, [bySpenders, byMembers]);
  return (
    <div style={{ width: "100%" }}>
      <h2>Detailed Table</h2>

      <table className="table">
        <tr>
          <th>Item</th>
          <th>Total</th>
          <th>Paid By</th>

          {memberArray.map((name, index) => (
            <th key={index}>
              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  value={name}
                  placeholder="Add Name"
                  name="memberName"
                  onChange={(event) => handleChangeMemberArray(index, event)}
                />

                <button
                  onClick={() => handleRemoveCol(index)}
                  aria-label="Add item"
                >
                  -
                </button>
              </div>
            </th>
          ))}
          <th>
            {/* Control */}
            <button onClick={() => handleAddCol()} aria-label="Add item">
              ➕ Add member
            </button>
          </th>
        </tr>

        {/* bodu */}
        <tbody>
          {inputArray.map((input, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  placeholder="What you spent for"
                  value={input.item}
                  name="item"
                  onChange={(event) => handleChangeRowInput(index, event)}
                />
              </td>

              <td>
                <input
                  type="number"
                  placeholder="Total amount"
                  value={parseInt(input.amount as any)}
                  name="amount"
                  onChange={(event) => handleChangeRowInput(index, event)}
                />
              </td>

              <td>
                {/* <input
                type="text"
                value={input.paidBy}
                placeholder="Enter name"
                name="paidBy"
                onChange={(event) => handleChangeRowInput(index, event)}
              /> */}

                <select
                  name="paidBy"
                  value={input.paidBy}
                  onChange={(event) => handleChangeRowInput(index, event)}
                >
                  <option selected>Select</option>
                  {memberArray.map((name) => (
                    <option value={name}>{name}</option>
                  ))}
                </select>
              </td>

              {input.detail.map((detail, subIndex) => (
                <td key={subIndex}>
                  <input
                    type="number"
                    value={detail.amount.toFixed(2)}
                    name={detail.name}
                    //Shane, Joe,  Ant's Amount
                    onChange={(event) =>
                      handleChangeRowInput(index, event, subIndex)
                    }
                  />
                </td>
              ))}

              <td>
                <button
                  onClick={() => handleRemoveRow(index)}
                  aria-label="Remove item"
                >
                  -
                </button>

                <button onClick={(e) => handleSplitEqually(index, e)}>
                  {input.isEquallySplit ? "customize" : "split equally"}
                </button>

                {input.isInvalid ? "invalid sum" : null}
              </td>
            </tr>
          ))}
        </tbody>

        <tr>
          <td colSpan={4 + memberArray.length}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => handleAddRow(inputArray.length)}
                aria-label="Add item"
                style={{ border: "none", backgroundColor: "transparent" }}
              >
                + Add item
              </button>
            </div>
          </td>
        </tr>
        <tfoot>
          <td>Total to pay</td>
          {/* combine all */}
          <td>
            {inputArray
              .map((expense) => expense.amount)
              .reduce((a, b) => {
                return parseInt(a as any) + parseInt(b as any); // can't set to string and number
              })
              .toFixed(2)}
          </td>
          <td> All </td>

          {byMembers &&
            [...byMembers.keys()].map((key, index) => (
              <td key={index}>{byMembers.get(key)?.toFixed(2)} </td>
            ))}
        </tfoot>
      </table>
      {/* Table Header */}

      {/* Table Body */}

      <div>{/* Last row to summarizeToBySpender */}</div>
      <div>
        <h2>Total by spenders</h2>
        {bySpenders &&
          [...bySpenders.keys()].map((key, index) => {
            return (
              <div key={index}>
                {key} has spent {bySpenders.get(key)}
              </div>
            );
          })}
      </div>

      <div>
        <h2>Summary</h2>
        <div>
          {summary?.map((item, index) => (
            <div key={index}>
              <p>
                <span style={{ fontWeight: "bold" }}>{item.payer}</span> pays{" "}
                <span style={{ fontWeight: "bold" }}>{item.receiver}</span> :{" "}
                <span style={{ fontWeight: "bold" }}>
                  {item.amount.toFixed(2)}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
