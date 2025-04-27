import React, { useRef, useState, useEffect } from "react";
import Point from "./components/Point";

const App = () => {
  const [list, setList] = useState(
    Array.from({ length: 100 }).fill({ value: 0, position: 0, check: false })
  );
  const [textHeading, setTextHeading] = useState("LET'S PLAY");
  const [nextPoint, setNextPoint] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const refInput = useRef();
  const startTimeRef = useRef(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      startTimeRef.current = Date.now();
      interval = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        setTime(elapsed.toFixed(1));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleSubmit = () => {
    let numPoint = Number.parseInt(refInput.current.value);
    setTextHeading("LET'S PLAY");
    setNextPoint(numPoint);
    setTime(0);
    setIsRunning(true);
    let num = numPoint;
    const arrPosition = new Set();
    while (numPoint > 0) {
      const randomNumber = Math.floor(Math.random() * 100);
      arrPosition.add(randomNumber);
      numPoint--;
    }

    const newPoint = Array.from({ length: 100 }).map((_, index) => ({
      value: 0,
      position: index,
      check: false,
    }));

    while (num > 0) {
      const firstElement = arrPosition.values().next().value;
      arrPosition.delete(firstElement);
      newPoint[firstElement] = {
        ...newPoint[firstElement],
        value: num,
        position: firstElement,
      };
      num--;
    }

    setList(newPoint);
  };

  const onCheck = (value, position) => {
    if (textHeading === "GAME OVER") return;
    if (value === nextPoint) {
      setList((prev) =>
        prev.map((point, index) => {
          if (index === position) {
            return { ...point, check: true };
          }
          return point;
        })
      );
      setNextPoint((prev) => prev - 1);
      if (value === 1) {
        setTextHeading("ALL CLEARED");
        setIsRunning(false);
      }
    } else {
      setTextHeading("GAME OVER");
      setIsRunning(false);
    }
  };

  return (
    <div className="text-full w-full flex flex-col items-start gap-y-3">
      <p
        className={`${textHeading === "ALL CLEARED" && "text-green-400"} ${
          textHeading === "GAME OVER" && "text-red-500"
        } font-bold`}
      >
        {textHeading}
      </p>
      <div className="flex items-center gap-10 ">
        <p>Points:</p>
        <input
          ref={refInput}
          className="border-1 rounded-lg focus:outline-none px-2 py-1"
        />
      </div>
      <div className="flex items-center gap-10">
        <p>Time:</p>
        <p>{time}s</p>
      </div>
      <button
        onClick={handleSubmit}
        className="border-1 border-black px-4 py-2 rounded-lg cursor-pointer bg-neutral-300 hover:bg-neutral-400 transition-colors"
      >
        Restart
      </button>
      <div className="grid grid-cols-10 gap-2 border-1 border-black p-4">
        {list.map((point, index) => (
          <Point key={index} {...point} onCheck={onCheck} />
        ))}
      </div>
    </div>
  );
};

export default App;
