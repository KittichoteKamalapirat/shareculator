import React from "react";

interface XCenterProps {}

export const XCenter: React.FC<XCenterProps> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      style={{ display: "flex", justifyContent: "center", width: "100%" }}
    >
      {children}
    </div>
  );
};
