## User Management System

A full-stack application for managing users with CRUD operations, manager assignment, validation, and MongoDB integration. Built with a clean architecture and a modern React frontend.

## 📌 Project Overview

This system provides REST APIs to create, read, update, and delete user records.
Each user is linked to a manager, validated, and stored securely in MongoDB.
The React frontend offers a simple and interactive UI to use the APIs.

## 🚀 Technologies Used
### Backend

Node.js

Express.js

MongoDB + Mongoose

UUID

dotenv

Nodemon

### Frontend

React (Vite + TypeScript)

Tailwind CSS

shadcn-ui

Axios

## 📁 Project Structure
### Backend
backend/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── scripts/
├── logs/
├── .env.example
└── server.js

### Frontend
frontend/
├── src/
│   ├── api/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── lib/
│   └── main.tsx
├── index.html
└── package.json

## 🗄️ MongoDB Schema Details
### Users Collection
{
  "user_id": "UUID v4",
  "full_name": "String",
  "mob_num": "10-digit mobile",
  "pan_num": "ABCDE1234F",
  "manager_id": "UUID",
  "is_active": true,
  "created_at": "Date",
  "updated_at": "Date"
}

### Managers Collection
{
  "manager_id": "UUID v4",
  "name": "String",
  "email": "String",
  "is_active": true,
  "created_at": "Date"
}


Seed script generates sample managers.

## ⚙️ Backend Installation & Running
### 1. Install dependencies
cd backend
npm install

### 2. Setup environment
cp .env.example .env


Example:

NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/user_management_dev
LOG_LEVEL=debug

### 3. Start MongoDB

Use local MongoDB or Atlas.

### 4. Seed managers
npm run seed

### 5. Start backend
npm run dev


Runs at:
👉 http://localhost:5000

## 🖥️ Frontend Installation & Running
cd frontend
npm install
npm run dev


Runs at:
👉 http://localhost:5173

## 🔄 Architecture Flow
React Frontend
      ↓
Axios Requests
      ↓
Express Backend
      ↓
Controllers
      ↓
Validation Utilities
      ↓
MongoDB (Mongoose)


Features:

Clean architecture

Centralized validation

Error-handling middleware

Manager relationship validation

Request logging

## 🚢 Deployment Flow
### Backend
NODE_ENV=production
npm install -g pm2
pm2 start server.js --name user-api


Use MongoDB Atlas for production.

### Frontend
npm run build


Deploy /dist to:

Netlify

Vercel

AWS S3

Nginx

## 📝 License

MIT License
