import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import ResetPassword from "./pages/reset-password/Reset-Password.jsx";
import UpdatePassword from "./pages/update-password/Update-Password.jsx";

export default function App() {
  return <>
    <AuthProvider>
      <Header />

      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />
          </Routes>
        </BrowserRouter>
      </main>
    </AuthProvider>
  </>;
}