import { ReactNode } from "react";

interface AlertProps {
  variant?: "error" | "info";
  children: ReactNode;
}

const variantStyles = {
  error: "bg-red-50 border-red-200 text-red-700",
  info: "bg-blue-50 border-blue-200 text-blue-800",
};

export default function Alert({ variant = "error", children }: AlertProps) {
  return (
    <div
      className={`mt-4 p-3 border rounded-md ${variantStyles[variant]} text-sm`}
    >
      {children}
    </div>
  );
}