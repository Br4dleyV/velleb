import { createContext, useContext, useState } from "react";
import Alert from "../components/alert/Alert"; // Import the Alert component

// Create the AlertContext
const AlertContext = createContext();

// Custom hook to use the AlertContext
export function useAlert() {
    return useContext(AlertContext);
}

// Create the AlertProvider to wrap the app and provide alert management
export function AlertProvider({ children }) {
    const [alert, setAlert] = useState(null);

    // Function to trigger an alert
    function triggerAlert(title, type = "info", message = "") {
        setAlert({ title, type, message });
    }

    // Function to clear the alert
    function clearAlert() {
        setAlert(null);
    }

    // Value to pass to the AlertContext
    const value = {
        alert,
        triggerAlert,
        clearAlert,
    };

    return (
        <AlertContext.Provider value={value}>
            {children}
            {alert && (
                <Alert
                    title={alert.title}
                    type={alert.type}
                    message={alert.message}
                    onClose={clearAlert} // Clear the alert when closed
                />
            )}
        </AlertContext.Provider>
    );
}
