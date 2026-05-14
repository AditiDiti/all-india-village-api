# All India Village API Platform

A production-style full-stack SaaS platform providing hierarchical geographical data APIs for all Indian villages, districts, subdistricts, and states.

Built using React, Node.js, Express, PostgreSQL, and Python ETL pipelines.

---

# Features

- Hierarchical geographical APIs
- Village search & autocomplete
- PostgreSQL normalized database
- Dynamic dependent dropdowns
- Pagination support
- Indexed search optimization
- Excel/XLS data cleaning pipeline
- Responsive React frontend

---

# Tech Stack

## Frontend
- React.js
- Bootstrap
- Axios

## Backend
- Node.js
- Express.js

## Database
- PostgreSQL

## Data Processing
- Python
- Pandas

---

# Project Architecture

React Frontend
↓
Express REST API
↓
PostgreSQL Database

---

# API Endpoints

## States
GET /api/states

## Districts
GET /api/districts/:stateId

## Subdistricts
GET /api/subdistricts/:districtId

## Villages
GET /api/villages/:subdistrictId

## Search
GET /api/search?village=ram

---

# Installation

## Clone Repository

```bash
git clone <repo-url>
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=all_india_villages
DB_USER=postgres
DB_PASSWORD=your_password
```

Run backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

# Future Improvements

- JWT Authentication
- API Key Management
- Admin Dashboard
- Usage Analytics
- Swagger Documentation
- Cloud Deployment

---

# License

MIT License
