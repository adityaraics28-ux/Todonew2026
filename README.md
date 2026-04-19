# Aditya rai TaskFlow - MERN Todo App

A full-stack Todo application built with the MERN stack (MongoDB, Express, React, Node.js). This project features a premium dark-mode UI, real-time updates, and persistent storage in the cloud.

## 🚀 Tech Stack

- **Frontend**: React.js with Vite
- **Backend**: Node.js & Express
- **Database**: MongoDB Atlas (Cloud)
- **Styling**: Vanilla CSS (Custom Design)
- **API**: RESTful API with Axios

## 📂 Project Structure

- `backend/`: Node.js/Express server and Mongoose models.
- `frontend/`: React frontend and styling.

## 🛠️ Installation & Setup

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account

### 2. Configuration
Create a `.env` file in the `backend/` directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5001
```

### 3. Run the Backend
```bash
cd backend
npm install
npm start
```

### 4. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Deployment (Render)

### Backend
1. Create a new **Web Service**.
2. Set the Root Directory to `backend`.
3. Set the Build Command to `npm install`.
4. Set the Start Command to `node server.js`.
5. Add Environment Variables: `MONGO_URI` and `PORT`.

### Frontend
1. Create a new **Static Site**.
2. Set the Root Directory to `frontend`.
3. Set the Build Command to `npm run build`.
4. Set the Publish Directory to `dist`.
5. Add an Environment Variable `VITE_API_URL` set to your **Backend Service URL** (e.g., `https://aditya2025-to-do-1-backend.onrender.com`).

## ✨ Features
- Add, Edit, and Delete tasks.
- Double-click a task to edit.
- Automatic completion toggling.
- Responsive design for mobile and desktop.
