import styled from "styled-components";

import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";


const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Timer = styled.div`
  // border: 1px solid gray;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
`;

const TimerTitle = styled.div``;

const TimersView = () => {
  const timers = [
    { title: "Stopwatch", C: <Stopwatch /> },
    { title: "Countdown", C: <Countdown /> },
    { title: "XY", C: <XY timePerRound={60} rounds={10}/> },
    { title: "Tabata", C: <Tabata  work={20} rest={10} rounds={8} /> },
  ];

  return (
    <Timers className="text-xl font-bold mb-4 text-center">
      {timers.map((timer) => (
        <Timer key={`timer-${timer.title}`}>
          <TimerTitle>{timer.title}</TimerTitle>
          {timer.C}
        </Timer>
      ))}
    </Timers>
  );
};

export default TimersView;
