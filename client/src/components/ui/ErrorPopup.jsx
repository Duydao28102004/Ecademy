import { useEffect, useState } from "react";

export default function ErrorPopup({ message, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setVisible(false), 2700); // Fade out before disappearing
    const removeTimer = setTimeout(onClose, 3000); // Auto close after 3s

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onClose]);

  return (
    <div
      className={`absolute flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
        <p className="text-lg font-semibold">{message}</p>
        <button
          onClick={onClose}
          className="mt-2 bg-white text-red-500 px-3 py-1 rounded-md font-bold hover:bg-gray-200"
        >
          OK
        </button>
      </div>
    </div>
  );
}