Anyware Fullstack Task

This project is a full-stack application for managing student quizzes and announcements for the current semester. It includes a React + Redux + TypeScript frontend and an Express.js + MongoDB backend, following best practices and clean architecture.

Features:
Frontend (React + Redux Toolkit + TypeScript + Vite)

Authentication Simulation:

Login/Logout without username or password.

Uses a Higher Order Component (HOC) requireAuth to protect routes.

Dashboard for Logged-in Users:

Displays Quizzes and Announcements.

Responsive Design:

Fits all screen sizes.

Material UI for Components.

Sidebar Hover Effect:

Links change background and text color on hover.

Internationalization (i18n) Support:

Prepared for translations using react-i18next with en and ar locales.

Reusable Components:

Layout (Sidebar, Topbar) and common UI components.

Unit and Integration Tests with Jest + React Testing Library.

Backend (Express.js + TypeScript + MongoDB)

REST API for Quizzes and Announcements:

CRUD operations for both entities.

Middleware:

Authentication, Error handling.

Validation using zod.

MongoDB with Mongoose for data persistence.

Seeding Script for sample data.

Tests with Jest + Supertest.


Tech Stack:

Frontend:

React 18, Redux Toolkit, TypeScript

Vite (bundler)

Material UI

React Router

i18next (internationalization)

Jest + React Testing Library

Backend:

Node.js, Express.js (TypeScript)

MongoDB (via Mongoose)

zod (validation)

Jest + Supertest (testing)


Project Structure:
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


Installation & Setup:

1. Clone the Repository
git clone https://github.com/your-username/anyware-fullstack.git
cd anyware-fullstack

2. Backend Setup (server)
cd server
npm install


Create a .env file in server/:

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/anyware
JWT_SECRET=your_jwt_secret


Run the server in development mode:

npm run dev

3. Frontend Setup (client)
cd ../client
npm install
npm run dev

4. Run with Docker

Ensure Docker and Docker Compose are installed, then run:

docker-compose up -d

API Endpoints:
Announcements

GET /api/announcements - Get all announcements

POST /api/announcements - Create announcement

PUT /api/announcements/:id - Update announcement

DELETE /api/announcements/:id - Delete announcement

Quizzes

GET /api/quizzes - Get all quizzes

POST /api/quizzes - Create quiz

PUT /api/quizzes/:id - Update quiz

DELETE /api/quizzes/:id - Delete quiz


Testing:

Backend Tests:

cd server
npm test


Frontend Tests:

cd client
npm test

Notes:

Material UI is used for UI components.

i18n is prepared for future translations.

Authentication is simulated without credentials.

All business rules are implemented according to the project spec.