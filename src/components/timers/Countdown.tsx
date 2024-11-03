import { useState, useEffect } from "react";


const StopWatch = () => {
// set the initial time to 2.5 minutes
  const [time, setTime] = useState<number>(60000 * 2.5);
  // set the initial state of the stopwatch to not running
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: number;
      // check if the stopwatch is running and the time is greater than 0
    if (isRunning && time >= 0) {
      interval = setInterval(() => {
        // decrese the time by 10 milliseconds each 10 milliseconds
        setTime((prev) => prev - 10);
      }, 10);
// otherwise if the time is less than 0, stop the stopwatch
    } else if (time <= 0) {
      setIsRunning(false);
      setTime(0);
    }

    return () => clearInterval(interval);
    // run the effect whenever the stopwatch is running or the time changes
  }, [isRunning, time]);
// format the time to display it in the format mm:ss:ms 
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
            <button
            // reset the stopwatch to 2.5 minutes
              onClick={() => {
                setTime(60000 * 2.5);
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
