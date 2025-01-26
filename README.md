# **Spam Detection and Contact Search API**

This is a **REST API** built with **Node.js**, **Express**, and **Sequelize** (MySQL) for a mobile app that allows users to:
1. **Register** and **log in**.
2. **Mark phone numbers as spam**.
3. **Search for people by name or phone number** in a global database.

---

## **Table of Contents**
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
4. [API Endpoints](#api-endpoints)
5. [Database Population](#database-population)
6. [Testing](#testing)

---

## **Features**
- **User Registration and Login**: Users can register with a name, phone number, and password. They can log in to access the API.
- **Mark Numbers as Spam**: Users can mark any phone number as spam, which will be visible to other users.
- **Search by Name**: Users can search for people by name. Results show names, phone numbers, and spam likelihood.
- **Search by Phone Number**: Users can search for people by phone number. If the number belongs to a registered user, only that result is shown. Otherwise, all matching results are displayed.
- **Secure Authentication**: Uses **JSON Web Tokens (JWT)** for secure user authentication.

---

## **Technologies Used**
- **Backend**: Node.js, Express
- **Database**: MySQL (with Sequelize ORM)
- **Authentication**: JSON Web Tokens (JWT)
- **Testing**: Jest, Supertest
- **Other Libraries**: bcryptjs (for password hashing), faker (for database population)

---

## **Setup and Installation**

### **Prerequisites**
1. **Node.js**: Install Node.js from [here](https://nodejs.org/).
2. **MySQL**: Install MySQL from [here](https://dev.mysql.com/downloads/).
3. **Git**: Install Git from [here](https://git-scm.com/).

### **Steps to Run the Project**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/sunny06a/.git
   cd your-repo

2. **Install Dependencies**:
    ```bash
    npm install

3. **Create a MySQL Database**:
    Create a MySQL database named `spam_api_db`.
    Update the .env file with your MySQL credentials:
    ```env
    JWT_SECRET=your_jwt_secret
    DB_HOST=localhost
    DB_USER=your_mysql_user
    DB_PASSWORD=your_mysql_password
    DB_NAME=spam_api_db
    DB_PORT=3306

4. **Run the Application:**
    ```bash
    npm start
    The server will start on http://localhost:3000.

5. **Populate the Database (Optional)**:
    Run the script to populate the database with sample data:
    ```bash
    npm run populate

--- 

## **API Endpoints**
1. **Authentication**
   - **Register a New User**:
        - **Endpoint**: POST /api/auth/register
        - **Request Body**:
        ```json
        {
            "name": "John Doe",
            "phone_number": "1234567890",
            "email": "johndoe@gmail.com",
            "password": "password123"
        }
    - **Login**:
        - **Endpoint**: POST /api/auth/login
        - **Request Body**:
        ```json
        {
            "phone_number": "1234567890",
            "password": "password123"
        }

2. **Spam Reporting**
    - **Mark a Number as Spam**:
          - **Endpoint**: ```POST /api/spam/mark-spam```
          - **Request Body**:
          ```json
          {
                "phone_number": "1234567890"
          }```

### **3. Search**
- **Search by Name**:  
  - **Endpoint**: `GET /api/search/name?name=John`  
  - **Query Parameter**:  
    - `name` (partial or full name of the person to search for)  

- **Search by Phone Number**:  
  - **Endpoint**: `GET /api/search/phone?phone=1234567890`  
  - **Query Parameter**:  
    - `phone` (exact phone number to search for)  
---
##  **Database Population**
To populate the database with sample data, run:
```bash
  npm run populate
```    
---
## **Testing**
Run the test suite using Jest:
```bash
npm test
```
***NOTE : Due to lack of time tesing using jest is not completed, so have to test api manually using thunder-client/postman or using curl***
