import { bgcolor } from "@mui/system";
import React, { useEffect, useState } from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "solid" | "outlined" | "bottom-line" | "naked";
  color?: string;
  padding?: number;
  // onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "solid",
  color,
  padding,
  onClick,
  ...props
}) => {
  const [style, setStyle] = useState<string>("");

  useEffect(() => {
    let borderColor = "";
    let bgColor = "";
    let textColor = "";
    let customPadding = "";
    switch (variant) {
      case "solid":
        bgColor = `bg-${color}`;
        const solid = `${
          color ? bgColor : "bg-green-500"
        } rounded px-2 py-1 hover:bg-green-600 text-white`;
        setStyle(solid);
        break;
      case "bottom-line":
        const bottomLine = `bg-transparent border-t-0 border-x-0 border-b-blue-700 px-2 py-1 border-slate-400 border-4 hover:bg-sky-100   rounded-t`;
        setStyle(bottomLine);
        break;

      case "outlined":
        borderColor = `border-${color}`;
        textColor = `text-${color}`;
        const outlined = `bg-transparent hover:bg-sky-100 border-2 rounded px-2 py-1 ${
          color ? borderColor : "border-blue-600"
        }  ${color ? textColor : "text-blue-600"} `;
        setStyle(outlined);
        break;
      case "naked":
        customPadding = `px-${padding}`;
        const naked = `bg-transparent rounded py-1 ${
          typeof padding === "number" ? customPadding : "px-2"
        } border-white hover:bg-sky-100 `;
        setStyle(naked);
        break;
    }
  }, []);
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
