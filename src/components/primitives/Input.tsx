import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className = "", ...props }: InputProps) {
  const baseStyles =
    "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm";
  const combinedClassName = `${baseStyles} ${className}`;

  return <input className={combinedClassName} {...props} />;
}