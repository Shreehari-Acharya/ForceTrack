
# 📊 TLE Analytics

**TLE Analytics** A platform for tracking and visualizing the competitive programming progress of students using their Codeforces activity. It includes powerful analytics, clean UI, and automation to sync data regularly

---

## Product walkthrough

*Coming Soon* 

---

## Monorepo Structure

```
TLE-Analytics/
├── frontend/    → React app for UI (dashboard, analytics, charts)
├── backend/     → REST API for student management and data sync
```

### `frontend/` (React + Tailwind)

* Student dashboard
* Contest history visualization
* Problem-solving analytics (charts, heatmaps)
* Light/dark theme support
* Built with React 19, Vite, Tailwind, Radix UI, Recharts

See [frontend/README.md](./frontend/README.md) for setup and usage.

---

###  `backend/` (Node.js + Express + MongoDB)

* RESTful API for student data
* Syncs Codeforces profile, contest, and submission data
* Cron jobs for batch syncs
* Email reminders for inactivity via Resend

See [backend/README.md](./backend/README.md) for API docs and server setup.

---

##  Getting Started (Local Dev)

### Prerequisites

* Node.js v18+
* MongoDB (local or Docker)

### Clone the Repo

```bash
git clone https://github.com/your-username/tle-analytics.git
cd tle-analytics
```

### Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### Start MongoDB (Optional via Docker)

```bash
docker-compose -f backend/docker-compose.mongo.yaml up -d
```

### Set Up Environment

Create `.env` files in both `frontend/` and `backend/` using the provided `.env.example`.

### Run the Apps

```bash
# Backend
cd backend
npm run dev

# Frontend (in new terminal)
cd ../frontend
npm run dev
```

Apps will be available at:

* Frontend: `http://localhost:5173`
* Backend API: `http://localhost:3000/`

---



