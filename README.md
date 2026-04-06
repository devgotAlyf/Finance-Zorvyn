# Finance-dev — Data Processing and Access Control Backend

A secure, role-based finance dashboard system built to demonstrate advanced backend engineering principles including API design, data modeling, business logic, and granular access control.

## 🚀 Overview

Finance-dev is a full-stack financial management application. It provides a robust backend to manage financial transactions, user accounts, and aggregated dashboard analytics, all protected by a modern JWT-based authentication and Role-Based Access Control (RBAC) system.

## 🛠️ Tech Stack

-   **Frontend**: Vanilla JavaScript (ES6+), Modern CSS (Variables, Flexbox/Grid), Components-based architecture.
-   **Backend**: Node.js, Express.js.
-   **Security**: JSON Web Tokens (JWT) for session management, Role-based middleware for authorization.
-   **Data Persistence**: Thread-safe in-memory store (for assessment simplicity).

## ✨ Key Features

### 1. User & Role Management (RBAC)
Supports three distinct user levels with specific permissions:
-   **Viewer**: Read-only access to the dashboard and transactions.
-   **Analyst**: Full read access to transactions and deep financial insights/summaries.
-   **Admin**: Full management control. Can Create/Update/Delete financial records and manage user accounts (Status toggle, Create, Delete).

### 2. Financial Records Management
Full CRUD (Create, Read, Update, Delete) for financial transactions including:
-   Amount, Type (Income/Expense), Category, Date, and Description.
-   Dynamic filtering by transaction type.
-   Real-time search across descriptions and categories.

### 3. Dashboard Analytics
Real-time aggregation of financial data:
-   **KPIs**: Total Income, Total Expenses, Net Balance.
-   **Visual Breakdown**: Category-wise expense distribution by percentage.
-   **Recent Activity**: Feed of the 5 most recent financial events.

---

## 🚦 Role Permission Matrix

| Feature / Action           | Viewer | Analyst | Admin |
| :------------------------- | :----: | :-----: | :---: |
| Login                      |   ✅   |   ✅    |  ✅   |
| View Dashboard Summary     |   ✅   |   ✅    |  ✅   |
| View Transaction List      |   ✅   |   ✅    |  ✅   |
| Search/Filter Transactions |   ✅   |   ✅    |  ✅   |
| Create/Edit Transactions   |   ❌   |   ❌    |  ✅   |
| Delete Transactions        |   ❌   |   ❌    |  ✅   |
| View User List             |   ❌   |   ❌    |  ✅   |
| Create New Users           |   ❌   |   ❌    |  ✅   |
| Toggle User Status         |   ❌   |   ❌    |  ✅   |
| Delete Users               |   ❌   |   ❌    |  ✅   |

---

## 🏗️ Getting Started

### Prerequisites
-   Node.js (v14 or higher)
-   npm (v6 or higher)

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/devgotAlyf/Fianance-Zorvyn.git
    cd Fianance-Zorvyn
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running Locally
Start the backend server:
```bash
node server.js
```
The server will run on **http://localhost:5000**. The frontend is served statically from the same port.

---

## 🔑 Demo Credentials

| Role    | Email             | Password |
| :------ | :---------------- | :------- |
| Admin   | `admin@dev.com`   | `admin`  |
| Analyst | `analyst@dev.com` | `analyst`|
| Viewer  | `viewer@dev.com`  | `viewer` |

---

## 📖 API Documentation (Summary)

### Authentication
-   `POST /api/auth/login` - Authenticate user and return JWT.

### Dashboard
-   `GET /api/dashboard/summary` - Return aggregated financial KPIs and breakdown.

### Transactions
-   `GET /api/transactions` - List all transactions (supports `?search=` and `?type=`).
-   `POST /api/transactions` - **(Admin Only)** Create new entry.
-   `PUT /api/transactions/:id` - **(Admin Only)** Update entry.
-   `DELETE /api/transactions/:id` - **(Admin Only)** Remove entry.

### Users
-   `GET /api/users` - **(Admin Only)** List all users.
-   `POST /api/users` - **(Admin Only)** Create new user.
-   `PATCH /api/users/:id/status` - **(Admin Only)** Toggle active/inactive.

---

## 📝 Assumptions & Trade-offs
-   **In-Memory Store**: For this assessment, data is stored in memory. In a production environment, this would be swapped for a persistent Database (PostgreSQL/MongoDB).
-   **Input Validation**: All POST/PUT requests are validated via middleware before being processed.
-   **Security**: Passwords are currently stored as plain text for ease of demonstration; in a live system, these would be hashed using `bcrypt`.
