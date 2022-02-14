import React from "react";

interface FlexProps {
  justifyContent?: "string";
  alignItems?: "string";
  variant?: "between" | "end" | "start";
}

export const Flex: React.FC<FlexProps> = ({ children, ...props }) => {
  return (
    <div className="flex justify-between items-center" {...props}>
      {children}
    </div>
  );
};
