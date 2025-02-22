import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EventBooking from './EventBooking';
import '@testing-library/jest-dom';
import useEventBooking from '../hooks/useEventBooking';


// Mocking the custom hook
jest.mock('../hooks/useEventBooking');

// Helper function to mock the hook
const mockUseEventBooking = (overrides = {}) => {
    (useEventBooking as jest.Mock).mockReturnValue({
      availableSlots: 10,
      bookings: [],
      waitingList: [],
      bookSlot: jest.fn().mockImplementation(() => {
        setTimeout(() => {
          const event = new Event('stateChange');
          window.dispatchEvent(event);
        }, 100);  
        return { success: true, message: 'Booking Confirmed! 🎉' };
      }),
      cancelBooking: jest.fn(),
      joinWaitingList: jest.fn(),
      reset: jest.fn(),
      ...overrides,  
    });
  };
  

describe('EventBooking Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();  
  });

  test('renders the component correctly', () => {
    mockUseEventBooking();  
    render(<EventBooking />);
    expect(screen.getByText('React Workshop')).toBeInTheDocument();
    expect(screen.getByText('10 spots left')).toBeInTheDocument();
  });

  test('books a slot when "Book Now" is clicked', async () => {
    mockUseEventBooking();  
    render(<EventBooking />);
    const bookButton = screen.getByText('Book Now');
    fireEvent.click(bookButton);
    
    await waitFor(() => {
        window.addEventListener('forceRender', () => {
          const notification = screen.queryByTestId('notification');
          console.log('Notification in waitFor:', notification);  
          expect(notification).toBeInTheDocument();
        });
      }, { timeout: 10000 });      
      
  });

  test('shows confirmation modal when "Cancel" is clicked', async () => {
    // Override the state for this test
    mockUseEventBooking({
      availableSlots: 10,
      bookings: [{ id: 1, timestamp: '2025-02-22 10:00' }]
    });

    render(<EventBooking />);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.getByText('Are you sure you want to cancel this booking?')).toBeInTheDocument();
    });
    
    await waitFor(() => {
        window.addEventListener('forceRender', () => {
          const notification = screen.queryByTestId('notification');
          console.log('Notification in waitFor:', notification);  
          expect(notification).toBeInTheDocument();
        });
      }, { timeout: 10000 });
    
  });

  test('joins the waiting list when name is entered and "Join Waiting List" is clicked', async () => {
    mockUseEventBooking({ availableSlots: 0 }); // No slots available

    render(<EventBooking />);
    fireEvent.change(screen.getByPlaceholderText(/enter your name/i), { target: { value: 'John Doe' } });
    const joinButton = screen.getByText('Join Waiting List');
    fireEvent.click(joinButton);

    await waitFor(() => {
        window.addEventListener('forceRender', () => {
          const notification = screen.queryByTestId('notification');
          console.log('Notification in waitFor:', notification);  
          expect(notification).toBeInTheDocument();
        });
      }, { timeout: 10000 });
     
  });
});
