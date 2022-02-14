import React from "react";

interface BodyRowProps {
  myKey: number;
  rowLength: number;
}

export const BodyRow: React.FC<BodyRowProps> = ({
  children,
  rowLength,
  myKey,
}) => {
  return <tr className={myKey % 2 !== 0 ? "bg-blue-50" : ""}>{children}</tr>;
};

// coud use rowLength - myKey
