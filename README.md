# Product Management System

## Overview

This project is a simple Product Management System built using **Node.js, Express, and MySQL**.
It allows users to register, log in, and manage products with features to add, edit, delete, and view products, along with basic reporting such as total products and total inventory value.

The application uses **JWT-based authentication**, a **MySQL database**, and a **clean MVC backend structure**. The frontend is built with **HTML, CSS, and vanilla JavaScript**.

---

## Features

* User signup and login
* JWT-based authentication
* Add, edit, delete, and list products
* Reporting:

  * Total number of products
  * Total inventory value
* Input validation and error handling
* Logout functionality
* Clean folder structure and modular backend design

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* JWT (jsonwebtoken)
* bcryptjs
* HTML, CSS, JavaScript

---

## Project Structure

```
Product_Management_System/
│
├── src/
│   ├── config/          # Database connection
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & error handling
│   ├── routes/          # API and page routes
│   ├── views/           # HTML pages
│   ├── public/          # CSS and client JS
|   ├── utils/
│
├── database.sql         # Database schema
├── .env                 # Environment variables
├── package.json
└── app.js               # Application entry point
```

---

## Setup Instructions

### 1. Clone the repository

```
git clone <repository-url>
cd product-management
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Setup MySQL Database

You can import the database using either of the following methods.

Method 1: Using MySQL Workbench

1. Open MySQL Workbench.
2. Open a new SQL tab.
3. Run:

SOURCE database.sql;

---

Method 2: Using Terminal

Run:
mysql -u root -p < database.sql

Then enter your MySQL password when prompted.

This will create the required database and tables.

---

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=product_management
JWT_SECRET=your_secret_key
```

---

### 5. Run the Application

```
node app.js
```

---

### 6. Access the Application

Open your browser and go to:

```
http://localhost:5000/login
```

---

## API Endpoints

### Authentication

* POST `/api/auth/signup`
* POST `/api/auth/login`

### Products

* GET `/api/products`
* POST `/api/products`
* PUT `/api/products/:id`
* DELETE `/api/products/:id`
* GET `/api/products/report`

---

## Notes

* Passwords are securely hashed using bcrypt.
* All product routes are protected using JWT authentication.
* SQL queries use prepared statements to prevent SQL injection.

---
