import { AuthProvider } from "./context/AuthContext.jsx"; // Import the AuthProvider
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Home from "./pages/Home";

export default function App() {
  return <>
    <AuthProvider>
      <Header />

      {/* Router */}
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </main>
    </AuthProvider>
  </>;
}