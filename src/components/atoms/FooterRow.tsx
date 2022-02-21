import React from "react";
import { Expense } from "../interface";
import { Flex } from "../layouts/Flex";
import { Button } from "./Button";

interface FooterRowProps {
  inputArray: Expense[];
  byMembers: number[];
  memberArray: string[];

  recalculate: () => void;
}

export const FooterRow: React.FC<FooterRowProps> = ({
  inputArray,
  byMembers,
  memberArray,
  recalculate,
}) => {
  return (
    <tfoot className="bg-blue-500 border-r-0 text-right">
      <tr>
        <td>
          {/* <Flex> */}
          <div style={{ display: "flex" }}>none</div>
          {/* </Flex> */}
        </td>
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
        <td> With </td>

        {byMembers.map((amount, index) => (
          // <td key={index}>{amount.toFixed(2)} </td>
          <td key={index}>{amount.toFixed(2)} </td>
        ))}
        {/* below code is for fix bugs  */}
      </tr>
    </tfoot>
  );
};
