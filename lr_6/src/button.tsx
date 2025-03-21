import React from "react";

type ButtonProps = {
  text: string;
  fun: (event?:React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
  useOrange?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  text,
  fun,
  disabled,
  useOrange = false,
}) => {
  return (
    <button
      onClick={fun}
      disabled={disabled}
      className={`${!useOrange ? "bg-fuchsia-50" : "bg-amber-600"} 
      rounded-xs p-2 hover:scale-[1.05] transition-transform duration-100  
      ${
        !useOrange ? "active:bg-fuchsia-100" : "active:bg-amber-600/50"} text-neutral-800 font-bold ${
        !useOrange ? "dark:bg-neutral-800" : "dark:bg-amber-600"
      } dark:text-gray-300 ${
        !useOrange ? "dark:active:bg-neutral-800/50" : "dark:active:bg-amber-600/50"
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
