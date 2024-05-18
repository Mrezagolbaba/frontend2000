import { Spinner } from "reactstrap";
import * as animationData from './loading.json';
import Lottie from 'react-lottie';

export default function Loader() {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
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
      {/* <Spinner
        color="primary"
        style={{ width: "8rem", height: "8rem", opacity: "0.6" }}
      /> */}
      <Lottie options={defaultOptions}
              height={400}
              width={400}
        />
    </div>
  );
}
