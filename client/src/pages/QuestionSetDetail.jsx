import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import QuestionPopup from "../components/ui/QuestionPopup.jsx";

export default function QuestionSetDetail() {
    // Get question set ID from URL params
    const { id } = useParams(); 
    const { user } = useAuth(); 

    // State to manage question data
    const [questions, setQuestions] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editQuestion, setEditQuestion] = useState(null);

    // Fetch sample questions (NO API)
    useEffect(() => {
        fetchQuestions();
    }, []);
    const fetchQuestions = () => {
        setTimeout(() => {
            const sampleData = [
                { _id: "1", text: "What is 2 + 2?", options: { A: "3", B: "4", C: "5", D: "6" }, correctAnswer: "B", difficulty: "easy" },
                { _id: "2", text: "What is the capital of France?", options: { A: "Berlin", B: "Madrid", C: "Paris", D: "London" }, correctAnswer: "C", difficulty: "easy" },
                { _id: "3", text: "What is the square root of 144?", options: { A: "10", B: "12", C: "14", D: "16" }, correctAnswer: "B", difficulty: "medium" },
                { _id: "4", text: "Who developed the theory of relativity?", options: { A: "Newton", B: "Einstein", C: "Tesla", D: "Hawking" }, correctAnswer: "B", difficulty: "medium" },
                { _id: "5", text: "Solve: 5x - 3 = 12", options: { A: "2", B: "3", C: "4", D: "5" }, correctAnswer: "B", difficulty: "hard" },
                { _id: "6", text: "What is the derivative of x^2?", options: { A: "x", B: "2x", C: "x^2", D: "3x" }, correctAnswer: "B", difficulty: "hard" },
            ];
            setQuestions(sampleData);
        }, 500);
    };

    // Open and close the popup for adding/editing questions
    const openPopup = (question = null) => {
        setEditQuestion(question);
        setModalOpen(true);
    };
    const closePopup = () => {
        setEditQuestion(null);
        setModalOpen(false);
    };

    // Handle saving a question (NO API)
    const handleSaveQuestion = (formData) => {
        if (editQuestion) {
            setQuestions((prev) =>
                prev.map((q) => (q._id === editQuestion._id ? { ...q, ...formData } : q))
            );
        } else {
            const newQuestion = { ...formData, _id: String(Date.now()) };
            setQuestions((prev) => [...prev, newQuestion]);
        }
        closePopup();
    };

    // Handle deleting a question (NO API)
    const deleteQuestion = (questionId) => {
        if (!window.confirm("Are you sure you want to delete this question?")) return;
        setQuestions((prev) => prev.filter((q) => q._id !== questionId));
    };


    // Group questions by difficulty
    const groupedQuestions = {
        easy: questions.filter((q) => q.difficulty === "easy"),
        medium: questions.filter((q) => q.difficulty === "medium"),
        hard: questions.filter((q) => q.difficulty === "hard"),
    };

    return (
        <>
        {/* Main background */}
        <div className="flex flex-col items-center w-full min-h-screen bg-background p-4">
            {/* Container to store main content */}
            <div className="w-[80%] bg-card shadow-lg mx-auto p-6">
                {/* Header */}
                <h1 className="text-2xl font-bold mb-4">Question Set Details</h1>
                {/* Add question button */}
                <button onClick={() => openPopup()} className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md">
                    + Add Question
                </button>

                {/* Question categories */}
                {["easy", "medium", "hard"].map((level) => (
                    <div key={level} className="mb-6">
                        {/* Category title */}
                        <h2 className={`text-xl font-semibold ${level === "easy" ? "text-green-600" : level === "medium" ? "text-yellow-600" : "text-red-600"}`}>
                            {level.charAt(0).toUpperCase() + level.slice(1)} Questions
                        </h2>
                        {/* Question list depend on level*/}
                        <div className="border p-4 rounded-md">
                            {groupedQuestions[level].length > 0 ? (
                                groupedQuestions[level].map((q) => (
                                    <div key={q._id} className="flex justify-between items-center p-3 border-b">
                                        <span>{q.text}</span>
                                        <div>
                                            {/* Edit buttons */}
                                            <button onClick={() => openPopup(q)} className="px-2 py-1 bg-blue-500 text-white rounded-md mr-2">
                                                Edit
                                            </button>
                                            {/* Delete buttons */}
                                            <button onClick={() => deleteQuestion(q._id)} className="px-2 py-1 bg-red-500 text-white rounded-md">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No questions in this category.</p>
                            )}
                        </div>
                    </div>
                ))}

                {modalOpen && <QuestionPopup question={editQuestion} onSave={handleSaveQuestion} onClose={closePopup} />}
            </div>
        </div>
        </>
    );
}
