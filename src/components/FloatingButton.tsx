import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import BookingModal from './BookingModal';

const FloatingButton: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg p-4 flex items-center gap-2 transition duration-300"
            >
                <FaCalendarAlt className="text-lg" />
                <span className="hidden sm:inline font-semibold">Foglalj időpontot</span>
            </button>

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default FloatingButton;
