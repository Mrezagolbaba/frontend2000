import { Progress } from "reactstrap";

export default function Loader() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2001,
        width: "100%",
      }}
    >
      <Progress color="primary" />
    </div>
  );
}
