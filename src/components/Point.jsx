import React from "react";

const Point = ({ value, position, check, onCheck }) => {
  const onHandleCheck = () => {
    onCheck(value, position);
  };

  return (
    <div
      onClick={onHandleCheck}
      className={`${
        value === 0 || check ? "invisible" : "inline-block"
      } col-span-1 p-2 px-4 rounded-full border-1 border-black text-center ${
        check ? "bg-red-400" : ""
      } transition-all`}
    >
      {value}
    </div>
  );
};

export default Point;
