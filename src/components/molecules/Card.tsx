import React from "react";

interface CardProps {
  title: string;
}

export const Card: React.FC<CardProps> = ({ title, children, ...props }) => {
  return (
    <div className="max-w rounded overflow-hidden shadow-md flex-1" {...props}>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{children}</p>
      </div>
    </div>
  );
};
