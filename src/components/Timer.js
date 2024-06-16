import { useEffect, useState } from "react";

function Timer({ tick, dispatch }) {
  const [timer, setTimer] = useState(tick);

  useEffect(() => {
    // Check if timer is already 0
    if (timer === 0) {
      dispatch({ type: "finish" });
      return;
    }

    // Decrement timer every second
    const intervalId = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(intervalId);
          return prevTimer;
        }
      });
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [timer, dispatch]);

  return (
    <div className="timer">
      <span>{timer}</span>
    </div>
  );
}

export default Timer;
