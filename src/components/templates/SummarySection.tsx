import React from "react";
import { Summary } from "../interface";
import { Card } from "../molecules/Card";

interface SummaryProps {
  bySpenders: number[];
  summary: Summary[] | null;
  memberArray: string[];
  missingPaidBy: boolean;
}

export const SummarySection: React.FC<SummaryProps> = ({
  bySpenders,
  summary,
  memberArray,
  missingPaidBy,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 my-10 mx-2 ">
      <Card title="Total by spenders">
        {bySpenders.map((amount, index) => {
          return (
            <div key={index}>
              <span style={{ fontWeight: "bold" }}>{memberArray[index]} </span>
              has spent {bySpenders[index]}
            </div>
          );
        })}
      </Card>

      <Card title="Summary">
        {missingPaidBy ? (
          <div>Please indicate who paid for all the items</div>
        ) : (
          summary?.map((item, index) => (
            <div key={index} className="text-2xl">
              <p>
                <span style={{ fontWeight: "bold" }}>
                  {memberArray[item.payerIndex]}
                </span>{" "}
                returns{" "}
                <span style={{ fontWeight: "bold" }}>
                  {memberArray[item.receiverIndex]}
                </span>
                :{" "}
                <span style={{ fontWeight: "bold" }}>
                  {/* {item.amount.toFixed(2)} */}
                  {item.amount.toFixed(2)}
                </span>
              </p>
            </div>
          ))
        )}
      </Card>
    </div>
  );
};
