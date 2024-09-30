import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import "@mediapipe/face_detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import * as faceDetection from "@tensorflow-models/face-detection";
import Webcam from "react-webcam";
import { dataProviderContext } from "./contexts/DataProviderContext";

const FaceDetector = (props: any) => {
  const [startCamera, setStartCamera] = useState<Boolean>(true);
  const [axiosFailed, setAxiosFailed] = useState<Boolean>(false);
  const [retryAttempts, setRetryAttempts] = useState<number>(3);
  const alertWarningCrossBrowsers =
    "If You are using Android or Ios, Some buttons may not properly respond to touches, We are wroking on this issue, We are Sorry for the inconvenience Try Using Mozila FireFox on Android/ios";
  const apiCallFailedMessage =
    "It looks like you're having a network problem, Please Reload The Website and if the error persisted Please report it to the developer at ukhanwasif00@gmail.com";

  const {
    permissionGranted,
    showStopButton,
    setShowStopButton,
    setPermissionGranted,
    setCircleLoader,
    setIsLoading,
    setShowFailure,
    setShowSuccess,
    setShowError,
    setErrorMessage,
  } = useContext(dataProviderContext);

  useEffect(() => {
    props.setIsVisible(true);

    if (permissionGranted && startCamera) {
      setTimeout(() => {
        loadModel2();
        setShowStopButton(false);
      }, 200);
    }
  }, [permissionGranted]);

  useEffect(() => {
    const checkPermissions = async () => {
      setCircleLoader(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setPermissionGranted(true);
        setCircleLoader(false);
        stream.getTracks().forEach((track) => track.stop());
      } catch (error) {
        setErrorMessage(
          "Webcam Permission Denied! Please Reload & Provide The Permission"
        );
        setShowError(true);
        setPermissionGranted(false);
      }
    };

    checkPermissions();
  }, [permissionGranted]);

  const loadModel2 = async () => {
    const WebCam: any = document.getElementById("WebCam");
    const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
    const detectorConfig: any = {
      runtime: "tfjs",
    };

    try {
      const detector = await faceDetection.createDetector(
        model,
        detectorConfig
      );
      const estimationConfig = { flipHorizontal: false };

      const canvas = props.canvas.current;
      if (canvas !== null) {
        const ctx = canvas.getContext("2d");

        const face = await detector.estimateFaces(WebCam, estimationConfig);

        if (face.length > 0) {
          alert(alertWarningCrossBrowsers);

          props.setIsVisible(false);
          setShowSuccess(true);
        } else {
          alert(alertWarningCrossBrowsers);
          props.setIsVisible(false);
          setShowFailure(true);
        }

        drawBoundingBoxes(face, ctx);
      }
    } catch {
      setErrorMessage(apiCallFailedMessage);
      setRetryAttempts((prev) => (prev > 0 ? prev - 1 : prev));
      setAxiosFailed(true);
    }
  };
  useEffect(() => {
    if (axiosFailed && retryAttempts > 0) {
      setTimeout(() => {
        loadModel2();
      }, 1000);
    } else if (axiosFailed && retryAttempts === 0) {
      setErrorMessage(apiCallFailedMessage);
      // setShowError(true);
    }
  }, [retryAttempts, axiosFailed]);
  const drawBoundingBoxes = async (face: any[], ctx: any) => {
    const WebCam: any = document.getElementById("WebCam");

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    props.setIsVisible(false);
    const canvas = props.canvas.current;
    if (canvas !== null) {
      ctx.drawImage(WebCam, 0, 0, canvas.width, canvas.height);
    }
    ctx.strokeRect(50, 50, 200, 90);
  };

  function Start(e: Object): void {
    setIsLoading(true);
    props.setIsVisible(true);

    if (startCamera === false) {
      setStartCamera(true);

      if (permissionGranted) {
        setTimeout(() => {
          loadModel2();
          setShowStopButton(false);
        }, 200);
      }
    }
  }
  function Stop(e: Object): void {
    const canvas = props.canvas.current;
    setIsLoading(false);
    props.setIsVisible(false);

    if (canvas !== null) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    if (startCamera === true) {
      setStartCamera(false);
    }
  }

  return (
    <div className="parent w-full h-full object-cover">
      <div className="webcamparent">
        {startCamera ? <Webcam id="WebCam" /> : null}
        <div id="">
          <div className="space-x-2">
            {!startCamera ? (
              <button
                style={{ cursor: !startCamera ? "pointer" : "auto" }}
                disabled={startCamera ? true : false}
                onClick={Start}
                className="px-6 font-mono  py-1 text-xs text-black  rounded-lg shadow hover:bg-green-100 transition duration-300 commonButton greenBTN"
              >
                Start
              </button>
            ) : (
              <button
                style={{ cursor: startCamera ? "pointer" : "auto" }}
                disabled={showStopButton ? false : true}
                onClick={Stop}
                className="px-6 font-mono  py-1 text-xs text-black  rounded-lg shadow hover:bg-red-100 transition duration-300 commonButton"
              >
                Stop
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceDetector;
