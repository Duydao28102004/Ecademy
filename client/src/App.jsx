import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import TeacherDashboard from "./pages/TeacherDashboard";
import QuestionSet from "./pages/QuestionSet";
import "./App.css";
import QuestionSetDetail from "./pages/QuestionSetDetail";

export default function App() {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
            <Route path="/teacher-dashboard" element={<ProtectedRoutes><TeacherDashboard /></ProtectedRoutes>} />
            <Route path="/teacher-dashboard/question-set" element={<ProtectedRoutes><QuestionSet /></ProtectedRoutes>} />
            <Route path="/teacher-dashboard/question-set/:id" element={<ProtectedRoutes><QuestionSetDetail/></ProtectedRoutes>} />
            <Route path="*" element={<div className="flex justify-center items-center h-screen">404 Not Found</div>} />
        </Routes>
    );
}