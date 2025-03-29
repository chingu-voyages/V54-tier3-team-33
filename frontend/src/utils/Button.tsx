import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary"; 
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  disabled = false,
  type = "button",
  variant = "primary", // primary as default
}) => {
  
  const baseStyles = "w-56 cursor-pointer rounded-full border border-primary px-4 py-2.5 text-lg font-semibold transition";
  const primaryStyles = "bg-primary hover:bg-primaryHover text-white";
  const secondaryStyles = "bg-transparent hover:bg-customcolortwo text-primary";

  
  const variantStyles = variant === "primary" ? primaryStyles : secondaryStyles;

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;