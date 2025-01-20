# NestJS Todo Application

This is a simple Todo application built using **NestJS**. The application allows users to perform CRUD operations on tasks. Each task can be created, updated, fetched, and deleted. The application uses **JWT** (JSON Web Token) for user authentication and **MongoDB** as the database.

## Features

- User authentication using JWT tokens.
- Tasks can be created, read, updated, and deleted.
- Each task is associated with a user (identified via the JWT token).
- Secure endpoints using JWT authentication guard.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable applications.
- **MongoDB**: A NoSQL database used to store tasks and user data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Token)**: Used for secure user authentication and authorization.
- **BcryptJS**: Used for hashing and comparing passwords securely.

## Installation

### Step 1: Clone the repository

```bash
git clone https://github.com/your-username/todo-app.git
### Step 2: Install Dependencies
 npm install
### Step 3: Run the Project
npm run start:dev



