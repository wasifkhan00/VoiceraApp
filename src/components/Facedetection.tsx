// src/FaceDetection.tsx
import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import {
  FaceLandmarksDetector,
  
} from "@tensorflow-models/face-landmarks-detection";

const FaceDetection: React.FC = () => {
  const [model, setModel] = useState<FaceLandmarksDetector | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const detector = await FaceLandmarksDetector({
          maxFaces: 1, 
        });
        setModel(detector);
      } catch (error) {
        console.error("Error loading face detection model:", error);
      }
    };

    const startVideo = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }
    };

    loadModel();
    startVideo();
  }, []);

  // Detect faces and draw bounding boxes
  useEffect(() => {
    const detectFace = async () => {
      if (model && videoRef.current && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (ctx && videoRef.current) {
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;

          const detections = await model.estimateFaces(videoRef.current);

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          detections.forEach((detection) => {
             const boundingBox = detection.boundingBox;
             ctx.beginPath();
             ctx.rect(
               boundingBox.topLeft[0],
               boundingBox.topLeft[1],
               boundingBox.bottomRight[0] - boundingBox.topLeft[0],
               boundingBox.bottomRight[1] - boundingBox.topLeft[1]
             );
             ctx.lineWidth = 2;
             ctx.strokeStyle = "red";
             ctx.stroke();
          });
        }

        requestAnimationFrame(detectFace);
      }
    };

    detectFace();
  }, [model]);

  return (
    <div style={{ position: "relative" }}>
      <video ref={videoRef}  />
      <canvas
        ref={canvasRef}
      />
    </div>
  );
};

export default FaceDetection;
