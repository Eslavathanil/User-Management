# User Management System

A full-stack application for managing users with CRUD operations, manager assignment, validations, and MongoDB integration. Built with a clean architecture and modern React frontend.

## 📌 Project Overview

* Provides REST APIs to create, read, update, and delete users.
* Each user is linked to a manager and validated before saving.
* Backend handles logging, validation, error handling, and database operations.
* Frontend built with React allows smooth interaction with APIs.

## 🚀 Technologies Used

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* UUID
* dotenv
* Nodemon

### Frontend

* React (Vite + TypeScript)
* Tailwind CSS
* Axios

## 📁 Folder Structure

### Backend

```
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
```

### Frontend

```
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
```

## 🗄️ MongoDB Schema

### Users Collection

```json
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
```

### Managers Collection

```json
{
  "manager_id": "UUID v4",
  "name": "String",
  "email": "String",
  "is_active": true,
  "created_at": "Date"
}
```

Seed script generates sample managers.

## ⚙️ Backend Setup

### 1️⃣ Install dependencies

```bash
cd backend
npm install
```

### 2️⃣ Setup environment

```bash
cp .env.example .env
```

Example `.env`:

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/user_management_dev
LOG_LEVEL=debug
```

### 3️⃣ Start MongoDB

* Local MongoDB: `mongod`
* MongoDB Atlas: paste cloud URI into `.env`

### 4️⃣ Seed sample managers

```bash
npm run seed
```

### 5️⃣ Start backend server

```bash
npm run dev
```

Backend runs at: [http://localhost:5000](http://localhost:5000)

## 🖥️ Frontend Setup

### 1️⃣ Install dependencies

```bash
cd frontend
npm install
```

### 2️⃣ Start development server

```bash
npm run dev
```

Frontend runs at: [http://localhost:5173](http://localhost:5173)

## 🔄 Architecture Flow
## Preview

![FLOW](https://res.cloudinary.com/dwoeq9kih/image/upload/v1764508239/ChatGPT_Image_Nov_30_2025_06_00_04_PM_emlwtj.png)


Features:

* Request logging
* Centralized validation
* Error-handling middleware
* Manager relationship validation

## 🛠 Git Commands to Push Project

1️⃣ Initialize Git:

```bash
git init -b main
```

2️⃣ Add files:

```bash
git add .
```

3️⃣ Commit:

```bash
git commit -m "Initial commit"
```

4️⃣ Add remote repository:

```bash
git remote add origin https://github.com/Eslavathanil/User-Management.git
```

5️⃣ Push code:

```bash
git push -u origin main
```

> ⚠ If branch is `master` instead of `main`, use `git push -u origin master`.

## 🚢 Deployment Flow

### Backend

```bash
NODE_ENV=production
npm install -g pm2
pm2 start server.js --name user-api
```

Use MongoDB Atlas for production.

### Frontend

```bash
npm run build
```

Deploy `/dist` folder to:

* Netlify
* Vercel

## 📝 License

MIT License
