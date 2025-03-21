import ButtonsGrid from "./buttons";
import InputField from "./input_form";
import Button from "./button";

import React, { useEffect, useRef, useState } from "react";

class State {
  public result: string;
  public exp: string;

  constructor(result: string, exp: string) {
    this.exp = exp;
    this.result = result;
  }
}

type CardProps = {
  state: State;
  onClick: () => void;
};

const Card: React.FC<CardProps> = ({ state, onClick }) => {
  return (
    <div onClick={onClick} className="flex flex-col hover:scale-[1.02] transition-transform bg-fuchsia-50 dark:bg-neutral-800 p-3 mt-2 mb-2">
      <h1 className="text-neutral-800 dark:text-gray-300 text-3xl font-bold">
        {state.result}
      </h1>
      <p className="text-neutral-800 dark:text-gray-300 text-2xl">
        {state.exp}
      </p>
    </div>
  );
};

export const App: React.FC = () => {
  const [themeName, setThemeName] = useState("Dark");
  const [update, setUpdate] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [switchScreen, setSwitchScreen] = useState(false);
  const [states, setState] = useState(new Array<State>());
  const expression: React.RefObject<string> = useRef("");
  const newRes: React.RefObject<string> = useRef(result);

  useEffect(
    () => {
      setState([...states, new State(result, expression.current)]);
      console.log(states);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [newRes, result]
  );

  return (
    <>
      <div
        className={`${
          !switchScreen ? "flex" : "hidden"
        } flex-col justify-between outline-2 outline-fuchsia-200 max-sm:w-screen max-sm:h-screen h-150 sm:w-95 rounded-[10px] p-2 bg-white dark:outline-0 dark:bg-neutral-900`}
      >
        <div className="flex justify-between">
          <Button
            text="История"
            fun={() => setSwitchScreen(!switchScreen)}
            disabled={false}
          ></Button>
          <Button
            text={themeName}
            fun={() => {
              document.documentElement.classList.toggle("dark");
              setThemeName(themeName == "Dark" ? "Light" : "Dark");
            }}
            disabled={false}
          ></Button>
        </div>
        <div>
          <h1 className="text-right font-bold text-5xl text-neutral-800 dark:text-gray-300 ">
            {result}
          </h1>
        </div>
        <div className="h-3/5 flex flex-col">
          <InputField
            value={expression}
            onUpdate={update}
            setError={setError}
            error={error}
          />
          <ButtonsGrid
            value={expression}
            state={update}
            setUpdate={setUpdate}
            setResult={setResult}
            setError={setError}
            error={error}
          />
        </div>
      </div>
      <div
        className={`${
          switchScreen ? "flex" : "hidden"
        } flex-col overflow-scroll outline-2 outline-fuchsia-200 max-sm:w-screen max-sm:h-screen h-150 sm:w-95 rounded-[10px] p-2 gap-3 bg-white dark:outline-0 dark:bg-neutral-900`}
      >
        <div>
          <Button
            text="Калькулятор"
            fun={() => setSwitchScreen(!switchScreen)}
            disabled={false}
          ></Button>
        </div>
        <div>
          {states
            .filter((card) => card.exp != "")
            .map((card, index) => (
              <Card
                key={index}
                state={card}
                onClick={() => {
                  setResult(card.result);
                  expression.current = card.exp;
                  setUpdate(!update)
                }}
              />
            ))}
        </div>
      </div>
    </>
  );
};
