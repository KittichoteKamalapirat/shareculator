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
    <button
      onClick={onClick}
      {...props}
      className="bg-green-500 rounded px-4 py-1 hover:bg-green-600 "
    >
      {children}
    </button>
  );
};
