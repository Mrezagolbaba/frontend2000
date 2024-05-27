import animationData from "assets/img/loading/01.svg";

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

      <img src={animationData} width={300} alt="loading..." />
    </div>
  );
}
