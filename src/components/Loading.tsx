import React, { useContext } from "react";
import { dataProviderContext } from "./contexts/DataProviderContext";

const Loading = () => {
  const { loadingMessage } = useContext(dataProviderContext);

  return (
    <div className="d-flex bg-white shadow-lg justify-center w-full max-w-md flex flex-col items-center">
      <div className="loader mt-1"></div>
      <p className=" loadingRightSideContainer text-gray-30 text-center">
        {" "}
        {loadingMessage}
      </p>
      <style>{`
        .loader {
            border: 1px solid black; /* Light grey */
            border-top: 1px solid white; /* Blue */
            border-radius: 50%;
            width: 10px;
            height: 10px;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `}</style>
    </div>
  );
};

export default Loading;
