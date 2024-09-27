import React, { useContext, useRef, useState } from "react";
import FaceDetector from "../FaceDetector";
import { dataProviderContext } from "../contexts/DataProviderContext";
import imageAi from "../assets/ai.jpg";
import Loading from "../Loading";

const Layout = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const { permissionGranted } = useContext(dataProviderContext);
  const containerStyles: object = {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "start",
  };

  return (
    <>
      <div className="flex justify-center h-screen bg-gray-100 layoutParent">
        <div className="w-1/2 flex items-center justify-center p-4 layoutChild">
          <div className="w-full h-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center ">
            <div className="w-full h-full object-cover">
              <h5 className="text-center font-mono">
                Detecting Face via Webcam
              </h5>
              <FaceDetector
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                canvas={canvasRef}
              />
            </div>
          </div>
        </div>

        <div className="w-1/2 flex flex-row items-center justify-center p-4  ">
          <div
            style={containerStyles}
            className="w-full flex flex-row h-full bg-gradient-to-r from-gray-200 to-gray-100   items-center justify-center containerStyles"
          >
            <h5 className="text-center font-mono">Detected Face</h5>

            <div
              id="rightSIdeImageContainer"
              className={
                isVisible
                  ? "visible w-full h-full object-cover"
                  : "null w-full h-full object-cover"
              }
              style={{ display: isVisible ? "flex " : "none" }}
            >
              <img src={imageAi} className=" object-cover" alt="" />
              {permissionGranted ? <Loading /> : null}
            </div>
            <canvas
              className={isVisible ? "hidden" : "canvas flex"}
              ref={canvasRef}
            ></canvas>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
