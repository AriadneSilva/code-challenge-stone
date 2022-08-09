import React, { InputHTMLAttributes, ReactElement, useCallback } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  erasable?: boolean;
  icon?: () => ReactElement;
  errors?: string;
  containerStyle?: object;
  inputStyle?: object;
  onResetValue?: () => void;
  characterCount?: boolean;
}

export const Input = ({
  erasable = false,
  name,
  label,
  containerStyle = {},
  inputStyle = {},
  onResetValue,
  maxLength,
  errors,
  characterCount = false,
  value,
  onBlur,
  icon: Icon,
  disabled = false,
  ...rest
}: InputProps) => {
  const handleInputBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur(event);
      }
    },
    [onBlur]
  );

  return (
    <>
      {!!label && (
        <label
          htmlFor={label}
          className={
            errors !== undefined
              ? "block text-sm font-medium text-yellow-500 dark:text-yellow-500"
              : "block text-sm font-medium text-gray-500 dark:text-gray-500"
          }
        >
          {label}
        </label>
      )}

      <input
        {...rest}
        className={
          errors !== undefined
            ? "appearance-none block w-full bg-gray-200 text-gray-700 border border-yellow-500 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
            : "w-full mb-3 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1"
        }
        id={name}
        name={name}
        onBlur={handleInputBlur}
        maxLength={maxLength || 200}
      />
      {!!errors && (
        <p className="text-yellow-500 text-xs font-semibold">{errors}</p>
      )}
    </>
  );
};
