import React from "react";

interface ButtonProps {
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      {...props}
      className="bg-transparent border-t-0 border-x-0 border-b-green-700 px-2 border-slate-400 border-4 "
    >
      {children}
    </button>
  );
};
