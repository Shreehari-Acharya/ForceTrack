#  TLE Analytics Backend

This is the backend service for **TLE Analytics**, a platform for tracking and analyzing Codeforces student progress. It provides a RESTful API for managing students, syncing Codeforces data, and delivering analytics to the frontend.

---

##  Features

###  Student Management

* Add, update, delete, and search students by Codeforces handle or email.
* Download complete student data as a CSV file.

###  Codeforces Data Sync

* Sync student **profile**, **contest history** (last 1 year), and **problem-solving data** (last 90 days).
* Stores analytics like contest ranks, rating deltas, and solved problems.
* Batch sync all students via a scheduled cron job or API trigger.

###  Analytics API

* Paginated student list with ratings and last sync status.
* Detailed analytics for each student including:

  * Contest timeline
  * Problem-solving stats
  * Activity heatmaps

###  Email Services

* Email reminders for inactivity.

---

##  Tech Stack

* **Node.js** (ESM)
* **Express.js** (RESTful API)
* **MongoDB** (via Mongoose ODM)
* **Axios** (for Codeforces API)
* **Docker Compose** (for MongoDB setup)
* **Resend API** (for sending emails)
* **Node-Cron** (for scheduled tasks)

---

## 📁 Project Structure

```
backend/
├── .env                             # Environment variables
├── docker-compose.mongo.yaml       # MongoDB container setup
├── package.json                     # Scripts and dependencies
├── testing.js                       # Script to manually test sync
└── src/
    ├── server.js                    # Entry point (Express app)
    ├── controllers/
    │   └── studentController.js     # Route handler logic
    ├── models/
    │   ├── student.js
    │   ├── studentContestHistory.js
    │   └── studentProblemSolved.js
    ├── routes/
    │   └── studentRoutes.js         # All /api/students routes
    ├── services/
    │   ├── cronjob/
    │   │   └── sync.js              # Scheduled batch sync logic
    │   ├── dbServices/
    │   │   └── studentServices.js   # MongoDB interaction logic
    │   └── email/
    │       ├── resend.js            # Resend API integration
    │       └── sendEmails.js        # Email logic (e.g., inactivity)
    └── utils/
        ├── codeforces.js            # Codeforces API wrapper
        └── time.js                  # Date/time utility functions
```

---

## API Endpoints

Base URL: `http://localhost:3000/api/students`

| Method | Endpoint        | Description                        |
| ------ | --------------- | ---------------------------------- |
| GET    | `/`             | Get paginated list of students     |
| POST   | `/`             | Add a new student                  |
| GET    | `/search`       | Search students by handle or email |
| PUT    | `/`             | Update a student's details         |
| DELETE | `/`             | Delete a student and their data    |
| GET    | `/download`     | Download all students as a CSV     |
| GET    | `/s/:studentId` | Get full analytics for a student   |

---

### Example Student Object

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "1234567890",
  "codeforcesHandle": "john_cf",
  "currentRating": 1500,
  "maxRating": 1600,
  "lastSynced": "2024-06-20T12:00:00.000Z",
  "lastSubmissionDate": "2024-06-19T10:00:00.000Z"
}
```

---

## Sync Logic

| Function                         | Description                                       |
| -------------------------------- | ------------------------------------------------- |
| `syncStudentProfile(handle)`     | Fetches name, current/max rating from Codeforces  |
| `syncContestHistory(handle)`     | Gets all contests in past year with rank/delta    |
| `syncProblemSolvingData(handle)` | Gets AC submissions from last 90 days             |
| `syncStudentData(handle)`        | Runs all the above syncs for a single student     |
| `syncAllStudentsData()`          | Runs sync for all students (batch job or trigger) |

---

##  Email Logic

| File              | Purpose                             |
| ----------------- | ----------------------------------- |
| `sendEmails.js`   | Sends inactivity or digest emails   |
| `resend.js`       | Integration with Resend email API   |
| `cronjob/sync.js` | Runs batch jobs and triggers emails |

You can configure scheduled tasks (e.g., daily sync + email reminders) using `node-cron` inside `sync.js`.

---

##  Getting Started

###  Prerequisites

* Node.js v18+
* MongoDB (local or Docker)

###  Setup

```bash
npm install
cp .env.example .env
```

Update `.env` with:

```env
MONGO_URI=mongodb://localhost:27017/tle
RESEND_API_KEY=your_resend_key
EMAIL_FROM=noreply@yourdomain.com
```

###  Run MongoDB via Docker

```bash
docker-compose -f docker-compose.mongo.yaml up -d
```

### Start Server

```bash
npm run dev
```

Backend runs at: [http://localhost:3000](http://localhost:3000)




