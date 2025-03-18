import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full bg-white cursor-pointer border transition border-black px-4 text-lg w-56 py-2.5 text-black hover:bg-gray-200 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
