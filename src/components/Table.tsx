import AddCircleIcon from "@mui/icons-material/AddCircle";
import CameraIcon from "@mui/icons-material/Camera";
import DeleteIcon from "@mui/icons-material/Delete";
import PieChartIcon from "@mui/icons-material/PieChart";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import React, { useEffect, useState } from "react";
import { BodyRow } from "./atoms/BodyRow";
import { Button } from "./atoms/Button";
import { FooterRow } from "./atoms/FooterRow";
import { HeaderRow } from "./atoms/HeaderRow";
import { Expense, Summary } from "./interface";
import { Flex } from "./layouts/Flex";
import { SummarySection } from "./templates/SummarySection";
import { finalize, summarizeToBySpender } from "./utils";

interface TableProps {}

export const Table: React.FC<TableProps> = ({}) => {
  const [memberArray, setMemberArray] = useState<string[]>([""]);

  const [inputArray, setInputArray] = useState<Expense[]>([
    {
      item: "",
      amount: 0,
      paidByIndex: -1,
      isEquallySplit: false,
      isInvalid: false,
      detail: [0],
    },
  ]);

  const [bySpenders, setBySpenders] = useState<number[]>([0]);

  const [byMembers, setByMembers] = useState<number[]>([0]);
  const [summary, setSummary] = useState<Summary[]>([]);

  //handle field starts
  const handleChangeRowInput = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    detailIndex?: number
  ) => {
    const values: Expense[] = [...inputArray];
    //which index in the array values[0][name]
    if (!detailIndex) {
      if (
        values[index][event.target.name as "paidByIndex"] ===
        ("paidByIndex" as never)
      ) {
        values[index].paidByIndex = parseInt(event.target.value);
      } else {
        values[index][event.target.name as "item" | "amount"] = event.target
          .value as never;
      }
    } else {
      //name = amount or name
      //detail[0][amount]
      //noww name is detail[0]['shane']
      //index indicates Shane, or Ant

      values[index].detail[detailIndex as number] = parseInt(
        event.target.value
      );
      // values[index].detail[detailIndex as number].name = memberArray[index];
    }

    const inputSum = values[index].detail.reduce((a, b) => a + b);
    const amount = parseInt(values[index].amount as any); //amount is string
    if (inputSum !== amount) {
      values[index].isInvalid = true;
    } else {
      values[index].isInvalid = false;
    }

    setInputArray(values);
  };

  const handleChangeMemberArray = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const memArr: string[] = [...memberArray];
    const inputs = [...inputArray];
    memArr[index] = event.target.value;

    inputs.forEach((input) => (input.detail[index] = 0));

    setMemberArray(memArr);
  };

  const handleAddRow = (index: any) => {
    const values = [...inputArray];

    values.splice(index + 1, 0, {
      item: "",
      amount: 0,
      paidByIndex: -1,
      isEquallySplit: false,
      isInvalid: false,
      // detail: memberArray.map((member) => {
      //   return { name: member, amount: Math.round(0) };
      // }),
      detail: memberArray.map((member) => 0),
    });

    setInputArray(values);
  };

  const handleAddCol = () => {
    const expenseArray = [...inputArray];
    const memberNames = [...memberArray];

    //add a new amount to detail array
    expenseArray.forEach((expense) => {
      expense.detail.splice(expense.detail.length, 0, 0);
    });

    memberNames.push("");

    setInputArray(expenseArray);
    setMemberArray(memberNames);
  };

  const handleRemoveCol = (index: number) => {
    const expenseArray = [...inputArray];
    const memberNames = [...memberArray];
    const byMemberArray = [...byMembers];

    expenseArray.forEach((expense) => {
      expense.detail.splice(index, 1);
    });
    byMemberArray.splice(index, 1);

    memberNames.splice(index, 1); //remove

    setInputArray(expenseArray);
    setMemberArray(memberNames);
    setByMembers(byMemberArray);
  };

  const handleSplitEqually = (
    index: number,
    event: React.MouseEvent<HTMLElement>
  ) => {
    const values = [...inputArray];
    const { isEquallySplit, isInvalid } = values[index];

    if (isEquallySplit) {
      //if isEqual => make it inequal
      values[index].detail.forEach((detail, subIndex) => {
        values[index].detail[subIndex] = 0;
      });
      values[index].isInvalid = true;
    } else {
      const total = values[index].amount;
      //   const memLength = memberArray.length;
      const memLength = values[index].detail.length;
      values[index].detail.forEach((detail, subIndex) => {
        values[index].detail[subIndex] = total / memLength;
      });
      values[index].isInvalid = false;
    }

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
    const result = summarizeToBySpender(inputArray, memberArray);
    setBySpenders(result);
  }, [inputArray]);

  //handleFieldEnds
  //useEffect No.2
  //byMembers
  useEffect(() => {
    const inputs = [...inputArray];
    const byMemberArray: number[] = memberArray.map((member) => 0);
    //map through Shane

    inputs.forEach((input, index) => {
      input.detail.forEach((amount, subIndex) => {
        byMemberArray[subIndex] += amount;
      });
    });
    setByMembers(byMemberArray);
  }, [inputArray]);

  //useEffect No.3
  useEffect(() => {
    if (bySpenders !== null && byMembers !== null) {
      setSummary(finalize(bySpenders, byMembers));
    }
  }, [bySpenders, byMembers]);
  return (
    <div style={{ width: "100%" }}>
      <h2 className="text-black text-3xl my-4">Expenses </h2>

      <table className="table my-4">
        <HeaderRow>
          <th>Item</th>
          <th>Amount</th>
          <th>Paid By</th>

          {memberArray.map((name, index) => (
            <th key={index}>
              <Flex>
                <input
                  type="text"
                  value={name}
                  placeholder="Add Name"
                  name="memberName"
                  onChange={(event) => handleChangeMemberArray(index, event)}
                />

                <button
                  onClick={() => handleRemoveCol(index)}
                  aria-label="Remove item"
                >
                  <RemoveCircleIcon style={{ fill: "white" }} />
                </button>
              </Flex>
            </th>
          ))}
          <th style={{ borderRight: "none" }}>
            {/* Control */}
            <Button
              variant="solid"
              onClick={() => handleAddCol()}
              aria-label="Add item"
            >
              <AddCircleIcon style={{ fill: "white" }} /> member
            </Button>
          </th>
        </HeaderRow>

        {/* table body */}
        <tbody>
          {inputArray.map((input, index, array) => (
            <BodyRow key={index} myKey={index} rowLength={array.length}>
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

                {input.isInvalid ? (
                  <div className="text-red-500 border-2 rounded m-1 border-red-500 text-center absolute">
                    Invalid sum
                  </div>
                ) : null}
              </td>

              <td>
                <select
                  name="paidByIndex"
                  className="w-11/12 bg-transparent text-right"
                  value={input.paidByIndex}
                  onChange={(event) => handleChangeRowInput(index, event)}
                >
                  <option value={-1} selected>
                    Select
                  </option>
                  {memberArray.map((name, index) => (
                    <option value={index}>{name}</option>
                  ))}
                </select>
              </td>

              {input.detail.map((detail, detailIndex) => (
                <td key={detailIndex}>
                  <input
                    type="number"
                    value={detail}
                    // name={detail}
                    className={input.isInvalid ? "text-red-600" : ""}
                    //Shane, Joe,  Ant's Amount
                    onChange={(event) =>
                      handleChangeRowInput(index, event, detailIndex)
                    }
                  />
                </td>
              ))}

              <td style={{ borderRight: "none" }}>
                <button onClick={(e) => handleSplitEqually(index, e)}>
                  {input.isEquallySplit ? (
                    <Button variant="outlined">
                      <PieChartIcon style={{ fill: "rgb(96 165 250)" }} />{" "}
                      customize
                    </Button>
                  ) : (
                    <Button variant="outlined">
                      <CameraIcon style={{ fill: "rgb(96 165 250)" }} /> divide
                    </Button>
                  )}
                </button>
                {index !== 0 ? (
                  <button
                    onClick={() => handleRemoveRow(index)}
                    aria-label="Remove item"
                    className="ml-4"
                  >
                    <DeleteIcon />
                  </button>
                ) : null}
              </td>
            </BodyRow>
          ))}
        </tbody>

        <tr>
          <td colSpan={4 + memberArray.length} style={{ borderRight: "none" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="bottom-line"
                onClick={() => handleAddRow(inputArray.length)}
                aria-label="Add item"
              >
                + Add item
              </Button>
            </div>
          </td>
        </tr>

        <FooterRow
          inputArray={inputArray}
          byMembers={byMembers}
          memberArray={memberArray}
          recalculate={() => setInputArray(inputArray)}
          clearTable={() => {
            setMemberArray([""]);
            setByMembers([0]);
            setInputArray([
              {
                item: "",
                amount: 0,
                paidByIndex: -1,
                isEquallySplit: false,
                isInvalid: false,
                detail: [0],
              },
            ]);
          }}
        />
      </table>
      <div>{/* Last row to summarizeToBySpender */}</div>

      <SummarySection
        bySpenders={bySpenders}
        summary={summary}
        memberArray={memberArray}
      />
    </div>
  );
};
