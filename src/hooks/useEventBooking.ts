import { useState, useEffect } from 'react';

interface Booking {
  id: number;
  timestamp: string;
}

interface WaitingEntry {
  id: number;
  name: string;
}

const useEventBooking = () => {
  const totalSlots = parseInt(process.env.REACT_APP_TOTAL_SLOTS || '10');

  const [availableSlots, setAvailableSlots] = useState(totalSlots);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [waitingList, setWaitingList] = useState<WaitingEntry[]>([]);

  
  useEffect(() => {
    const savedSlots = localStorage.getItem('availableSlots');
    const savedBookings = localStorage.getItem('bookings');
    const savedWaitingList = localStorage.getItem('waitingList');

    if (savedSlots) setAvailableSlots(Number(savedSlots));
    if (savedBookings) setBookings(JSON.parse(savedBookings));
    if (savedWaitingList) setWaitingList(JSON.parse(savedWaitingList));
  }, []);

  useEffect(() => {
    localStorage.setItem('availableSlots', availableSlots.toString());
    localStorage.setItem('bookings', JSON.stringify(bookings));
    localStorage.setItem('waitingList', JSON.stringify(waitingList));
  }, [availableSlots, bookings, waitingList]);

  const bookSlot = (): { success: boolean; message: string } => {
    if (availableSlots > 0) {
      const newBooking = { id: Date.now(), timestamp: new Date().toLocaleString() };
      setBookings([...bookings, newBooking]);
      setAvailableSlots(prev => prev - 1);
      return { success: true, message: 'Booking Confirmed! 🎉' };
    } else {
        return { success: false, message: 'No slots available, joining waiting list is recommended.' };
    }
  };
  
  const cancelBooking = (id: number) => {
    // Step 1: Remove the canceled booking FIRST
    setBookings(prevBookings => {
      const updatedBookings = prevBookings.filter(booking => booking.id !== id);
      return updatedBookings;
    });
  
    // Step 2: Now check the waiting list
    if (waitingList.length > 0) {
      // Move the first person in the waiting list to confirmed bookings
      const nextInLine = waitingList[0];
      setWaitingList(prevWaitingList => prevWaitingList.slice(1));
  
      // Add the waiting list entry as a new booking
      setBookings(prevBookings => [
        ...prevBookings,
        {
          id: Date.now(),
          timestamp: new Date().toLocaleString(),
        }
      ]);
    } else {
      // If no one is in the waiting list, increase the available slots
      setAvailableSlots(prevSlots => prevSlots + 1);
    }
  };
  
  const joinWaitingList = (name: string) => {
    const newEntry = { id: Date.now(), name };
    setWaitingList([...waitingList, newEntry]);
  };

  const reset = () => {
    setAvailableSlots(totalSlots);
    setBookings([]);
    setWaitingList([]);
  };

  return {
    availableSlots,
    bookings,
    waitingList,
    bookSlot,
    cancelBooking,
    joinWaitingList,
    reset
  };
};

export default useEventBooking;
