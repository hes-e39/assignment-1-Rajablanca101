import React, { useState, useEffect } from "react";

type TimerProps = {
  timePerRound: number;
  rounds: number;
};
// timePerRound(30);
// rounds(5);

const XY: React.FC<TimerProps> = ({ timePerRound, rounds }) => {
  const [round, setRound] = useState<number>(1);
  const [count, setCount] = useState<number>(timePerRound);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    // set the interval to 0
    let intervalId: number;
// check if the timer is running
    if (isRunning) {
      intervalId = setInterval(() => {
        setCount((prev) => {
            // if the count is greater than 0, decrease the count by 1 second
          if (prev > 0) {
            return prev - 1;
            // otherwise, check if the round is less than the total rounds
          } else if (round < rounds) {
            setRound((prev) => prev + 1);
            return timePerRound;
            // otherwise, end the timer
          } else {
            setMessage("Finished");
            setIsRunning(false);
            return 0;
          }
        });
        // run the interval every 1 second
      }, 1000);
    }
// clear the interval
    return () => clearInterval(intervalId);
    // run the effect whenever the timer is running, the round changes, the time per round changes, or the rounds change
  }, [isRunning, round, timePerRound, rounds]);

  // start the timer function
  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
    setCount(timePerRound);
    setMessage(null);
  };
// reset the timer function
  const resetTimer = () => {
    setIsRunning(false);
    setRound(1);
    setCount(timePerRound);
    setIsPaused(false);
    setMessage(null);
  };
// toggle the pause function
  const togglePause = () => {
    setIsRunning((prev) => !prev);
    setIsPaused((prev) => !prev);
  };

  return (
    <>
   
      <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
          <h2 className="text-2xl font-semibold mb-4">
            {/* // display the current round and the total rounds */}
            Round {round} of {rounds}
          </h2>
          <h2 className="text-4xl font-mono text-blue-600 mb-8">
            {/* // display the time in the format mm:ss */}
            {count} seconds
          </h2>
          <h2 className="text-lg font-medium text-gray-700 mb-4">{message}</h2>

          <div className="flex space-x-4 justify-center">
            {/* // if the timer is not paused, display the start button */}
            {!isPaused && (
              <button
                onClick={startTimer}
                disabled={isRunning}
                className={`bg-green-500 justify-center text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-200 ${
                  isRunning ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Start
              </button>
            )}
            {/* // if the timer is running or paused, display the pause and reset buttons */}
            {(isRunning || isPaused) && (
              <>
              {/* // if the timer is paused, display the resume button, otherwise display the pause button */}
                <button
                
                  onClick={togglePause}
                  className="bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition duration-200"
                >
                  {isPaused ? "Resume" : "Pause"}
                </button>
                {/* // display the reset button */}
                <button
                  onClick={resetTimer}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                >
                  Reset
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default XY;
