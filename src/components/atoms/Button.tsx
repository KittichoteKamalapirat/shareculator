import React from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "solid" | "outlined" | "bottom-line" | "naked";
  color?: string;
  // onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "solid",
  color,
  onClick,
  ...props
}) => {
  let style;
  switch (variant) {
    case "solid":
      style = `bg-${
        color ? color : "green-500"
      } rounded px-2 py-1 hover:bg-green-600 text-white`;
      break;
    case "bottom-line":
      style = `bg-transparent border-t-0 border-x-0 border-b-blue-700 px-2 py-1 border-slate-400 border-4 hover:bg-sky-100   rounded-t`;
      break;

    case "outlined":
      style = `bg-transparent hover:bg-sky-100 border-2 rounded px-2 py-1 border-${
        color ? color : "blue-600"
      }  text-${color ? color : "blue-600"} `;
      break;
    case "naked":
      style = `bg-transparent rounded  px-2 py-1 border-white   hover:bg-sky-100 `;
      break;
  }
  return (
    <button
      onClick={onClick}
      {...props}
      // className="bg-transparent border-t-0 border-x-0 border-b-blue-700 px-2 border-slate-400 border-4 hover:bg-sky-100   py-1 rounded-t"
      className={style}
    >
      {children}
    </button>
  );
};
