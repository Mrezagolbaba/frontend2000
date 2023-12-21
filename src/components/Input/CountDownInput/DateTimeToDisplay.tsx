import React from "react";

const DateTimeDisplay = ({ value, isDanger }) => {
  return (
    <div className={isDanger ? "countdown danger" : "countdown"}>{value}</div>
  );
};

export default DateTimeDisplay;
