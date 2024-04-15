import { Spinner } from "reactstrap";

export default function Loader() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2001,
        width: "100%",
        height: "100vh",
      }}
    >
      <Spinner
        color="primary"
        style={{ width: "8rem", height: "8rem", opacity: "0.6" }}
      />
    </div>
  );
}
