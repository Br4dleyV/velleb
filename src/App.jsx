import { useState, useEffect, useRef } from "react"; // For state and effects
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { account } from "./config/appwrite";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    account.get().then((response) => {
      setUser(response);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return <>
    <Header user={user} />

    {/* Router */}
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login user={user} />} />
          <Route path="/register" element={<Register user={user} />} />
        </Routes>
      </BrowserRouter>
    </main>
  </>;
}