
import { useState, useEffect } from "react";

const StopWatch = () => {
    // set the initial time to 0
  const [time, setTime] = useState<number>(0);
  // set the initial state of the stopwatch to not running
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
  
    let interval: number;
  // check if the stopwatch is running and the time is less than 2.5 minutes
    if (isRunning && time < 150000) {
      interval = setInterval(() => {
        // increase the time by 10 milliseconds each 10 milliseconds
        setTime((prev) => prev + 10);
      }, 10);
    } 
    // otherwise if the time is greater than 2.5 minutes, stop the stopwatch
    else if (time >= 150000) {
      setIsRunning(false);
    }
// clear the interval
    return () => clearInterval(interval);
    // run the effect whenever the stopwatch is running or the time changes
  }, [isRunning, time]);

  const fmt = (nr: number) => nr.toString().padStart(2, "0");

  return (
    <>
      
      <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md ">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
          <div className="text-4xl font-mono text-blue-600 mb-8">
            {/* // display the time in the format mm:ss:ms */}
            <span>{fmt(Math.floor((time / 60000) % 60))}:</span>
            <span>{fmt(Math.floor((time / 1000) % 60))}:</span>
            <span>{fmt(Math.floor((time / 10) % 100))}</span>
          </div>
          <div className="flex space-x-4 justify-center">
            {/* // if the stopwatch is running, display the pause button, otherwise display the start button */}
            {isRunning ? (
              <button
                onClick={() => setIsRunning(false)}
                className="px-4 py-2 font-semibold rounded-lg bg-red-500 hover:bg-red-600 text-white"
              >
                Pause
              </button>
            ) : (
              <button
                onClick={() => setIsRunning(true)}
                className="px-4 py-2 font-semibold rounded-lg bg-green-500 hover:bg-green-600 text-white"
              >
                Start
              </button>
            )}
            {/* // reset the stopwatch to 0 */}
            <button
              onClick={() => {
                setTime(0);
                setIsRunning(false);
              }}
              className="px-4 py-2 font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StopWatch;


