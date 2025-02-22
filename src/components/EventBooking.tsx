import React, { useState, useEffect } from 'react';
import useEventBooking from '../hooks/useEventBooking';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmationModal from './ConfirmationModal';

const EventBooking: React.FC = () => {
  const {
    availableSlots,
    bookings,
    waitingList,
    bookSlot,
    cancelBooking,
    joinWaitingList,
    reset
  } = useEventBooking();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [modalAction, setModalAction] = useState<'book' | 'waitlist' | 'cancel' | null>(null);
  const [name, setName] = useState('');
  const [notification, setNotification] = useState<{ id: number; message: string } | null>(null);
  
  const showNotification = (message: string) => {
    const id = Date.now();  
    setNotification({ id, message });
    setTimeout(() => setNotification(null), 5000); 
  };
  
  useEffect(() => {
    if (notification) {
      const event = new Event('forceRender');
      window.dispatchEvent(event);
    }
  }, [notification]);
  
  
  return (
    <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow-lg p-6 text-center w-96">        
                    <h1 className="text-2xl font-bold mb-4">React Workshop</h1>
                    <AnimatePresence>
                        {notification && (
                            <motion.div 
                                key={notification ? notification.id : 'empty'}
                                data-testid="notification"
                                className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-xl shadow-lg"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                {notification.message}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <p className="text-lg mb-4">{availableSlots} spots left</p>

                    <motion.button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl"
                        onClick={() => {
                            if(availableSlots > 0) {
                                setModalAction('book');
                                setIsModalOpen(true);
                            }else{
                                showNotification('No slots available, joining waiting list is recommended.'); 
                            }
                        }}
                        // disabled={availableSlots === 0}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        >
                        Book Now
                    </motion.button>

                    {availableSlots === 0 && (
                    <div className="mt-4">
                        <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded-lg px-2 py-1 mb-2 w-full"
                        />
                        <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-xl"
                        onClick={() => {
                            if (name.trim()) {
                                setModalAction('waitlist');
                                setIsModalOpen(true);
                                showNotification('Added to Waiting List!');
                              } else {
                                showNotification('Name is required to join the waiting list.');
                              }
                        }}
                        >
                        Join Waiting List
                        </button>
                    </div>
                    )}

                    <h2 className="text-xl font-bold mt-6">Bookings:</h2>
                    <ul className="text-left">
                    {bookings.map((booking) => (
                        <li key={booking.id}>
                        {booking.timestamp}
                        <button
                            className="text-red-500 ml-2"
                            onClick={() => {
                                setSelectedBookingId(booking.id);
                                setModalAction('cancel');
                                setIsModalOpen(true);
                            }}
                        >
                            Cancel
                        </button>
                        </li>
                    ))}
                    </ul>

                    <h2 className="text-xl font-bold mt-6">Waiting List:</h2>
                    <ul className="text-left">
                    {waitingList.map((entry) => (
                        <li key={entry.id}>{entry.name}</li>
                    ))}
                    </ul>

                    <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-xl mt-6"
                    onClick={reset}
                    >
                    Reset
                    </button>
            </div>
        </div>
        <ConfirmationModal
            isOpen={isModalOpen}
            onClose={() => {
                setIsModalOpen(false);
                setModalAction(null);
            }}
            onConfirm={() => {
                if (modalAction === 'book') {
                const result = bookSlot();
                showNotification(result.message);
                } else if (modalAction === 'waitlist') {
                joinWaitingList(name);
                setName('');
                showNotification('Added to Waiting List!');
                } else if (modalAction === 'cancel' && selectedBookingId !== null) {
                cancelBooking(selectedBookingId);
                showNotification('Booking Canceled.');
                setSelectedBookingId(null);
                }
                setIsModalOpen(false);
                setModalAction(null);
            }}
            message={
                modalAction === 'book' 
                ? 'Are you sure you want to book this slot?' 
                : modalAction === 'waitlist' 
                    ? 'Are you sure you want to join the waiting list?' 
                    : 'Are you sure you want to cancel this booking?'
            }
        />

    </>
  );
};

export default EventBooking;
