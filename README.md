# Task_Manager
MERN application to managae tasks in an organization. 


### Developer-side features

- Form validations in backend
- Token based Authentication
- Routes protection
- Middleware for verifying the user in backend
- Use of different HTTP status codes for sending responses
- Standard pratices followed


## Dependencies

Following are the major dependencies from backend of the project:
- bcrypt
- cors
- dotenv
- express
- jsonwebtoken
- mongoose
- joi
- joi-password-complexity




## Dev-dependencies

Following are the major dev-dependencies of the project:

- nodemon
- concurrently

## Prerequisites

- Node.js must be installed on the system.
- You should have a MongoDB database.
- You should have a code editor (preferred: VS Code)

## Installation and Setup

1. Install all the dependencies

   ```sh
   npm run install-all
   ```

2. Create a file named ".env" inside the backend folder. Add data from .env.example file and substitute your credentials there.

3. Start the application

   ```sh
   npm run dev
   ```

4. Go to http://localhost:3000

## Backend API

<pre>
- POST     /api/auth/signup
- POST     /api/auth/login
</pre>



## npm scripts

At root:

- `npm run dev`: Starts backend 
- `npm run dev-server`: Starts only backend



Inside backend folder:

- `npm run dev`: Starts backend using nodemon.
- `npm start`: Starts backend without nodemon.

## Useful Links

- This project

  - Github Repo: 







