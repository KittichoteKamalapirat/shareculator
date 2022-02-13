import React from "react";

interface SolidButtonProps {
  onClick?: () => void;
}

export const SolidButton: React.FC<SolidButtonProps> = ({
  children,
  onClick,
  ...props
}) => {
  return (
    <button onClick={onClick} {...props} className="bg-green-400 rounded p-1 ">
      {children}
    </button>
  );
};
