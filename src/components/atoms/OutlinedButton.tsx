import React from "react";

interface OutlinedButtonProps {
  onClick?: () => void;
}

export const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  children,
  onClick,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      {...props}
      className="bg-transparent border-2 rounded px-1 border-blue-400 text-blue-400"
    >
      {children}
    </button>
  );
};
