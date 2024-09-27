import React from "react";

interface ErrorPopupProps {
  message: String;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ message }) => {
  const onClose = (): void => {
    window.location.reload();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-red-600">Error</h2>
        <p className="mt-2 text-gray-800">{message}</p>
        <button
          onTouchEnd={onClose}
          onTouchStart={onClose}
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
        >
          Reload Website
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;
