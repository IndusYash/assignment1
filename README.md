# 🏫 School Management API

A RESTful API built with **Node.js**, **Express.js**, and **MySQL** that allows you to add schools and retrieve them sorted by geographical proximity using the Haversine formula.

---

## 📁 Project Structure

```
school-management-api/
├── config/
│   └── db.js                  # MySQL connection pool
├── controllers/
│   └── schoolController.js    # Business logic + Haversine formula
├── middleware/
│   ├── errorHandler.js        # Global error handler
│   ├── notFound.js            # 404 handler
│   └── validators.js          # express-validator rules
├── models/
│   └── schoolModel.js         # SQL queries (data-access layer)
├── routes/
│   └── schoolRoutes.js        # Route definitions
├── .env.example               # Sample environment variables
├── .gitignore
├── app.js                     # Express app setup
├── package.json
├── postman_collection.json    # Import this in Postman
├── schema.sql                 # MySQL schema
└── server.js                  # Entry point
```

---

## ⚙️ Prerequisites

- **Node.js** v18+
- **MySQL** 8.0+ (local or cloud)
- **npm**

---

## 🚀 Local Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd school-management-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` with your MySQL credentials:

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=school_management
```

### 4. Set up the MySQL database

Open your MySQL client and run:

```bash
mysql -u root -p < schema.sql
```

Or paste the contents of `schema.sql` into MySQL Workbench / phpMyAdmin.

### 5. Start the server

**Development (with auto-restart):**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

The server starts at `http://localhost:3000`.

---

## 📡 API Reference

### `POST /addSchool`

Add a new school to the database.

**Request Body (JSON):**

| Field       | Type   | Required | Description                        |
|-------------|--------|----------|------------------------------------|
| `name`      | string | ✅       | School name (non-empty)            |
| `address`   | string | ✅       | School address (non-empty)         |
| `latitude`  | float  | ✅       | Latitude between -90 and 90        |
| `longitude` | float  | ✅       | Longitude between -180 and 180     |

**Example Request:**

```json
{
  "name": "Greenwood High",
  "address": "123 Oak Street, New York",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

**Success Response — `201 Created`:**

```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Greenwood High",
    "address": "123 Oak Street, New York",
    "latitude": 40.7128,
    "longitude": -74.006
  }
}
```

**Validation Error — `400 Bad Request`:**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "name", "message": "School name is required" }
  ]
}
```

---

### `GET /listSchools?latitude=..&longitude=..`

Fetch all schools sorted by distance from the given coordinates.

**Query Parameters:**

| Parameter   | Type  | Required | Description              |
|-------------|-------|----------|--------------------------|
| `latitude`  | float | ✅       | User's latitude (-90–90)  |
| `longitude` | float | ✅       | User's longitude (-180–180)|

**Example Request:**

```
GET /listSchools?latitude=40.7128&longitude=-74.0060
```

**Success Response — `200 OK`:**

```json
{
  "success": true,
  "message": "Schools fetched and sorted by proximity",
  "count": 2,
  "user_location": { "latitude": 40.7128, "longitude": -74.006 },
  "data": [
    {
      "id": 1,
      "name": "Greenwood High",
      "address": "123 Oak Street, New York",
      "latitude": 40.7128,
      "longitude": -74.006,
      "distance_km": 0
    },
    {
      "id": 2,
      "name": "Sunrise Academy",
      "address": "456 Maple Ave, Los Angeles",
      "latitude": 34.0522,
      "longitude": -118.2437,
      "distance_km": 3940.0678
    }
  ]
}
```

---

## 🧪 Testing with Postman

1. Open Postman
2. Click **Import** → select `postman_collection.json`
3. Set the `base_url` variable to `http://localhost:3000`
4. Run the requests

---

## ☁️ Deployment on Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Set the following:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add all environment variables from `.env` in the **Environment** tab
6. Use a managed MySQL provider (e.g., [PlanetScale](https://planetscale.com), [Railway](https://railway.app), [Aiven](https://aiven.io)) and point `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` to it
7. Click **Deploy**

## ☁️ Deployment on Railway

1. Push code to GitHub
2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub**
3. Add a **MySQL** service from Railway's plugin marketplace
4. Railway will auto-inject `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` as environment variables
5. Set `PORT` and `NODE_ENV=production`
6. Railway will auto-detect `npm start` as the start command

---

## 🛠️ Tech Stack

| Layer       | Technology            |
|-------------|----------------------|
| Runtime     | Node.js v18+         |
| Framework   | Express.js v4        |
| Database    | MySQL 8 via mysql2   |
| Validation  | express-validator v7 |
| Config      | dotenv               |
| Dev tool    | nodemon              |

---

## 📝 License

ISC
