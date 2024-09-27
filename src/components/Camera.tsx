import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import "@mediapipe/face_detection";

const Webcams = () => {
  const [startCamera, setStartCamera] = useState<Boolean>(true);
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);

  function Start(e: Object): void {
    if (startCamera === false) setStartCamera(true);
  }
  function Stop(e: Object): void {
    if (startCamera === true) setStartCamera(false);
  }
  return (
    <div className="webcamparent w-full h-full object-cover">
      {startCamera ? <Webcam ref={webCamRef} /> : null}
      <div className="space-x-4 flex align-center justify-center ">
        <button
          style={{ cursor: !startCamera ? "pointer" : "auto" }}
          disabled={startCamera ? true : false}
          onClick={Start}
          className="px-6 py-3 text-white bg-green-600 rounded-lg shadow hover:bg-green-700 transition duration-300"
        >
          Start
        </button>
        <button
          style={{ cursor: startCamera ? "pointer" : "auto" }}
          disabled={startCamera ? false : true}
          onClick={Stop}
          className="px-6 py-3 text-white bg-red-600 rounded-lg shadow hover:bg-red-700 transition duration-300"
        >
          Stop
        </button>
      </div>

      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Webcams;
