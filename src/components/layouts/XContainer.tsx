import React from "react";

interface XContainerProps {}

export const XContainer: React.FC<XContainerProps> = ({
  children,
  ...props
}) => {
  return (
    <div style={{ maxWidth: "800px" }}>
      <div {...props}>{children}</div>
    </div>
  );
};
