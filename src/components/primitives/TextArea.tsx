import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function TextArea({ className = "", ...props }: TextAreaProps) {
  const baseStyles =
    "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm";
  const combinedClassName = `${baseStyles} ${className}`;

  return <textarea className={combinedClassName} {...props} />;
}