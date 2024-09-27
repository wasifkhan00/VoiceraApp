import React, { useContext } from "react";
import { dataProviderContext } from "../contexts/DataProviderContext";

const SuccessModal = () => {
  const {
    showSuccess,
    showFailure,
    setShowSuccess,
    setShowFailure,
    setShowWarning,
    setShowStopButton,
  } = useContext(dataProviderContext);
  const handlebutton = (e: any): void => {
    const innerHTML = e.target.innerHTML;

    switch (innerHTML) {
      case "Reload":
        setShowFailure(false);
        window.location.reload();
        break;

      case "Okay":
        setShowSuccess(false);

        setTimeout(() => {
          setShowWarning(true);
          setShowStopButton(true);
        }, 2000);
        break;

      default:
        break;
    }
  };

  const handleOkay = () => {
    setShowFailure(false);
    setShowStopButton(true);
    setTimeout(() => {
      setShowWarning(true);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
        <h2
          className={
            showSuccess
              ? "text-lg font-semibold text-green-600"
              : "text-lg font-semibold text-red-600"
          }
        >
          {showSuccess ? "Success!" : "Oops"}
        </h2>
        <p className="mt-2 text-gray-700">
          {showSuccess
            ? "Ai has detected a human face!"
            : "Ai failed to detect any face, try getting in front of webcam"}
        </p>
        <div className="mt-4 flex justify-end">
          <button
            className={
              showSuccess
                ? "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
                : "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
            }
            onClick={handlebutton}
          >
            {showSuccess ? "Okay" : "Reload"}
          </button>
          {showFailure && !showSuccess ? (
            <button
              className={"bg-blue-500 text-white rounded px-4 py-2 ml-2"}
              onClick={handleOkay}
            >
              Ok
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
