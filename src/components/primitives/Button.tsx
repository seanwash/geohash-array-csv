import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "success" | "secondary";
  children: ReactNode;
  icon?: ReactNode;
}

const variantStyles = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  success: "bg-green-600 hover:bg-green-700 text-white",
  secondary: "bg-purple-600 hover:bg-purple-700 text-white",
};

export default function Button({
  variant = "primary",
  children,
  icon,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-medium py-2 px-4 rounded-md transition-colors flex items-center gap-2";
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button className={combinedClassName} {...props}>
      {icon}
      {children}
    </button>
  );
}