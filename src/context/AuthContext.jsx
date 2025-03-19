import { createContext, useContext, useState, useEffect } from "react";
import { account } from "../config/Appwrite";

// Create the AuthContext
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export function useAuth() {
    return useContext(AuthContext);
};

// Create the AuthProvider component
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // State to hold the authenticated user
    const [loading, setLoading] = useState(true); // State to track loading state

    // Check if the user is already logged in on initial load
    useEffect(() => {
        async function fetchUser() {
            try {
                const user = await account.get();
                setUser(user); // Set the user if logged in
            } catch (error) {
                setUser(null); // Set user to null if not logged in
            } finally {
                setLoading(false); // Set loading to false once the check is complete
            }
        };

        fetchUser();
    }, []);

    // Function to log in the user
    async function login(email, password) {
        try {
            const session = await account.createEmailPasswordSession(email, password);
            const user = await account.get();
            setUser(user); // Update the user state
            return user;
        } catch (error) {
            console.error("Login failed:", error.message);
            throw error;
        }
    };

    // Function to log out the user
    async function logout() {
        try {
            await account.deleteSession("current");
            setUser(null); // Clear the user state
            window.location.href = "/login"; // Redirect to the login page
        } catch (error) {
            console.error("Logout failed:", error.message);
            throw error;
        }
    };

    // Function to register a new user
    async function register(email, password, name) {
        try {
            const user = await account.create("unique()", email, password, name);
            return user;
        } catch (error) {
            console.error("Registration failed:", error.message);
            throw error;
        }
    };
    
    // Value to be provided by the context
    const value = {
        user,
        loading,
        login,
        logout,
        register,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children} {/* Render children only when not loading */}
        </AuthContext.Provider>
    );
};