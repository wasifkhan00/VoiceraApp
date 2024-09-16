import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import "@mediapipe/face_detection";


const Webcams = () => {
  const [startCamera, setStartCamera] = useState<Boolean>(false);
  const webCamRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    async function loadModel() {
     
    }
    loadModel();
  }, []);

  function Start(e: Object): void {
    if (startCamera === false) setStartCamera(true);
  }
  function Stop(e: Object): void {
    if (startCamera === true) setStartCamera(false);
  }
  return (
    <div className="webcamparent">
      {startCamera ? <Webcam ref={webCamRef}/> : null}
      <div className="webcamButtons">
        <button
          style={{ cursor: !startCamera ? "pointer" : "auto" }}
          disabled={startCamera ? true : false}
          onClick={Start}
        >
          Start
        </button>
        <button
          style={{ cursor: startCamera ? "pointer" : "auto" }}
          disabled={startCamera ? false : true}
          onClick={Stop}
        >
          Stop
        </button>
      </div>

      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Webcams;
