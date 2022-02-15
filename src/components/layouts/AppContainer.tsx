import React from "react";

interface AppContainerProps {}

export const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  return (
    <div
      style={{
        margin: "0 auto 0 auto",
        marginTop: "50px",
        maxWidth: "1000px",
        minHeight: "90vh",
      }}
    >
      {children}
    </div>
  );
};
