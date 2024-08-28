import React, { useState, useEffect } from "react";
import "./App.css";

const Stopwatch = () => {
  const [time, setTime] = useState(0); 
  const [isRunning, setIsRunning] = useState(false); 
  const [stoppedTime, setStoppedTime] = useState(null); 

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      const startTime = Date.now() - time; 
      intervalId = setInterval(() => {
        setTime(Date.now() - startTime); 
      }, 1000);
    }
    return () => clearInterval(intervalId); 
  }, [isRunning, time]);

  const startPauseHandler = () => {
    setIsRunning(prev => !prev); 
  };

  const stopHandler = () => {
    setIsRunning(false); 
    setTime(0); 
    setStoppedTime(time); 
  };

  const resetHandler = () => {
    setIsRunning(false); 
    setTime(0); 
    setStoppedTime(null); 
  };

 const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${formattedMinutes}:${formattedSeconds}`;
};


  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="time-display">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={startPauseHandler}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={stopHandler}>
          Stop
        </button>
        <button onClick={resetHandler}>
          Reset
        </button>
      </div>
      {!isRunning && stoppedTime !== null && formatTime(stoppedTime) !== "00:00" && (
        <div className="elapsed-time">
          <p>Elapsed time when stopped: {formatTime(stoppedTime)}</p>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
