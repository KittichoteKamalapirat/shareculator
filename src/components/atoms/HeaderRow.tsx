import React from "react";

interface HeaderRowProps {}

export const HeaderRow: React.FC<HeaderRowProps> = ({ children }) => {
  return <tr className="bg-blue-300 text-white">{children}</tr>;
};
