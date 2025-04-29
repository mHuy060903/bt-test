import React, { useState, useEffect } from "react";

const Point = ({ value, position, check, onCheck, top, left, z_index }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (check) {
      setFadeOut(true);
    }
  }, [check]);

  const onHandleCheck = () => {
    onCheck(value, position);
  };

  const backgroundClass = check ? "bg-red-400" : "bg-white";

  return (
    <div
      onClick={onHandleCheck}
      style={{
        top: `${top}px`,
        left: `${left}px`,
        zIndex: check ? 1000 : z_index,
      }}
      className={`absolute
        ${value === 0 ? "invisible" : "inline-block"}
         p-2 px-4 rounded-full border-1 border-black text-center
        ${backgroundClass}
        ${fadeOut ? "opacity-0" : "opacity-100"}
        transition-all duration-2000 ease-in-out
       `}
    >
      {value}
    </div>
  );
};

export default Point;
