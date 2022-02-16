import React from "react";
import { Summary } from "../interface";
import { Card } from "../molecules/Card";

interface SummaryProps {
  bySpenders: number[];
  summary: Summary[] | null;
  memberArray: string[];
}

export const SummarySection: React.FC<SummaryProps> = ({
  bySpenders,
  summary,
  memberArray,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 my-10 mx-2">
      <Card title="Total by spenders">
        {bySpenders.map((amount, index) => {
          return (
            <div key={index}>
              {memberArray[index]} has spent {bySpenders[index]}
            </div>
          );
        })}
      </Card>

      <Card title="Summary">
        {summary?.map((item, index) => (
          <div key={index}>
            <p>
              <span style={{ fontWeight: "bold" }}>
                {memberArray[item.payerIndex]}
              </span>{" "}
              pays{" "}
              <span style={{ fontWeight: "bold" }}>
                {memberArray[item.receiverIndex]}
              </span>{" "}
              :{" "}
              <span style={{ fontWeight: "bold" }}>
                {/* {item.amount.toFixed(2)} */}
                {item.amount.toFixed(2)}
              </span>
            </p>
          </div>
        ))}
      </Card>
    </div>
  );
};
