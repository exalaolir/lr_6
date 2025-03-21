import { useEffect, useState } from "react";
import React from "react";

type InputProps = {
  value: React.RefObject<string>;
  onUpdate: boolean;
  setError: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
};

const InputField: React.FC<InputProps> = ({
  value,
  onUpdate,
  setError,
  error = "",
}) => {
  const [val, setValue] = useState("");
  useEffect(() => setValue(value.current || ""), [onUpdate, value]);
  return (
    <div className="grid grid-cols-4 my-4">
      <input
        type="text"
        value={val}
        onChange={(e) => {
          if (error != "") setError(error = "");
          const newValue = e.target.value;
          setValue(newValue);
          value.current = newValue;
        }}
        className={`col-span-4 border-2 p-1.5 ${
          error === ""
            ? "border-amber-500 text-neutral-800"
            : "border-red-800 text-red-800"
        } rounded-[6px]
          focus-visible:border-amber-600  transition-colors focus-visible:outline-0 dark:text-neutral-200`}
        placeholder={error}
      />
    </div>
  );
};

export default InputField;
