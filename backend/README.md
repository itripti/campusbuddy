# Node.js/Express Authentication Backend API

A secure, modern authentication backend built with Node.js, Express, and MongoDB. It implements user registration, login, input validation, password hashing, and route protection using JSON Web Tokens (JWT).

## Tech Stack

* **Runtime**: [Node.js](https://nodejs.org/) (ES Modules, Node 18+)
* **Framework**: [Express.js](https://expressjs.com/)
* **Database**: [MongoDB](https://www.mongodb.com/) (using [Mongoose ODM](https://mongoosejs.com/))
* **Security**: [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) (JWT) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
* **Validation**: [express-validator](https://express-validator.github.io/docs/)

---

## Getting Started

### Prerequisites

* **Node.js** (v18.x or higher)
* **MongoDB**: A running local MongoDB instance (e.g. `mongodb://localhost:27017`) or a MongoDB Atlas connection string.
  * *Tip (Docker)*: You can quickly spin up a local instance using Docker:
    ```bash
    docker run -d -p 27017:27017 --name local-mongo mongo:latest
    ```

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Copy the `.env.example` file to create your local `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` to configure your settings:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/auth_db
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=1h
   ```

---

## Running the Server

### Development Mode (with hot-reloading)
Runs the server using `nodemon` which automatically restarts on code changes:
```bash
npm run dev
```

### Production Mode
Runs the server with standard Node:
```bash
npm start
```

---

## Verification & Testing

The backend includes a custom automated integration test script (`test-api.js`) that:
1. Spawns the server locally.
2. Clears residual test users from the database.
3. Tests the entire signup, validation, duplicate user checking, login, credentials checking, and JWT route authorization flow.
4. Cleans up test DB entries.
5. Shuts down the server and database connections.

To run the automated tests, ensure your MongoDB server is running, then run:
```bash
npm test
```

---

## API Endpoints Reference

### 1. User Signup
* **Endpoint**: `POST /api/auth/signup`
* **Access**: Public
* **Request Body**:
  ```json
  {
    "username": "johndoe",
    "email": "johndoe@example.com",
    "password": "strongpassword123"
  }
  ```
* **Validation Rules**:
  * `username`: Required, minimum 3 alphanumeric characters.
  * `email`: Required, must be a valid email format.
  * `password`: Required, minimum 6 characters.
* **Success Response** (`201 Created`):
  ```json
  {
    "id": "64bfb6d4f93821034f59ba7c",
    "username": "johndoe",
    "email": "johndoe@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### 2. User Login
* **Endpoint**: `POST /api/auth/login`
* **Access**: Public
* **Request Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "strongpassword123"
  }
  ```
* **Success Response** (`200 OK`):
  ```json
  {
    "id": "64bfb6d4f93821034f59ba7c",
    "username": "johndoe",
    "email": "johndoe@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### 3. Get User Profile (Protected Route)
* **Endpoint**: `GET /api/protected/profile`
* **Access**: Private (Requires JWT Bearer Token)
* **Headers**:
  ```http
  Authorization: Bearer <your_jwt_token_here>
  ```
* **Success Response** (`200 OK`):
  ```json
  {
    "message": "Access granted to protected endpoint!",
    "user": {
      "_id": "64bfb6d4f93821034f59ba7c",
      "username": "johndoe",
      "email": "johndoe@example.com",
      "createdAt": "2026-06-17T00:15:00.000Z",
      "updatedAt": "2026-06-17T00:15:00.000Z"
    }
  }
  ```
