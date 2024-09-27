import { useState } from "react";
import "./tailwind.css";
import Layout from "./components/assets/Layout";
import Loading from "./components/Loading";
import { dataProviderContext } from "./components/contexts/DataProviderContext";
import ErrorPopup from "./components/assets/Error";
import SuccessModal from "./components/assets/Success";
import InfoPopup from "./components/assets/Info";
import LoadingPopup from "./components/assets/Loader";

function App() {
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(
    null
  );
  const [showLoading, setShowLoading] = useState<Boolean>(false);
  const [showStopButton, setShowStopButton] = useState<Boolean>(true);

  const [showSuccess, setShowSuccess] = useState<Boolean>(false);
  const [showFailure, setShowFailure] = useState<Boolean>(false);
  const [IsLoading, setIsLoading] = useState<Boolean>(true);
  const [showError, setShowError] = useState<Boolean>(false);
  const [showWarning, setShowWarning] = useState<Boolean>(false);
  const [circleLoader, setCircleLoader] = useState<Boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<String>(
    "Ai is detecting face Please Wait..."
  );
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [warningMessage, setWarningMessage] = useState<String>("");

  return (
    <dataProviderContext.Provider
      value={{
        permissionGranted,
        showStopButton,
        setShowStopButton,
        setPermissionGranted,
        IsLoading,
        circleLoader,
        setCircleLoader,
        setLoadingMessage,
        setShowFailure,
        showFailure,
        showSuccess,
        setIsLoading,
        setShowSuccess,
        loadingMessage,
        setShowLoading,
        setShowWarning,
        showWarning,
        showLoading,
        setWarningMessage,
        warningMessage,
        showError,
        setShowError,
        setErrorMessage,
        errorMessage,
      }}
    >
      <div className="flex align-center justify-center h-screen bg-gray-100">
        {showSuccess || showFailure ? <SuccessModal /> : null}
        {showWarning ? (
          <InfoPopup isOpen={true} onClose={() => setShowWarning(false)} />
        ) : null}
        {circleLoader ? <LoadingPopup isOpen={true} /> : null}

        {showError ? (
          <ErrorPopup message={errorMessage} />
        ) : showLoading ? (
          <Loading />
        ) : (
          <Layout />
        )}
      </div>
    </dataProviderContext.Provider>
  );
}

export default App;
