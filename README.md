# MERN Stack Backend - Practice Backend

A robust Express.js backend application for user management and authentication, part of a MERN stack project. This backend provides RESTful APIs for user operations including signup, login, and CRUD operations on user data.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database](#database)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure signup and login with JWT tokens
- **Password Hashing**: Uses bcrypt for secure password storage
- **CRUD Operations**: Complete Create, Read, Update, Delete operations for users
- **Authorization Middleware**: Protects routes with JWT-based authentication
- **CORS Support**: Configured for frontend integration (localhost:5173)
- **MongoDB Integration**: Uses Mongoose for database operations
- **Error Handling**: Comprehensive error handling throughout the application
- **Pagination**: Supports pagination for user listing

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT (jsonwebtoken)**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing
- **CORS**: Cross-Origin Resource Sharing
- **Nodemon**: Development dependency for auto-restart

## Project Structure

```
practice-backend/
├── controllers/
│   └── userController.js      # User-related business logic
├── middleware/
│   └── authorization.js       # JWT authentication middleware
├── models/
│   └── user.js                # User data model
├── application.js             # Utility functions for auth
├── index.js                   # Main application entry point
├── package.json               # Project dependencies and scripts
└── README.md                  # Project documentation
```

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rajendrabist07/mern-stack.git
   cd mern-stack
   ```

2. **Navigate to the backend directory:**

   ```bash
   cd "Preactice Backend"
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up MongoDB:**
   - Ensure MongoDB is running locally on port 27017
   - The application connects to database: `MyDatabase`

5. **Environment Configuration:**
   - Update the JWT secret key in `application.js` and `middleware/authorization.js` for production use
   - Modify CORS origin in `index.js` if needed

## Usage

### Development Mode

```bash
npm run dev
```

This starts the server with nodemon for automatic restarts on file changes.

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:8000`

## API Endpoints

### Authentication Endpoints

- `POST /api/signup` - User registration
- `POST /api/login` - User login

### User Management Endpoints (Protected)

All user management endpoints require authentication via JWT token in headers.

- `GET /api/user` - Get all users (with pagination: ?skip=0&limit=10)
- `POST /api/user` - Create a new user
- `DELETE /api/user/:id` - Delete a user by ID
- `PATCH /api/user/:id` - Partially update a user
- `PUT /api/user/:id` - Fully update a user

### Root Endpoint

- `GET /` - Welcome message

## Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **Signup**: Create an account and receive a JWT token
2. **Login**: Authenticate and receive a JWT token
3. **Protected Routes**: Include the token in the `auth_token` header

Example header:

```
auth_token: your_jwt_token_here
```

## Database

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed)
}
```

### Connection

- Database: `MyDatabase`
- Connection: `mongodb://localhost:27017/MyDatabase`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the package.json file for details.

## Author

Rajendra Bist

---

**Note**: This is a practice backend project for learning Express.js and MERN stack development. For production use, ensure proper security measures are implemented, including environment variables for secrets and database credentials.
