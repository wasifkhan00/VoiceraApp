import React from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoPopup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">
          Want To Try Another Face Detection !
        </h2>
        <p className="mb-4">
          Stop the webcam & then restart the webcam to capture and detect a new
          image.
        </p>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white rounded px-4 py-2 mr-2"
            onClick={onClose}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoPopup;
