# TravelMate ✈️🏨  

A full-stack MERN application for booking flights and hotels.

TravelMate lets users search flights, search hotels, create bookings, view their profile, update profile details, and manage their bookings — all with secure authentication using JWT and cookies.

---

## 🚀 Features

### 🔐 Authentication
- JWT-based login & registration  
- Refresh token system for seamless authentication  
- HTTP-only cookies for secure session management  
- User stays logged in even after refreshing the page  

### ✈️ Flights
- Search flights by **from**, **to**, and **date**  
- View flight details  
- Book flights  
- Cancel bookings  

### 🏨 Hotels
- Search hotels by **city**  
- View hotel details  
- Book hotels  
- Cancel bookings  

### 👤 Profile Dashboard
- View personal profile  
- Update email, username, or password  
- View all bookings (flights + hotels combined)  
- Delete bookings  
- Smooth UI with Tailwind CSS  

---

## 🛠 Tech Stack

### Frontend
- React  
- Tailwind CSS  
- Axios  
- React Router  

### Backend
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JSON Web Tokens (JWT)  
- HTTP-only cookies for secure refresh token handling  

---

## 📁 Project Structure

/backend  
/frontend  

---

## ⚙️ Installation & Setup

Clone the repository:

git clone <https://github.com/ArshadShaik07/Holiday-Booking-Site.git>

cd <Holiday-Booking-Site>

🔹 **Backend Setup**

cd backend

npm install

npm start

Create a `.env` file with:

MONGO_URI=your_mongodb_url

JWT_SECRET=your_secret

REFRESH_SECRET=your_refresh_token_secret

PORT=3000

🔹 **Frontend Setup**

cd frontend

npm install

npm run dev

The frontend will run on http://localhost:5173/  
The backend will run on http://localhost:3000/

---

## 📌 Future Improvements

- Payment integration  
- Sorting + filtering on listings  
- Booking history with "cancelled" status  
- Admin dashboard for hotel/flight management
