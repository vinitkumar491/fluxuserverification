# FLUX User Verification System

A full-stack MERN application that verifies user details using **React (Vite)**, **Node.js**, **Express.js**, and **MongoDB Atlas**.

## 🚀 Features

- User verification using:
  - Name
  - Email
  - Mobile Number
- React + TypeScript frontend
- Express.js REST API
- MongoDB Atlas database
- Axios API integration
- Environment variable support
- Responsive UI
- Input validation
- Clean project architecture

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Axios

### Backend

- Node.js
- Express.js
- Mongoose
- MongoDB Atlas

---

## 📁 Project Structure

```
FLUX-Project
│
├── src
│   ├── api
│   │   └── axios.ts
│   │
│   ├── services
│   │   └── userService.ts
│   │
│   ├── components
│   │   └── Verifydetail.tsx
│   │
│   └── App.tsx
│
├── server
│   ├── config
│   │   └── db.js
│   │
│   ├── controller
│   │   └── userController.js
│   │
│   ├── model
│   │   └── User.js
│   │
│   ├── routes
│   │   └── userRoutes.js
│   │
│   ├── server.js
│   └── .env
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/vinitkumar491/fluxuserverification.git
```

Go into the project

```bash
cd fluxuserverification
```

---

## Backend Setup

Go to server folder

```bash
cd server
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=your_mongodb_atlas_connection_string
```

Run backend

```bash
npm run dev
```

Backend runs at

```
http://localhost:5000
```

---

## Frontend Setup

Go to project root

```bash
cd ..
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

## API Endpoints

### Verify User

**POST**

```
/api/users/verify
```

### Request Body

```json
{
  "name": "Vinit Kumar",
  "email": "example@gmail.com",
  "phone": 9999999999
}
```

### Success Response

```json
{
  "success": true,
  "message": "User verified",
  "user": {
    "_id": "...",
    "name": "Vinit Kumar",
    "email": "example@gmail.com",
    "phone": 9999999999
  }
}
```

### Failed Response

```json
{
  "success": false,
  "message": "User not found"
}
```

---

## Author

**Vinit Kumar**

GitHub:
https://github.com/vinitkumar491

---

## License

This project is licensed under the MIT License.
