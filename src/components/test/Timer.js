import React, { useState, useEffect, useRef } from "react";

const CountdownTimer = ({ minutes, setTestComplete, finishTest }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const timerId = useRef();

  useEffect(() => {
    timerId.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);
  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(timerId.current);
      setTestComplete(true);
      finishTest();
    }
  }, [timeLeft]);
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ textAlign: "center", fontSize: "24px" }}>
      {timeLeft > 0 ? (
        <div
          className={`display-6 fw-bold ${
            timeLeft <= 60 ? "text-danger" : "text-success"
          }`}
        >
          {formatTime(timeLeft)}
        </div>
      ) : (
        <div>انتهي الوقت</div>
      )}
    </div>
  );
};

export default CountdownTimer;
