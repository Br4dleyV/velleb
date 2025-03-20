import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import './styles.css'

export default function ResetPassword() {
    // Hook to navigate between routes
    let navigate = useNavigate();

    // Request resetpassword function from AuthContext
    const { resetpassword } = useAuth();

    // Reset the user password
    async function handleReset(e) {
        e.preventDefault();

        // Collect form data
        const [email] = e.target.elements;
        try {
            // Send reset link and redirect to home page
            await resetpassword(email.value);
            navigate("/");
        } catch (error) {
            console.error("Reset failed:", error.message);
        }
    }

    return <main className="auth-container">
        <h2>Reset Password</h2>

        <form onSubmit={handleReset}>
            <label htmlFor="email">Email address</label>
            <input type="email" name="email" id="email" autoComplete="email" required />

            <button type="submit" className="button button-green">Send Reset Link</button>
        </form>

        <p>Changed your mind? {' '} <Link to="/">Go to home</Link>
        </p>
    </main>
}