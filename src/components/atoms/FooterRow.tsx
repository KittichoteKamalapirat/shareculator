import { traceDeprecation } from "process";
import React from "react";
import { Expense } from "../interface";
import { Button } from "./Button";

interface FooterRowProps {
  inputArray: Expense[];
  byMembers: Map<string, number> | null;
  memberArray: string[];
  clearTable: () => void;
}

export const FooterRow: React.FC<FooterRowProps> = ({
  inputArray,
  byMembers,
  memberArray,
  clearTable,
}) => {
  console.log({ inputArray });
  if (byMembers) {
    console.log("member array length");
    console.log([...byMembers.keys()].length);
  }

  return (
    <tfoot className="bg-blue-500 border-r-0">
      {" "}
      <td>Total to pay</td>
      {/* combine all */}
      <td>
        {inputArray.length > 1 ? (
          inputArray
            .map((expense) => expense.amount)
            .reduce((a, b) => {
              return parseInt(a as any) + parseInt(b as any); // can't set to string and number
            })
            .toFixed(2)
        ) : (
          <div className="text-white">{inputArray[0].amount}</div>
        )}
      </td>
      <td> All </td>
      {byMembers &&
        [...byMembers.keys()].map((key, index) => (
          <td key={index}>{byMembers.get(key)?.toFixed(2)} </td>
        ))}
      {/* below code is for fix bugs  */}
      {byMembers
        ? [...Array(memberArray.length - [...byMembers.keys()].length)].map(
            (i) => <td>0.00</td>
          )
        : null}
      <td style={{ backgroundColor: "white" }}>
        <Button
          variant="outlined"
          onClick={() => {
            clearTable();
          }}
        >
          Clear table
        </Button>
      </td>
    </tfoot>
  );
};
