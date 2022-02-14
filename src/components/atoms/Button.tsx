import React from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  // onClick?: () => void;
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
      className="bg-transparent border-t-0 border-x-0 border-b-blue-700 px-2 border-slate-400 border-4 hover:bg-sky-100   py-1 rounded-t"
    >
      {children}
    </button>
  );
};
