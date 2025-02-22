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

