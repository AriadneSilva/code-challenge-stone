import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle?: object;
  disabled?: boolean;
  active?: boolean;
}

export function Button({
  children,
  buttonStyle = {},
  disabled,
  active,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={
        disabled
          ? `rounded-md bg-gray-500 hover:bg-primary-light text-text-base px-3 py-1 cursor-not-allowed `
          : !active
          ? `rounded-md bg-primary hover:bg-primary-light text-text-base px-3 py-1 `
          : `rounded-md bg-green-400 hover:bg-primary-light text-text-base px-3 py-1 `
      }
      style={buttonStyle}
      {...rest}
    >
      {children}
    </button>
  );
}
