## User Management System

A full-stack application for managing users with complete CRUD operations, manager assignment, PAN/mobile validations, and MongoDB integration. Designed with clean architecture, reusable modules, and environment-based configuration.

## 📌 Project Overview

This system provides four RESTful API endpoints to create, retrieve, update, and delete user records. Each user is associated with a manager, validated before entry. The backend handles validation, error management, logging, and database operations.
A React frontend allows easy interaction with the APIs.

## 🚀 Technologies Used
# Backend

Node.js

Runs JavaScript on the server to build backend applications.

Express.js

Simplifies API creation with clean routing, middleware, and request handling.

MongoDB + Mongoose

MongoDB → Database
Mongoose → Schema-based tool to interact with MongoDB easily and safely.

UUID

Generates unique IDs (user_id, manager_id) for reliable identification.

dotenv

Loads environment variables (DB URI, PORT) from a .env file securely.

Nodemon

Auto-restarts the server whenever you change code during development.



# Frontend

React (Vite + TypeScript)
Builds fast, interactive UI.

Tailwind CSS

Utility-first CSS framework for rapid, modern, responsive UI design.

shadcn-ui

Pre-built, customizable, beautiful UI components that speed up development.

Axios

Used to send API requests from the frontend to the backend easily and reliably

## 📁 Project Structure
# Backend Folder Structure
backend/
├── config/            # MongoDB connection
├── controllers/       # Business logic for APIs
├── middlewares/       # Error handling middleware
├── models/            # Mongoose schemas (User, Manager)
├── routes/            # API routing files
├── utils/             # Logging + validation utilities
├── scripts/           # Manager seeding script
├── logs/              # Auto-generated logs
├── .env.example       # Environment variables template
└── server.js          # Main server entry point

Frontend Folder Structure
frontend/
├── src/
│   ├── api/           # API services (axios)
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # App screens
│   ├── lib/           # Utility helpers
│   └── main.tsx       # React app entry point
├── index.html
└── package.json

# 🗄️ MongoDB Schema Details
Users Collection
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

Managers Collection
{
  "manager_id": "UUID v4",
  "name": "String",
  "email": "String",
  "is_active": true,
  "created_at": "Date"
}


Seed script generates sample managers.

## ⚙️ Backend Installation & Running
1. Install dependencies
cd backend
npm install

2. Setup environment file

cp .env.example .env

NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/user_management_dev
LOG_LEVEL=debug

3. Start MongoDB

MongoDB Atlas (cloud):
Paste cloud URI in .env

4. Seed Sample Managers
npm run seed

5. Start backend server
npm run dev


Runs at:

http://localhost:5000

## 🖥️ Frontend Installation & Running
cd frontend
npm install
npm run dev


Runs at:

http://localhost:5173

## 🔄 Architecture Flow
React Frontend
      ↓
Axios API Calls
      ↓
Express Backend Routes
      ↓
Controllers (Business Logic)
      ↓
Validation Utilities
      ↓
MongoDB (Mongoose Models)


Logging for every request

Centralized validation

Error-handler middleware

Manager relationship validation

## 🚢 Deployment Flow
Backend Deployment

Set environment:

NODE_ENV=production


Use MongoDB Atlas

Install PM2:

npm install -g pm2


Run production service:

pm2 start server.js --name user-api

Frontend Deployment

Build:

npm run build


Deploy /dist folder to:

Netlify

Vercel

AWS S3

Nginx server

📝 License

MIT License