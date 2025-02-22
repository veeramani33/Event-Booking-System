import { renderHook, act } from '@testing-library/react';
import useEventBooking from './useEventBooking';

describe('useEventBooking Hook', () => {
  beforeEach(() => {
    // Clear localStorage before each test to ensure clean state
    localStorage.clear();
  });

  test('books a slot successfully', () => {
    const { result } = renderHook(() => useEventBooking());
    
    // Initial state check
    expect(result.current.availableSlots).toBe(10);  

    // Act: Perform the booking
    act(() => {
      result.current.bookSlot();
    });

    // Assert: Check if booking was successful
    expect(result.current.bookings.length).toBe(1);   
    expect(result.current.availableSlots).toBe(9);  
  });

  test('adds to waiting list when slots are full', () => {
    const { result } = renderHook(() => useEventBooking());

    // Mocking full slots
    act(() => {
      for (let i = 0; i < 10; i++) {
        result.current.bookSlot();
      }
    });

    act(() => {
      result.current.joinWaitingList('John Doe');
    });

    // Assert: Check if added to waiting list
    expect(result.current.waitingList.length).toBe(1);
    expect(result.current.waitingList[0].name).toBe('John Doe');
  });

  test('cancels a booking and moves the waiting list up', () => {
    const { result } = renderHook(() => useEventBooking());

    act(() => {
      result.current.bookSlot();                     
      result.current.joinWaitingList('John Doe');     
    });

    expect(result.current.bookings.length).toBe(1);   
    expect(result.current.waitingList.length).toBe(1); 

    act(() => {
      result.current.cancelBooking(result.current.bookings[0].id);
    });

    // Assert: Waiting list should be promoted to booking
    expect(result.current.bookings.length).toBe(1);   
    expect(result.current.waitingList.length).toBe(0); 
    expect(result.current.bookings[0].timestamp).toBeDefined(); 
  });
});
