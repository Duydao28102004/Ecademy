import React, { useEffect, useState } from 'react';
import QuestionSetPopup from '../components/ui/QuestionSetPopup';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';


export default function QuestionSet() {
    // State to manage question sets
    const [sets, setSets] = useState([]);

    // Get teacher ID from AuthContext
    const { user } = useAuth();

    // Backend API URL
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    // Effect to fetch question sets from the server
    useEffect(() => {
        const fetchSets = async () => {
            try {
                console.log(user._id);
                const response = await axios.get(`${BACKEND_URL}/question-sets/teacher/${user._id}`);
                if (response.status === 200) {
                    setSets(response.data);
                } else {
                    console.error('Failed to fetch question sets:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching question sets:', error);
            }
        };
        fetchSets();
    }, [user._id, BACKEND_URL]);

    // State to manage popup visibility and new set data
    const [showPopup, setShowPopup] = useState(false);
    const [newSet, setNewSet] = useState({
        name: '',
        easy: 0,
        medium: 0,
        hard: 0,
        teacherId: user._id,
    });

    // Function to handle popup visibility
    const openPopup = () => setShowPopup(!showPopup);
    const closePopup = () => {
        setShowPopup(false);
        setNewSet({ name: '', easy: 0, medium: 0, hard: 0 });
    };

    // Function to handle input changes in the popup
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSet({ ...newSet, [name]: value });
    };

    // create a new question set with popup
    const createSet = async () => {
        console.log(newSet);
        if (!newSet.name || !newSet.teacherId) {
            alert("Enter all fields!");
            return;
        }

        // Call the API to create a new question set
        try {
            const response = await axios.post(`${BACKEND_URL}/question-sets`, newSet);
            setSets([...sets, response.data]);
            alert("Question set created successfully!");
        } catch (error) {
            console.error('Error creating question set:', error);
            alert("Error creating question set:", error.message);
        }
        closePopup();
    };

    // Delete a question set
    const deleteSet = async (id) => {
        // Call the API to delete the question set
        try {
            await axios.delete(`${BACKEND_URL}/question-sets/${id}`);
            setSets(sets.filter(set => set._id !== id));
            alert("Question set deleted successfully!");
        } catch (error) {
            console.error('Error deleting question set:', error);
        }
    };

    // Access a question set
    const accessSet = (id) => {
        console.log(`Truy cập bộ câu hỏi với ID: ${id}`);
    };

    return (
        <>
        {/* Main background */}
        <div className="flex flex-col items-center w-full min-h-screen bg-background p-4">
            {/* Container to store main content */}
            <div className ="bg-card shadow-lg rounded-lg p-8 w-[80%] flex flex-col items-center">
                <div className="flex justify-between w-full mb-6">
                    <h1 className="text-sectionTitle font-bold text-primary">Question Set List</h1>
                    <button
                        onClick={openPopup}
                        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Create New Set
                    </button>
                </div>

                {/* Question set list */}
                <div className="mt-6 flex flex-col w-full mb-6">
                    {sets.length > 0 ? (
                        sets.map((set) => (
                            <div
                                key={set.id}
                                className="flex justify-between items-center p-4 border-b"
                            >
                                <span className="font-semibold text-cardTitle text-textPrimary">{set.name}</span>
                                <div className="flex items-center">
                                    <p className="text-textSecondary text-body mr-6">Easy: {set.easy}</p>
                                    <p className="text-textSecondary text-body mr-6">Medium: {set.medium}</p>
                                    <p className="text-textSecondary text-body mr-6">Hard: {set.hard}</p>
                                </div>
                                <div>
                                    {/* Access button */}
                                    <button
                                        onClick={() => accessSet(set._id)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600"
                                    >
                                        Access
                                    </button>
                                    {/* Delete button */}
                                    <button
                                        onClick={() => deleteSet(set._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">There is no question set yet.</p>
                    )}
                </div>
            </div> 

            {/* Popup for creating new question set */}
            <QuestionSetPopup
                showPopup={showPopup}
                closePopup={closePopup}
                handleChange={handleChange}
                createSet={createSet}
                newSet={newSet}
            />
        </div>
        </>
    );
}
