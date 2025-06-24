
# ForceTrack Frontend

**ForceTrack** is a student progress tracker and analytics dashboard for Codeforces users. It provides a modern, responsive UI to view, manage, and analyze competitive programming data of students.

---

##  Features

### Student Dashboard

* Paginated, searchable, and sortable student list.
* Displays Codeforces handle, rating, and last sync time.

###  Student Details Page

* **Contest History:**
  Visual timeline of rating changes, ranks, and contests.
* **Problem Solving Analytics:**

  * Total problems solved, average rating, hardest problem, problems/day.
  * Rating distribution bar chart.
  * Heatmap for submission activity.

###  Student Management

* Add students by Codeforces handle (auto-fetches name).
* Edit or delete students via dialogs.
* Download full student list as CSV.

###  UI/UX Highlights

* Light/Dark theme toggle (remembers user preference).
* Toast notifications for actions.
* Clean, modern UI components.

---

## 🛠 Tech Stack

* **React 19** + **Vite**
* **Tailwind CSS** (custom theme)
* **Radix UI** (accessible dialogs, dropdowns, etc.)
* **Recharts** (charts)
* **React Router DOM** (routing)
* **Axios** (API requests)
* **Lucide React** & **React Icons** (icons)
* **Sonner** (toast notifications)
* **date-fns** (date manipulation)

---

## 🧾 Project Structure

```
frontend/
├── public/           # Static assets
├── src/
│   ├── assets/       # Images, SVGs, logos
│   ├── components/   # UI and feature components
│   │   ├── dialogs/  # Add/Edit/Delete dialogs
│   │   ├── ui/       # Reusable UI primitives (Button, Card, etc.)
│   ├── lib/          # Utility functions (e.g., classNames)
│   ├── pages/        # Dashboard, StudentDetails, etc.
│   ├── App.jsx       # Main app wrapper (routes, theme)
│   ├── main.jsx      # Entry point
│   ├── index.css     # Tailwind + global styles
├── jsconfig.json     # Path aliases
├── vite.config.js    # Vite plugins & alias config
├── package.json      # Dependencies and scripts
└── README.md         # You are here
```

---

## Getting Started

###  Prerequisites

* Node.js **v18+**
* Backend server running (see [ForceTrack Backend README](../backend/README.md))

###  Installation

```bash
# Install dependencies
npm install

# Copy environment file and set backend URL
cp .env.example .env
```

In `.env`:

```env
VITE_BACKEND_URL=http://localhost:3000/api
```

###  Run Development Server

```bash
npm run dev
```

App will be available at: [http://localhost:5173](http://localhost:5173)

###  Build for Production

```bash
npm run build
```

###  Preview Production Build

```bash
npm run preview
```

---

## Usage Guide

### Dashboard

* Search students by handle or email.
* Change rows per page.
* Download CSV of student list.
* Add, edit, or delete students.

### Student Details

* Click on a student to see contests and problems.
* Filter data by time range.

### Theme

* Toggle light/dark mode from the navbar.
* Preference is saved locally.

---

## Customization

### Tailwind Theme

Modify `index.css` to change theme colors or global styles.

### Aliases

* Customize import aliases in:

  * `vite.config.js`
  * `jsconfig.json`

### Reusable Components

* Found in `src/components/ui/`.

