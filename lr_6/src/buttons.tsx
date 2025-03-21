import React from "react";
import Button from "./button";
import { evaluate } from "mathjs";

type GridProps = {
  value: React.RefObject<string>;
  state: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  error: string;
};
const ButtonsGrid: React.FC<GridProps> = ({
  value,
  state,
  setUpdate,
  setResult,
  setError,
  error,
}) => {
  const addNum = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (error != "") setError("");
    value.current += e?.currentTarget.textContent;
    setUpdate((state = !state));
  };

  const calc = (expression: string) => {
    try {
      if (
        !/^(\d|\+|-|\*|\/|\(|\))+$/.test(expression) ||
        /[+*/]{2,}/.test(expression) ||
        /-{3,}/.test(expression)
      )
        throw new Error("Неверно введены данные");

      let result: string = String(evaluate(expression));
      if (result.length > 8) result = Number(result).toExponential(4);
      setResult(result);
    } catch (error) {
      value.current = "";
      setUpdate((state = !state));
      if (error instanceof Error) setError(`Ошибка: ${error.message}`);
      else setError("Непредвиденная ошибка");
    }
  };
  return (
    <div className="grid grid-cols-4 gap-2 grow-1">
      <Button text="(" fun={addNum} disabled={false} />
      <Button text=")" fun={addNum} disabled={false} />
      <Button
        text="C"
        fun={() => {
          value.current = "";
          setUpdate((state = !state));
          setError("");
        }}
        disabled={false}
        useOrange={true}
      />
      <Button
        text="⌫"
        fun={() => {
          value.current = value.current.slice(0, -1);
          setUpdate((state = !state));
        }}
        disabled={false}
        useOrange={true}
      ></Button>
      <Button text="1" fun={addNum} disabled={false} />
      <Button text="2" fun={addNum} disabled={false} />
      <Button text="3" fun={addNum} disabled={false} />
      <Button text="+" fun={addNum} disabled={false} />
      <Button text="4" fun={addNum} disabled={false} />
      <Button text="5" fun={addNum} disabled={false} />
      <Button text="6" fun={addNum} disabled={false} />
      <Button text="-" fun={addNum} disabled={false} />
      <Button text="7" fun={addNum} disabled={false} />
      <Button text="8" fun={addNum} disabled={false} />
      <Button text="9" fun={addNum} disabled={false} />
      <Button text="*" fun={addNum} disabled={false} />
      <Button text="." fun={addNum} disabled={false} />
      <Button text="0" fun={addNum} disabled={false} />
      <Button
        text="="
        fun={() => {
          calc(value.current);
        }}
        disabled={false}
        useOrange={true}
      />
      <Button text="/" fun={addNum} disabled={false} />
    </div>
  );
};

export default ButtonsGrid;
