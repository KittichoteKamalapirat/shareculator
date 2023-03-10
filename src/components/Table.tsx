import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { BodyRow } from "./atoms/BodyRow";
import { Button } from "./atoms/Button";
import { FooterRow } from "./atoms/FooterRow";
import { HeaderRow } from "./atoms/HeaderRow";
import { Expense, Summary } from "./interface";
import { Card } from "./molecules/Card";
import { SummarySection } from "./templates/SummarySection";
import { finalize, summarizeToBySpender } from "./utils";
import { calcSplitAmong } from "./utils/calcSplitAmong";
import { toggleSplitAmong } from "./utils/toggleSplitAmong";

const MEMBERS_KEY = "members";
const EXPENSES_KEY = "expenses";

const initialInput = [...Array(5)].map((num) => {
  return {
    item: "",
    amount: 0,
    paidByIndex: -1,
    splitAmong: [true, true, true],
    isEquallySplit: false,
    isInvalid: false,
    detail: [0, 0, 0],
  };
});

export const Table = () => {
  const [memberArray, setMemberArray] = useState<string[]>(["", "", ""]);

  const [inputArray, setInputArray] = useState<Expense[]>(initialInput);

  const [bySpenders, setBySpenders] = useState<number[]>([0]);

  const [byMembers, setByMembers] = useState<number[]>([0]);
  const [summary, setSummary] = useState<Summary[]>([]);
  const [missingPaidBy, setMissingPaidBy] = useState<boolean>(false);

  //handle field starts
  const handleChangeRowInput = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    detailIndex?: number
  ) => {
    let values: Expense[] = [...inputArray];
    //which index in the array values[0][name]
    if (typeof detailIndex === "undefined") {
      //index 0 -> false, but other numbers are  true
      if (
        values[index][event.target.name as "paidByIndex"] ===
        ("paidByIndex" as never)
      ) {
        values[index].paidByIndex = parseInt(event.target.value);
      } else {
        values[index][event.target.name as "item" | "amount"] = event.target
          .value as never;
      }
      values = calcSplitAmong(values, index);
    } else {
      values[index].detail[detailIndex as number] = parseInt(
        event.target.value
      );
    }

    const inputSum = values[index].detail.reduce((a, b) => a + b);
    const amount = parseInt(values[index].amount as any); //amount is string
    if (inputSum !== amount) {
      values[index].isInvalid = true;
    } else {
      values[index].isInvalid = false;
    }

    setInputArray(values);
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(values));
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

    localStorage.setItem(MEMBERS_KEY, JSON.stringify(memArr));
  };

  const handleAddRow = (index: any) => {
    const values = [...inputArray];

    values.splice(index + 1, 0, {
      item: "",
      amount: 0,
      paidByIndex: -1,
      isEquallySplit: false,
      splitAmong: memberArray.map((member) => true),
      isInvalid: false,
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
      expense.splitAmong.splice(expense.detail.length, 0, true);
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
      expense.splitAmong.splice(index, 1);
    });
    byMemberArray.splice(index, 1);

    memberNames.splice(index, 1); //remove

    setInputArray(expenseArray);
    setMemberArray(memberNames);
    setByMembers(byMemberArray);
  };

  useEffect(() => {
    const expensesStr = localStorage.getItem(EXPENSES_KEY);
    const expensesJson = expensesStr && (JSON.parse(expensesStr) as Expense[]);
    if (expensesJson) setInputArray(expensesJson);

    const membersStr = localStorage.getItem(MEMBERS_KEY);
    const membersJson = membersStr && (JSON.parse(membersStr) as string[]);
    if (membersJson) setMemberArray(membersJson);
  }, []);

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
    } else {
      const total = values[index].amount;
      const memLength = values[index].detail.length;
      values[index].detail.forEach((detail, subIndex) => {
        values[index].detail[subIndex] = total / memLength;
      });
    }

    const inputSum = values[index].detail.reduce((a, b) => a + b);
    const amount = parseInt(values[index].amount as any); //amount is string
    if (inputSum !== amount) {
      values[index].isInvalid = true;
    } else {
      values[index].isInvalid = false;
    }

    values[index].isEquallySplit = !isEquallySplit;
    setInputArray(values);
  };

  //handle checkbox
  const handleClickSplitAmong = (index: number, subIndex: number) => {
    let inputs = [...inputArray];
    inputs = toggleSplitAmong(inputs, index, subIndex);
    inputs = calcSplitAmong(inputs, index);

    setInputArray(inputs);
  };

  const handleRemoveRow = (index: any) => {
    const values = [...inputArray];
    if (values.length === 1) {
      return;
    }

    values.splice(index, 1);
    setInputArray(values);
  };

  const handleClearTable = () => {
    setMemberArray([...Array(memberArray.length)].map((num) => ""));
    setByMembers([...Array(memberArray.length)].map((num) => 0));
    setInputArray(
      [...Array(5)].map((num) => {
        return {
          item: "",
          amount: 0,
          paidByIndex: -1,
          splitAmong: memberArray.map((name) => true),
          isEquallySplit: false,
          isInvalid: false,
          detail: memberArray.map((name) => 0),
        };
      })
    );

    localStorage.clear();
  };
  //handle validation, select field
  useEffect(() => {
    const inputs = [...inputArray];
    // missingPaidBy

    inputs.forEach((input, index) => {
      if (input.amount > 0 && input.paidByIndex < 0) {
        setMissingPaidBy(true);
        return;
      }
      setMissingPaidBy(false);
    });
  });

  // handle split among

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
    <div className="w-full ">
      <div className="mx-1 ">
        <h2 className="font-bold text-xl mb-2">
          {/* <h2 className="text-black text-3xl my-4 mx-2"> */}
          Who were there at the party?
        </h2>
        <Card title="">
          {memberArray.map((name, index) => (
            <div key={index}>
              <input
                type="text"
                value={name}
                placeholder="Add Name"
                name="memberName"
                onChange={(event) => handleChangeMemberArray(index, event)}
                className=" w-40 py-1 px-0  my-2 focus:border-primary focus:outline-none focus:ring-0 "
              />
              <Button
                variant="naked"
                onClick={() => handleRemoveCol(index)}
                aria-label="Remove item"
              >
                <DeleteIcon style={{ fill: "red" }} />
              </Button>
            </div>
          ))}

          <Button
            variant="solid"
            onClick={() => handleAddCol()}
            aria-label="Add item"
            className="my-2"
          >
            <AddCircleIcon style={{ fill: "white" }} /> member
          </Button>
        </Card>
      </div>

      <div className="mx-1 mt-12">
        <h2 className="font-bold text-xl mb-2">Expenses details</h2>
      </div>

      {/* <h2 className="text-black text-3xl my-4 mx-2">Expenses </h2> */}
      <div className="overflow-x-auto">
        <table className=" md:table-fixed  my-4 mx-2 w-full min-w-max md:min-w-fit ">
          <HeaderRow>
            <th className="w-10 ">#</th>
            <th>Item</th>
            <th>Amount</th>
            <th>Paid By</th>
            <th>With</th>

            {memberArray.map((name, index) => (
              <th key={index}>
                <div className="flex flex-col md:flex-row">
                  <input
                    type="text"
                    value={name}
                    placeholder="Add Name"
                    name="memberName"
                    onChange={(event) => handleChangeMemberArray(index, event)}
                  />

                  <Button
                    variant="naked"
                    onClick={() => handleRemoveCol(index)}
                    aria-label="Remove item"
                  >
                    <DeleteIcon style={{ fill: "white" }} />
                  </Button>
                </div>
              </th>
            ))}
          </HeaderRow>

          {/* table body */}
          <tbody>
            {inputArray.map((input, index, array) => (
              <BodyRow key={index} myKey={index} rowLength={array.length}>
                <td>
                  {/* </button> */}

                  <Button
                    variant="naked"
                    onClick={() => handleRemoveRow(index)}
                    aria-label="Remove item"
                    padding={0}
                  >
                    <DeleteIcon style={{ fill: "gray" }} />
                  </Button>
                </td>

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
                    placeholder="0"
                    value={
                      parseInt(input.amount as any) === 0
                        ? ""
                        : parseInt(input.amount as any)
                    }
                    name="amount"
                    onChange={(event) => handleChangeRowInput(index, event)}
                  />

                  {input.isInvalid &&
                  input.detail.filter((subAmount) => subAmount === 0).length !==
                    input.detail.length ? (
                    <div className="text-red-500 border-2 rounded m-1 border-red-500 text-center ">
                      Invalid sum
                    </div>
                  ) : null}
                </td>

                <td>
                  <select
                    name="paidByIndex"
                    className={`w-11 /12 bg-transparent min-w-max ${
                      input.amount > 0 && input.paidByIndex < 0
                        ? "text-red-600"
                        : ""
                    }`}
                    // value={input.paidByIndex}
                    onChange={(event) => handleChangeRowInput(index, event)}
                    defaultValue={-1}
                  >
                    <option value={-1} disabled>
                      Select
                    </option>

                    {memberArray.map((name, index) => (
                      <option value={index} key={index}>
                        {name === "" ? "Name " + (index + 1) : name}{" "}
                      </option>
                    ))}
                  </select>
                </td>

                <td style={{ borderRight: "none" }}>
                  {/* <button onClick={(e) => handleSplitEqually(index, e)}> */}
                  {/*                   
                  {input.isEquallySplit ? (
                    <Button
                      variant="outlined"
                      onClick={(e) => handleSplitEqually(index, e)}
                    >
                      <PieChartIcon style={{ fill: "rgb(96 165 250)" }} />{" "}
                      customize
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={(e) => handleSplitEqually(index, e)}
                    >
                      <CameraIcon style={{ fill: "rgb(96 165 250)" }} /> divide
                    </Button>
                  )} */}

                  <div>
                    {memberArray.map((member, subIndex) => (
                      <div key={subIndex}>
                        <input
                          className="w-4"
                          id={member}
                          // defaultChecked
                          checked={input.splitAmong[subIndex]}
                          type="checkbox"
                          name={member}
                          onChange={() =>
                            handleClickSplitAmong(index, subIndex)
                          }
                        />
                        <label htmlFor={member}>
                          {member === "" ? (
                            <span className="text-gray-400">
                              {"Name " + (subIndex + 1)}
                            </span>
                          ) : (
                            member
                          )}{" "}
                        </label>
                      </div>
                    ))}
                  </div>
                </td>

                {input.detail.map((detail, detailIndex) => (
                  <td key={detailIndex}>
                    <input
                      type="number"
                      // name='detail'
                      // value={detail}
                      value={detail.toString().slice(0, 5)}
                      placeholder="0"
                      // name={detail}
                      className={input.isInvalid ? "text-red-600" : ""}
                      //Shane, Joe,  Ant's Amount
                      onChange={(event) =>
                        handleChangeRowInput(index, event, detailIndex)
                      }
                    />
                  </td>
                ))}
              </BodyRow>
            ))}
            <tr>
              <td
                colSpan={5 + memberArray.length}
                style={{ borderRight: "none" }}
              >
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
          </tbody>

          <FooterRow
            inputArray={inputArray}
            byMembers={byMembers}
            memberArray={memberArray}
            recalculate={() => setInputArray(inputArray)}
          />
        </table>
      </div>
      <div>{/* Last row to summarizeToBySpender */}</div>

      <h2 className="mx-1">
        <Button onClick={handleClearTable}>Clear table</Button>
      </h2>

      <SummarySection
        bySpenders={bySpenders}
        summary={summary}
        memberArray={memberArray}
        missingPaidBy={missingPaidBy}
      />
    </div>
  );
};
