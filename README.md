
# 📊 ForceTrack

**ForceTrack** A platform for tracking and visualizing the competitive programming progress of students using their Codeforces activity. It includes powerful analytics, clean UI, and automation to sync data regularly

---

## Screen Shots
![forceTrack-dashbaord](https://github.com/user-attachments/assets/d4eaa4d1-eb3c-4b11-80fa-dc36093a679f)

![ForceTrack-contestHistory](https://github.com/user-attachments/assets/de44b5f9-4e5d-47f6-92b3-d40c47156c53)

![codeForces-ProblemSolved](https://github.com/user-attachments/assets/22563918-eb43-4095-92ff-30d48053d1f5)


---

## Monorepo Structure

```
ForceTrack/
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
git clone https://github.com/your-username/ForceTrack.git
cd ForceTrack
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



