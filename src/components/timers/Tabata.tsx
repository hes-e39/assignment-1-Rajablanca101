import React, { useState, useEffect } from "react";

type TimerProps = {
  work: number;
  rounds: number;
  rest: number;
};


// work,(20);
// rounds,(8);
// rest(10);

const Tabata: React.FC<TimerProps> = ({ work, rounds, rest }) => {
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [workTime, setWorkTime] = useState<number>(work);
  const [restTime, setRestTime] = useState<number>(rest);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isResting, setIsResting] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // set the interval to 0
    let interval: number;
// check if the timer is running and not paused
    if (isRunning && !isPaused) {

      interval = setInterval(() => {
// check if the timer is resting
        if (isResting) {
            // if the timer is resting, decrease the rest time by 1 second
          setRestTime((prev) => {
            // if the rest time is greater than 0, decrease the rest time by 1 second
            if (prev > 0) {
              return prev - 1;
              // otherwise, end the rest
            } else {
              endRest();
              return 0;
            }
          });
       
        } else {
          setWorkTime((prev) => {
            // if the work time is greater than 0, decrease the work time by 1 second
            if (prev > 0) {
              return prev - 1;
              // otherwise, start the rest
            } else {
              startRest();
              return 0;
            }
          });
        }
        // run the interval every 1 second
      }, 1000);
    }
// clear the interval
    return () => clearInterval(interval);
    // run the effect whenever the timer is running, paused, or resting
  }, [isRunning, isPaused, isResting]);


  // start the rest
  const startRest = () => {
    // check if the current round is less than the total rounds
    if (currentRound < rounds) {
        // set the message to "Rest"
      setIsResting(true);
      //    set the message to "Rest"
      setRestTime(rest); 
  
    } else {
        // set the message to "You have finished your work day"
      setMessage("You have finished your work day");

      setIsRunning(false);
    }
    // reset work time for the next round
    setWorkTime(work); 
  };
// end the rest
  const endRest = () => {
    setIsResting(false);
    // increase the current round by 1
    setCurrentRound((prev) => prev + 1);
  };
// start the timer function
  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
    setIsResting(false);
    setWorkTime(work);
    setRestTime(rest);
    setMessage(null);
  };

// start the timer function
  const resetTimer = () => {
    setIsRunning(false);
    setCurrentRound(1);
    setWorkTime(work);
    setRestTime(rest);
    setIsPaused(false);
    setIsResting(false);
    setMessage(null);
  };

// toggle the pause function
  const togglePause = () => {
    // toggle the running state
    setIsRunning((prev) => !prev);
    // toggle the paused state
    setIsPaused((prev) => !prev);
  };

  return (
    <>


      <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md ">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
            {/* // display the current round and the total rounds */}
          {(isRunning || isPaused) && (
            <>
            {/* // display the current round and the total rounds */}
              <h2 className="text-xl font-semibold mb-4">
                Round {currentRound} of {rounds}
              </h2>

              <h2
                className={`text-2xl font-mono mb-8 ${
                  isResting ? "text-blue-500" : "text-green-500"
                }`}
              >
                {/* // display the work time or the rest time */}
                {isResting
                  ? `Rest Time: ${restTime} seconds`
                  : `Work Time: ${workTime} seconds`}
              </h2>
            </>
          )}
          <h2 className="text-lg font-medium text-gray-700 mb-4">{message}</h2>

          <div className="flex space-x-4 justify-center">
            {/* // if the timer is not paused, display the start button */}
            {!isPaused && (
              <button
                onClick={startTimer}
                disabled={isRunning}
                className={`bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-200 ${
                  isRunning ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Start
              </button>
            )}
            {/* // if the timer is running or paused, display the pause, resume, and reset buttons */}
            {(isRunning || isPaused) && (
              <>
              {/* // if the timer is paused, display the resume button, otherwise display the pause button */}
                <button
                  onClick={togglePause}
                  className="bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition duration-200"
                >
                    {/* // display the resume button if the timer is paused, otherwise display the pause button */}
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

export default Tabata;
