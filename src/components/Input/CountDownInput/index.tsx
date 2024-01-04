import React from "react";
import DateTimeDisplay from "./DateTimeToDisplay";
import ShowCounter from "./ShowCounter";
import ExpiredNotice from "./ExpiredNotic";
import { useCountdown } from "./useContDown";

interface CountdownTimerProps {
  futureDate: string;
}

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return <ShowCounter minutes={minutes} seconds={seconds} />;
  }
};

export default CountdownTimer;
