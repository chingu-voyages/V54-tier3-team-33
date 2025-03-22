import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full bg-blue-400 cursor-pointer border transition border-black px-4 text-lg w-56 py-2.5 text-white hover:bg-blue-300 ${className}`}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
