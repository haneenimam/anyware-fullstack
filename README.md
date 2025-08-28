📚 Anyware Fullstack Task

A full-stack application for managing student quizzes and announcements for the current semester.
Built with React + Redux + TypeScript for the frontend and Express.js + MongoDB for the backend.

✅ Features
Frontend (React + Redux Toolkit + TypeScript + Vite)

Authentication Simulation

Login/Logout without username or password.

Protected routes using a Higher Order Component (requireAuth).

Dashboard for Logged-in Users

Displays Quizzes and Announcements.

Responsive Design

Fits all screen sizes (mobile → desktop).

Material UI Components

Sidebar Hover Effect

Links change background & text color on hover.

Internationalization (i18n)

Prepared for translations using react-i18next (English + Arabic).

Reusable Components

Layout (Sidebar, Topbar) and common UI components.

Tests

Unit & integration tests using Jest + React Testing Library.

Backend (Express.js + TypeScript + MongoDB)

REST API for Quizzes and Announcements

Full CRUD for both entities.

Middleware

Authentication (simulated), Error handling.

Validation

Using zod for request validation.

Database

MongoDB with Mongoose for persistence.

Seeding Script

Populate sample data.

Tests

API tests using Jest + Supertest.

🛠 Tech Stack
Frontend

React 18

Redux Toolkit

TypeScript

Vite

Material UI

React Router

i18next

Jest + React Testing Library

Backend

Node.js + Express.js (TypeScript)

MongoDB (Mongoose)

Zod (validation)

Jest + Supertest

## 📂 Project Structure

anyware-fullstack/
│
├── README.md
├── docker-compose.yml
├── .editorconfig
├── .gitignore
│
├── server/
│   ├── package.json
│   ├── tsconfig.json
│   ├── jest.config.js
│   ├── src/
│   │   ├── app.ts
│   │   ├── index.ts
│   │   ├── db.ts
│   │   ├── utils/http.ts
│   │   ├── middleware/
│   │   │   ├── error.ts
│   │   │   └── auth.ts
│   │   ├── validators/
│   │   │   ├── announcement.ts
│   │   │   └── quiz.ts
│   │   ├── models/
│   │   │   ├── Announcement.ts
│   │   │   └── Quiz.ts
│   │   ├── controllers/
│   │   │   ├── announcement.controller.ts
│   │   │   └── quiz.controller.ts
│   │   ├── routes/
│   │   │   ├── announcement.routes.ts
│   │   │   ├── quiz.routes.ts
│   │   │   └── auth.routes.ts
│   │   └── seed.ts
│   └── tests/
│       ├── announcements.spec.ts
│       └── quizzes.spec.ts
│
└── client/
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── app/
        │   ├── store.ts
        │   └── api.ts
        ├── features/
        │   ├── auth/authSlice.ts
        │   ├── announcements/announcements.api.ts
        │   └── quizzes/quizzes.api.ts
        ├── hoc/requireAuth.tsx
        ├── i18n/
        │   ├── i18n.ts
        │   └── locales/
        │       ├── en.json
        │       └── ar.json
        ├── components/
        │   ├── Layout/
        │   │   ├── Sidebar.tsx
        │   │   └── Topbar.tsx
        │   └── common/EmptyState.tsx
        ├── pages/
        │   ├── Home.tsx
        │   ├── Dashboard.tsx
        │   ├── AnnouncementsPage.tsx
        │   └── QuizzesPage.tsx
        ├── styles/theme.ts
        └── tests/requireAuth.test.tsx

🚀 Installation & Setup
1. Clone the Repository
git clone https://github.com/<your-username>/anyware-fullstack.git
cd anyware-fullstack

2. Backend Setup (server/)
cd server
npm install


Create .env in server/:

PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/anyware
JWT_SECRET=your_jwt_secret


Run the server in development:

npm run dev

3. Frontend Setup (client/)
cd ../client
npm install
npm run dev

4. Run with Docker
docker-compose up -d

📡 API Endpoints
Announcements

GET /api/announcements → Get all announcements

POST /api/announcements → Create announcement

PUT /api/announcements/:id → Update announcement

DELETE /api/announcements/:id → Delete announcement

Quizzes

GET /api/quizzes → Get all quizzes

POST /api/quizzes → Create quiz

PUT /api/quizzes/:id → Update quiz

DELETE /api/quizzes/:id → Delete quiz

🧪 Testing
Backend Tests
cd server
npm test

Frontend Tests
cd client
npm test

📌 Notes

Material UI for UI components.

i18n ready with English and Arabic (RTL support).

Authentication is simulated (no credentials required).

All business rules implemented per project spec.