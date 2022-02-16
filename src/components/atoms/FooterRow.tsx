import React from "react";
import { Expense } from "../interface";
import { Flex } from "../layouts/Flex";
import { Button } from "./Button";

interface FooterRowProps {
  inputArray: Expense[];
  byMembers: number[];
  memberArray: string[];
  clearTable: () => void;
  recalculate: () => void;
}

export const FooterRow: React.FC<FooterRowProps> = ({
  inputArray,
  byMembers,
  memberArray,
  recalculate,
  clearTable,
}) => {
  return (
    <tfoot className="bg-blue-500 border-r-0 text-right">
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
      {byMembers.map((amount, index) => (
        // <td key={index}>{amount.toFixed(2)} </td>
        <td key={index}>{amount} </td>
      ))}
      {/* below code is for fix bugs  */}
      <td style={{ backgroundColor: "white" }}>
        <Flex>
          <Button
            variant="outlined"
            onClick={() => {
              clearTable();
            }}
          >
            Clear
          </Button>

          <Button variant="outlined" onClick={() => recalculate()}>
            Calculate
          </Button>
        </Flex>
      </td>
    </tfoot>
  );
};
