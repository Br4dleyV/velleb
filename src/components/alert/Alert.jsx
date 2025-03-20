import { useState, useEffect } from "react";
import "./Alert.css";

export default function Alert({ message, type = "info", onClose, title }) {
    // State to manage the fade-out animation
    const [isFadingOut, setIsFadingOut] = useState(false);

    // Close the alert when the Escape key is pressed
    useEffect(() => {
        // Function to handle the keydown event
        function handleKeyDown(e) {
            if (e.key === "Escape") {
                handleClose();
            }
        };
        // Add the event listener
        window.addEventListener("keydown", handleKeyDown);
        // Remove the event listener when the component is unmounted
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Function to close the alert
    function handleClose() {
        // Trigger the fade-out animation and close the alert after 200ms
        setIsFadingOut(true);
        setTimeout(onClose, 200);
    };

    return (
        <div className="alert" onClick={handleClose}>
            <div
                className={`alert-${type} ${isFadingOut ? "fade-out" : ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                <h3>{title}</h3>
                <p>{message}</p>
                <button className={`button button-${type}`} onClick={handleClose}>Close</button>
            </div>
        </div>
    );
}