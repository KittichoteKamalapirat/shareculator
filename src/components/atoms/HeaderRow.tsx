import React from "react";

interface HeaderRowProps {}

export const HeaderRow: React.FC<HeaderRowProps> = ({ children }) => {
  return <tr className="bg-sky-700 text-white">{children}</tr>;
};
