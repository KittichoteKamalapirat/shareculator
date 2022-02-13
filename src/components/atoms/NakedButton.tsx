import React from "react";

interface NakedButtonProps {
  onClick?: () => void;
}

export const NakedButton: React.FC<NakedButtonProps> = ({
  children,
  onClick,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      {...props}
      className="bg-transparent rounded  px-2 border-white border-2 "
    >
      {children}
    </button>
  );
};
