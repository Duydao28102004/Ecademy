import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";

export default function App() {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
            <Route path="*" element={<div className="flex justify-center items-center h-screen">404 Not Found</div>} />
        </Routes>
    );
}