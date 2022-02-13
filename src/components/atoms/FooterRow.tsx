import React from "react";
import { Expense } from "../interface";

interface FooterRowProps {
  inputArray: Expense[];
  byMembers: Map<string, number> | null;
}

export const FooterRow: React.FC<FooterRowProps> = ({
  inputArray,
  byMembers,
}) => {
  console.log({ inputArray });
  return (
    <tfoot className="bg-blue-700 border-r-0">
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
    </tfoot>
  );
};
