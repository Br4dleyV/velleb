import { AuthProvider } from "./context/AuthContext.jsx";
import { AlertProvider } from "./context/AlertContext";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/authentication/Login.jsx";
import Register from "./pages/authentication/Register.jsx";
import ResetPassword from "./pages/authentication/ResetPassword.jsx";
import UpdatePassword from "./pages/authentication/UpdatePassword.jsx";

export default function App() {
  return <>
    <AlertProvider>
      <AuthProvider>
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />
          </Routes>
        </main>
      </AuthProvider>
    </AlertProvider>
  </>;
}