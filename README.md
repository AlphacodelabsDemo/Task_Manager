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


A MERN application to manage tasks in an organization. 


## Table of Contents

- [Features](#features)
- [Tools and Technologies](#tools-and-technologies)
- [Dependencies](#dependencies)
- [Dev-dependencies](#dev-dependencies)
- [Prerequisites](#prerequisites)
- [Installation and setup](#installation-and-setup)
- [Backend API](#backend-api)
- [frontend pages](#frontend-pages)
- [npm scripts](#npm-scripts)
- [Useful Links](#useful-links)
- [Contact](#contact)

## Features

### User-side features

- Signup
- Login
- Logout
- Add tasks
- View tasks
- Update tasks
- Delete tasks
- Toasts for success and error messages


### Developer-side features

- Toasts for success and error messages
- Form validations in frontend and checked with backend
- Responsive Navbar with join now and sign in option for now
- Token based Authentication
- Use of 404 page for wrong urls
- Relevant redirects using useNaviagate
- Use of layout component for pages
- Tailwind CSS is used for styling
- Dynamic document titles
- Use of Axios for http calls


## Tools and Technologies

- HTML
- CSS
- Javascript
- Tailwind CSS



## Dependencies

Following are the major dependencies of the project:

- axios
- react
- react-dom
- react-redux
- react-router-dom
- react-toastify
- redux
- redux-thunk


## Installation and Setup

1. Install all the dependencies

   ```
   npm  install

   ```

   
## Frontend pages

<pre>
- /                 Home Screen 
- /signup           Signup page
- /sign             signin page
- /tasks            Add new task
- /projects         Projects List
- /profile          Profile List


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







- `npm run dev`: Starts both backend and frontend
- `npm run dev-server`: Starts only backend
- `npm run dev-client`: Starts only frontend
- `npm run install-all`: Installs all dependencies and dev-dependencies required at root, at frontend and at backend.

Inside frontend folder:

- `npm start`: Starts frontend in development mode
- `npm run build`: Builds the frontend for production to the build folder
- `npm test`: Launches the test runner in the interactive watch mode
- `npm run eject`: This will remove the single build dependency from the frontend.
