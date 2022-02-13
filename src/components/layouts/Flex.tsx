import React from "react";

interface FlexProps {
  justifyContent?: "string";
  alignItems?: "string";
}

export const Flex: React.FC<FlexProps> = ({ children, ...props }) => {
  return (
    <div className="flex" {...props}>
      {children}
    </div>
  );
};
