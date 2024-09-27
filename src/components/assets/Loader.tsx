import React from "react";

interface LoadingPopupProps {
  isOpen: boolean;
}

const LoadingPopup: React.FC<LoadingPopupProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="loader"></div>
    </div>
  );
};

export default LoadingPopup;
