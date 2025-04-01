import { Outlet } from "react-router-dom";

export default function TeacherDashboard() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>
            <p>Welcome to the Teacher Dashboard!</p>
            {/* Add more content here */}
            <Outlet />
        </div>
    );
}