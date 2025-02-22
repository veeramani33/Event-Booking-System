# 🎉 MERN Event Booking System  

This is a fully functional **Event Booking System** built using the MERN stack with React (TypeScript, Tailwind CSS), Node.js, Express, and MongoDB. It allows users to **book event slots**, manage **waiting lists**, and receive **real-time notifications**.  

---

## ✨ Features  
- **Book Event Slots:** Users can book available slots for events with real-time updates.  
- **Waiting List Management:** Users can join a waiting list when slots are full and are automatically booked when slots become available.  
- **Dynamic Notifications:** Real-time notifications for booking confirmation, waiting list updates, and cancellations.  
- **Responsive UI:** Fully responsive design using Tailwind CSS.  
- **Custom State Management:** Efficient state handling with custom hooks and localStorage.  
- **Comprehensive Testing:** Unit tests using Jest and React Testing Library for reliable component and hook testing.  

---

## 📸 Demo  

To experience the app locally:  
1. **Clone the repository** and follow the setup instructions below.  
2. **Start the development server** with:  
    ```bash
    npm start
    ```
3. **Access the App** at `http://localhost:3000`.  
4. **Interact with the App:**  
    - Book event slots.  
    - Join the waiting list when slots are full.  
    - Observe real-time notifications for booking confirmations and waiting list updates.  

---

## ⚙️ Setup Instructions  

### 1. Clone the Repository 
```bash
git clone https://github.com/veeramani33/Event-Booking-System.git
cd Event-Booking-System

### 2. Install Dependencies
    npm install

### 3. Environment Variables
    Create a .env file in the root directory and add the following:
    REACT_APP_TOTAL_SLOTS=10
    REACT_APP_API_URL=http://localhost:5000

### 4. Start the Development Server
    npm start
    The app will be accessible at http://localhost:3000.

🎨 State Management Approach
    Custom Hooks: Efficient state management using custom hooks for bookings, waiting lists, and notifications.
    Local Storage Integration: State persistence using localStorage, ensuring data is retained on page refresh.
    Efficient Re-renders: Utilizes React’s useState() and useEffect() for state changes and syncing with localStorage.
    Framer Motion: Smooth animations for notifications using Framer Motion's AnimatePresence and motion.div.

🧪 Testing Instructions
    ### 1. Run Unit Tests:
    npm test
    ### 2. Watch Mode:
    npm test -- --watch

Jest and React Testing Library are used for unit tests.
Tests cover:
    Custom hooks for state management.
    Component interactions and DOM updates.
    Notification rendering and removal.

⚒️ Technologies Used
    Frontend: React (TypeScript), Tailwind CSS, Framer Motion
    Backend: Node.js, Express, MongoDB
    State Management: Custom Hooks with useState() and useEffect()
    Testing: Jest, React Testing Library

🔥 Key Learnings
    Efficient state management using custom hooks.
    Advanced animations with Framer Motion for dynamic UI interactions.
    Writing robust unit tests with Jest and React Testing Library.
    Managing conditional rendering and asynchronous state updates in React.

🚀 Future Enhancements
    User Authentication: Implement authentication for secure bookings.
    Admin Dashboard: For event organizers to manage bookings and waiting lists.
    Email Notifications: Integrate email notifications for booking confirmations.
    Payment Integration: Support for payment gateways for paid events.
