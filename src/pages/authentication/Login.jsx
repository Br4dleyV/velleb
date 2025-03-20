import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAlert } from "../../context/AlertContext";
import { useAuth } from "../../context/AuthContext";
import './styles.css'

export default function Login() {
    // Hook to navigate between routes
    let navigate = useNavigate();

    // Request user and login and triggerAlert function from AuthContext & AlertContext
    const { user, login } = useAuth();
    const { triggerAlert } = useAlert(); 

    // If user is already logged in, redirect to home
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    // Log in the user
    async function handleLogin(e) {
        e.preventDefault();

        // Collect form data
        const [email, password] = e.target.elements;
        try {
            // Log in user and redirect to home page
            await login(email.value, password.value);
            navigate("/");
        } catch (error) {
            triggerAlert("Login Failed!", "error", error.message);
            console.error("Login failed:", error.message);
        }
    }

    return <main className="auth-container">
        <h2>Sign in to your account</h2>

        <form onSubmit={handleLogin}>
            <label htmlFor="email">Email address</label>
            <input type="email" name="email" id="email" autoComplete="email" required />

            <aside>
                <label htmlFor="password">Password</label>
                <Link to="/reset-password">Forgot password?</Link>
            </aside>
            <input type="password" name="password" id="password" autoComplete="current-password" required />

            <button type="submit" className="button button-green">Sign in</button>
        </form>

        <p>Don't have an account yet? {' '} <Link to="/register">Register here</Link>
        </p>
    </main>
}