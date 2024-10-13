# Attendance Backend

This project is a **RESTful API** built with **Express.js** to manage user attendance. It provides authentication, user management, attendance tracking, and utilizes JWT tokens for secure login. The application supports **PostgreSQL** databases and is containerized using **Docker**.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [Environment Variables](#environment-variables)
- [Database Management](#database-management)
  - [Running Migrations](#running-migrations)
  - [Rolling Back Migrations](#rolling-back-migrations)
  - [Seeding the Database](#seeding-the-database)
  - [Resetting the Database](#resetting-the-database)
- [Running the Application](#running-the-application)
  - [Using npm](#using-npm)
  - [Using Docker](#using-docker)
- [API Endpoints](#api-endpoints)
- [Tech Stack](#tech-stack)
- [Security Considerations](#security-considerations)
- [Future Improvements](#future-improvements)
- [Contact Information](#contact-information)
- [License](#license)

---

## Features

- **User Authentication**: Login, registration, and token-based authentication using JWT.
- **Attendance Tracking**: APIs for creating, reading, and managing attendance logs.
- **Role-Based Routes**: Protects routes with role-based access control.
- **Database Migrations and Seeding**: Manages schema changes and populates the database with initial data.
- **Error Handling Middleware**: Centralized error handling with structured responses.
- **Security Headers**: Adds Helmet for basic security headers.

---

## Project Structure

```
.github/workflows/        # CI/CD configuration (GitHub Actions)
node_modules/             # Node dependencies
src/
├── config/               # Configuration files (JWT, Passport, DB)
│   ├── database.ts
│   ├── index.ts
│   ├── jwt.ts
│   └── passport.ts
├── controllers/          # Controllers to handle API requests
│   ├── AttendanceController.ts
│   ├── AuthController.ts
│   └── UserController.ts
├── middlewares/          # Custom middleware for authentication and error handling
│   ├── auth.ts
│   ├── errorHandler.ts
│   ├── responseHandler.ts
│   └── validate.ts
├── migrations/           # Knex migration files for DB schema
│   ├── 20241012064728_create_users_table.ts
│   └── 20241012162743_create_attendances_table.ts
├── models/               # TypeScript models for data structures
│   ├── Attendances.d.ts
│   ├── Base.d.ts
│   └── Users.d.ts
├── repositories/         # Repositories for database queries
│   ├── AttendanceRepository.ts
│   └── UserRepository.ts
├── routes/               # API routes (auth, user, attendance)
│   ├── AttendanceRoute.ts
│   ├── AuthRoute.ts
│   └── UserRoute.ts
├── seeds/                # Seeder scripts for populating the database
│   └── seed.ts
├── services/             # Business logic services
│   ├── AttendanceService.ts
│   ├── AuthService.ts
│   └── UserService.ts
├── types/                # TypeScript type definitions
│   └── express/
│       └── index.d.ts
├── utils/                # Utility functions (image handling, messages)
│   ├── imageSeeder.ts
│   └── message.ts
├── validators/           # Request validation logic
│   ├── AttendanceValidator.ts
│   ├── AuthValidator.ts
│   └── UserValidator.ts
├── app.ts                # Configures the Express app
└── server.ts             # Server entry point

Dockerfile                # Docker image configuration
docker-compose.yml        # Docker Compose configuration
knexfile.ts               # Knex configuration
.env.example              # Example environment variables
package.json              # Project dependencies and scripts
tsconfig.json             # TypeScript configuration
```

---

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v14+)
- npm or yarn
- MySQL or PostgreSQL database
- Docker (if running with Docker)

### Steps

1. Clone the Repository:

   ```bash
   git clone https://github.com/your-repo/attendance-backend.git
   cd attendance-backend
   ```

2. Install Dependencies:

   ```bash
   npm install
   ```

3. Set Up Environment Variables:

   Create a `.env.local` file in the root directory and fill in your configuration:

   ```
   NODE_ENV=development
   API_PORT=8000

   DB_HOST=your-db-host
   DB_PORT=your-db-port
   DB_USER=your-db-user
   DB_PASS=your-db-pass
   DB_NAME=your-db-name

   JWT_ACCESS_SECRET=your-access-secret
   JWT_REFRESH_SECRET=your-refresh-secret
   JWT_EXPIRES_IN=7d
   JWT_REFRESH_EXPIRES_IN=30d
   ```

4. Run Database Migrations and Seeds:

   ```bash
   npm run migrate
   npm run seed
   ```

5. Run the application:

   ```bash
   npm run dev
   ```

---

## Database Management

### Running Migrations:

```bash
npm run migrate
```

### Rolling Back Migrations:

```bash
npm run migrate:rollback
```

### Seeding the Database:

```bash
npm run seed
```

### Resetting the Database:

```bash
npm run reset-db
```

This command will:

1. Roll back all migrations.
2. Reapply all migrations.
3. Seed the database with initial data.

---

## Running the Application

### Using npm:

1. **Development Mode:**

   ```bash
   npm run dev
   ```

2. **Production Mode:**

   First, build the TypeScript code:

   ```bash
   npm run build
   ```

   Then, start the production server:

   ```bash
   npm start
   ```

### Using Docker:

Ensure Docker is installed and running. Use the following commands to build and start the application using **Docker Compose**:

1. **Development Mode:**

   ```bash
   docker-compose --profile dev up --build
   ```

2. **Production Mode:**

   ```bash
   docker-compose --profile prod up --build
   ```

   The server will be available at [http://localhost:8000](http://localhost:8000).

---

## API Endpoints

Here is a quick overview of the main API endpoints:

- **Auth Routes:**  
  **POST** `/auth/login`: User login.  
  **POST** `/auth/register`: User registration.

- **User Routes:**  
  **GET** `/user/profile`: Get all users.  
  **PATCH** `/user/profile`: Update user profile.
  **PATCH** `/user/password`: Change user password.

- **Attendance Routes:**  
  **GET** `/attendance`: Get all attendance logs. Support for filtering by `name`, `email`, and `created_at`  
  **GET** `/attendance/:id`: Get details of a specific attendance.
  **POST** `/attendance`: Create record attendance log.

---

## Tech Stack

- **Backend**: Express.js
- **Database**: PostgreSQL
- **Authentication**: Passport.js with JWT strategy
- **ORM**: Knex.js for SQL query building
- **Containerization**: Docker & Docker Compose
- **TypeScript**: Type-safe development

---

## Security Considerations

- **JWT Authentication**: Secures APIs with access and refresh tokens.
- **Password Hashing**: User passwords are hashed using bcrypt.
- **CORS Protection**: Configured using the cors package.
- **Security Headers**: Added with helmet.
- **Environment Variables**: Sensitive information is stored in .env files and never committed to version control.

---

## Future Improvements

- **Rate Limiting**: Add rate limiting to prevent abuse.
- **Swagger Documentation**: Provide detailed API documentation using Swagger.
- **PWA Integration**: Consider turning this into a backend for a PWA.
- **Monitoring**: Add logging and monitoring for production.

---

## Contact Information

For inquiries or support, feel free to contact:

- Email: daffakurniaf11@gmail.com
- WhatsApp: [+6285156317473](https://wa.me/6285156317473)
- LinkedIn: [Daffa Kurnia Fatah](https://www.linkedin.com/in/daffakurniafatah/)
- Portfolio: [dafkur.com](https://dafkur.com)

---
