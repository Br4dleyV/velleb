import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import './Update-Password.css'

export default function UpdatePassword() {
    // Hook to navigate between routes
    let navigate = useNavigate();

    // Request updatepassword function from AuthContext
    const { updatepassword } = useAuth();

    // Get the user ID and secret from the URL
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    // Update the user password
    async function handleUpdate(e) {
        e.preventDefault();

        // Collect form data
        const [newPassword] = e.target.elements;
        try {
            // Update the user password and redirect to home
            await updatepassword(userId, secret, newPassword.value);
            navigate("/");
        } catch (error) {
            console.error("Update failed:", error.message);
        }
    }

    return <main className="update-password">
        <h2>Update Password</h2>

        <form onSubmit={handleUpdate}>
            <label htmlFor="password">New Password</label>
            <input type="password" name="password" id="password" autoComplete="password" required />

            <button type="submit" className="button button-green">Update Password</button>
        </form>

        <p>Changed your mind? {' '} <Link to="/">Go to home</Link>
        </p>
    </main>
}