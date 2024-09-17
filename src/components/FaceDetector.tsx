import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import "@mediapipe/face_detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import * as faceDetection from "@tensorflow-models/face-detection";
import Webcam from "react-webcam";

const FaceDetector = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [startCamera, setStartCamera] = useState<Boolean>(false);
  const [showCanvas, setShowCanvas] = useState<Boolean>(false);

  const loadModel2 = async () => {
    const WebCam: any = document.getElementById("WebCam");

    try {
      const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
      const detectorConfig: any = {
        runtime: "tfjs",
      };
      const detector = await faceDetection.createDetector(
        model,
        detectorConfig
      );
      const estimationConfig = { flipHorizontal: false };

      const canvas = canvasRef.current;
      if (canvas !== null) {
        const ctx = canvas.getContext("2d");

        const face = await detector.estimateFaces(WebCam, estimationConfig);
        if (face.length > 0) {
          alert("Human Face Has been Detected");
        } else {
          alert("Human Face Has not been detected");
        }
        drawBoundingBoxes(face, ctx);
      }
    } catch {
      throw Error;
    }
  };

  const drawBoundingBoxes = (face: any[], ctx: any) => {
    const WebCam: any = document.getElementById("WebCam");

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    const canvas = canvasRef.current;
    if (canvas !== null) {
      ctx.drawImage(WebCam, 0, 0, canvas.width, canvas.height);
    }
    ctx.strokeRect(50, 50, 200, 90);

setTimeout(() => {
    
    alert('stop the camera and then start it to capture/detect new image')
}, 4000);
  };

  function Start(e: Object): void {
    if (startCamera === false) {
      setStartCamera(true);
      setTimeout(() => {
        loadModel2();
        setShowCanvas(true);
      }, 400);
    }
  }
  function Stop(e: Object): void {
    if (startCamera === true) {
      setShowCanvas(false);

      setStartCamera(false);
    }
  }

  return (
    <div className="parent">
      <div className="webcamparent canvas">
        {startCamera ? <Webcam id="WebCam" /> : null}
        <div id="webcamButtons">
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
      </div>
      {showCanvas ? <canvas className="canvas" ref={canvasRef}></canvas> : null}
    </div>
  );
};

export default FaceDetector;
