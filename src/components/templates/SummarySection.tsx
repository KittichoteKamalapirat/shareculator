import React from "react";
import { Summary } from "../interface";
import { Flex } from "../layouts/Flex";
import { Card } from "../molecules/Card";

interface SummaryProps {
  bySpenders: Map<string, number> | null;
  summary: Summary[] | null;
}

export const SummarySection: React.FC<SummaryProps> = ({
  bySpenders,
  summary,
}) => {
  return (
    <Flex>
      <Card title="Total by spenders">
        {bySpenders &&
          [...bySpenders.keys()].map((key, index) => {
            return (
              <div key={index}>
                {key} has spent {bySpenders.get(key)}
              </div>
            );
          })}
      </Card>

      <Card title="Summary">
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
      </Card>
    </Flex>
  );
};
