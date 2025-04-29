import React, { useRef, useState, useEffect } from "react";
import Point from "./components/Point";
import { generateRandomPoints } from "./utils";
import { HEIGHT_BOARD, WITH_BOARD } from "./constants";

const App = () => {
  const [list, setList] = useState(
    Array.from({ length: 0 }).fill({
      value: 0,
      position: 0,
      check: false,
      left: 0,
      right: 0,
      z_index: 0,
    })
  );
  const [gameId, setGameId] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [textHeading, setTextHeading] = useState("LET'S PLAY");
  const [nextPoint, setNextPoint] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const refInput = useRef();
  const startTimeRef = useRef(0);
  const boardRef = useRef();

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

  useEffect(() => {
    let interval;
    if (isAutoPlay) {
      interval = setInterval(() => {
        const newList = list.slice();
        const findvalueIndex = newList.findIndex(
          (point) => point.value === nextPoint
        );
        if (findvalueIndex !== -1) {
          onCheck(nextPoint, findvalueIndex);
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, list, nextPoint]);

  // const handleSubmit = () => {
  //   if (!Number.parseInt(refInput.current.value)) return;

  //   setGameId((prev) => prev + 1);

  //   setTextHeading("LET'S PLAY");
  //   setNextPoint(1);
  //   setTime(0);

  //   startTimeRef.current = Date.now();
  //   setIsRunning(true);

  //   let numPoint = Number.parseInt(refInput.current.value);
  //   let num = numPoint;
  //   const arrPosition = new Set();
  //   while (numPoint > 0) {
  //     const randomNumber = Math.floor(Math.random() * 100);
  //     arrPosition.add(randomNumber);
  //     numPoint--;
  //   }

  //   const newPoint = Array.from({ length: 100 }).map((_, index) => ({
  //     value: 0,
  //     position: index,
  //     check: false,
  //   }));

  //   while (num > 0) {
  //     const firstElement = arrPosition.values().next().value;
  //     arrPosition.delete(firstElement);
  //     newPoint[firstElement] = {
  //       ...newPoint[firstElement],
  //       value: num,
  //       position: firstElement,
  //     };
  //     num--;
  //   }

  //   setList(newPoint);
  // };
  const handleSubmit = () => {
    const numsPoint = Number.parseInt(refInput.current.value);
    if (!numsPoint) return;
    console.log(numsPoint);
    setGameId((prev) => prev + 1);

    setTextHeading("LET'S PLAY");
    setNextPoint(1);
    setTime(0);

    startTimeRef.current = Date.now();
    setIsRunning(true);

    let numPoint = numsPoint;
    let num = numPoint;
    const arrPosition = new Set();
    while (numPoint > 0) {
      const randomNumber = Math.floor(Math.random() * numsPoint);
      if (!arrPosition.has(randomNumber)) {
        arrPosition.add(randomNumber);
        numPoint--;
      }
    }

    const newPoint = Array.from({ length: numsPoint }).map((_, index) => ({
      value: 0,
      position: index,
      check: false,
      top: 0,
      left: 0,
      z_index: 0,
    }));

    while (num > 0) {
      const firstElement = arrPosition.values().next().value;
      const { left, top, z_index } = generateRandomPoints();
      arrPosition.delete(firstElement);
      newPoint[firstElement] = {
        ...newPoint[firstElement],
        value: num,
        position: firstElement,
        left,
        top,
        z_index,
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
      setNextPoint((prev) => prev + 1);
      if (value === Number.parseInt(refInput.current.value)) {
        setTimeout(() => {
          setIsRunning(false);
          setTextHeading("ALL CLEARED");
          setIsAutoPlay(false);
        }, 2000);
      }
    } else {
      setTextHeading("GAME OVER");
      setIsRunning(false);
      setIsAutoPlay(false);
    }
  };
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
      <div className="flex gap-x-3">
        <button
          onClick={handleSubmit}
          className="border-1 border-black px-4 py-2 rounded-lg cursor-pointer bg-neutral-300 hover:bg-neutral-400 transition-colors"
        >
          {time <= 0 ? "Start" : "Restart"}
        </button>
        {isRunning && (
          <button
            onClick={() => {
              if (isAutoPlay === false) {
                const newList = list.slice();
                const findvalueIndex = newList.findIndex(
                  (point) => point.value === nextPoint
                );
                onCheck(nextPoint, findvalueIndex);
              }
              setIsAutoPlay((prev) => !prev);
            }}
            className="border-1 border-black px-4 py-2 rounded-lg cursor-pointer bg-neutral-300 hover:bg-neutral-400 transition-colors"
          >
            Auto Play {!isAutoPlay ? "ON" : "OFF"}
          </button>
        )}
      </div>
      {/* <div
        ref={boardRef}
        className="grid grid-cols-10 gap-2 border-1 border-black p-4"
      >
        {list.map((point, index) => (
          <Point key={`${gameId}-${index}`} {...point} onCheck={onCheck} />
        ))}
      </div> */}
      <div
        style={{
          width: `${WITH_BOARD}px`,
          height: `${HEIGHT_BOARD}px`,
        }}
        ref={boardRef}
        className={`relative  gap-2 border-1 border-black p-4`}
      >
        {list.map((point, index) => (
          <Point key={`${gameId}-${index}`} {...point} onCheck={onCheck} />
        ))}
      </div>
      <p>
        {time > 0 &&
          nextPoint <= Number.parseInt(refInput.current.value) &&
          textHeading !== "GAME OVER" &&
          textHeading !== "ALL CLEARED" &&
          `Next: ${nextPoint}`}{" "}
      </p>
    </div>
  );
};

export default App;
