// Import React core
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Global CSS
import "./index.css";

// Main App component
import App from "./App.jsx";

// Redux
import { Provider } from "react-redux";
import { appStore } from "./app/store";

// Toast notification component
import { Toaster } from "./components/ui/sonner";

// RTK Query hook (to check if user is loading)
import { useLoadUserQuery } from "./features/api/authApi";

// Loading spinner component

import LoadingSpinner from "./components/LoadingSpinner";

// ---------------- CUSTOM WRAPPER COMPONENT ----------------

// This component checks if user data is loading
// If loading → show spinner
// If not loading → show children (App)
const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();

  return (
    <>
      {
        isLoading ? (
          <LoadingSpinner /> // Show loading animation
        ) : (
          <>{children}</>
        ) // Show main app after loading
      }
    </>
  );
};

// ---------------- RENDER ROOT APP ----------------

createRoot(document.getElementById("root")).render(
  <StrictMode>

    {/* Provide Redux store to entire app */}
    <Provider store={appStore}>

      {/* Custom wrapper checks user loading */}
      <Custom>

        {/* Main Application */}

        <App />

        {/* Toast notifications container */}
        <Toaster />
      </Custom>
    </Provider>
  </StrictMode>,
);