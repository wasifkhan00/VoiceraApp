import React from "react";

interface WarningPopupProps {
  message: String;
  onClose: () => void;
}

const WarningPopup: React.FC<WarningPopupProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold">Warning</h2>
        <p className="mt-2">{message}</p>
        <p className="mt-4">{"instructions"}</p>
        <button
          onClick={onClose}
          onTouchStart={onClose}
          onTouchEnd={onClose}
          className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Reload Website
        </button>
      </div>
    </div>
  );
};

export default WarningPopup;
