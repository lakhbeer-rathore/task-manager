# Full Stack Task Manager

A full-stack Task Manager application built using the MERN stack with JWT authentication and protected routes.

## Features

- User Signup
- User Login
- JWT Authentication
- HTTP Only Cookies
- Protected Dashboard
- Create Tasks
- View Tasks
- Update Tasks
- Delete Tasks
- Logout Functionality
- Responsive and Clean UI

## Tech Stack

### Frontend
- React.js
- Axios
- React Router DOM
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt

## Project Structure

```text
Task Manager
│
├── Backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── package.json
│   └── ...
│
├── Frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── ...
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/task-manager.git
```

### Backend Setup

```bash
cd Backend
npm install
npm start
```

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside Backend folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

## Future Improvements

- Task completion status
- Pagination
- Search and Filtering
- Dark Mode
- Due Dates and Reminders



