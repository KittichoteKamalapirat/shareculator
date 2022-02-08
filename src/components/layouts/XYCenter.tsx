import React from "react";

interface XYCenterProps {}

export const XYCenter: React.FC<XYCenterProps> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      {children}
    </div>
  );
};
