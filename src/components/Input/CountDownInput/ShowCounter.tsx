import DateTimeDisplay from "./DateTimeToDisplay";

const ShowCounter = ({ minutes, seconds }) => {
  return (
    <div
      className="show-counter form-control"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        direction: "ltr",
      }}
    >
      <DateTimeDisplay value={minutes} isDanger={false} />
      :
      <DateTimeDisplay value={seconds} isDanger={false} />
    </div>
  );
};

export default ShowCounter;
