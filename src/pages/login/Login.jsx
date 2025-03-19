// src/pages/Login.jsx
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook
import './Login.css'

function Login() {
    const { user, login } = useAuth(); // Access user and login function from AuthContext

    // Check if user is already logged in
    useEffect(() => {
        if (user) {
            window.location.href = "/";
        }
    }, [user]);

    // Logs in the user by creating a session
    async function handleLogin(e) {
        e.preventDefault();

        // Collect form data
        const [email, password] = e.target.elements;
        try {
            await login(email.value, password.value); // Use the login function from AuthContext
            window.location.href = "/"; // Redirect to home after successful login
        } catch (error) {
            console.error("Login failed:", error.message); // Log error if login fails
        }
    }

    return <>
        <main>
            <h2>Sign in to your account</h2>

            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email address</label>
                <input type="email" name="email" id="email" autoComplete="email" required />

                <aside>
                    <label htmlFor="password">Password</label>
                    <Link to="/reset-password">Forgot password?</Link>
                </aside>
                <input type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6" />

                <button type="submit" className="button button-green">Sign in</button>
            </form>

            <p>
                Don't have an account yet? {' '}
                <Link to="/register">Register here</Link>
            </p>
        </main>
    </>;
}

export default Login;