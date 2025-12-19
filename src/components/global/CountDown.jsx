import React, { useState, useEffect } from "react";

const CountDown = ({ isActive, setIsActive, seconds, setSeconds }) => {
  useEffect(() => {
    let timer;
    if (isActive && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }

    return () => clearInterval(timer);
  }, [isActive, seconds]);

  // Format time as MM:SS
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const secsRemaining = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secsRemaining).padStart(2, '0')}`;
  };

  return (
    <div className="countdown">
      <p className="text-[13px] font-bold">
        {formatTime(seconds)}
      </p>
    </div>
  );
};

export default CountDown;