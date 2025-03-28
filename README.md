# 🌐 Leveling Finance — Web App

This is the official **web application** for [Leveling Finance](https://levelingfinance.com), a student-led platform designed to teach teens real-world financial literacy through gamified learning and real-time insights.

> Built with **Next.js**, **Tailwind CSS**, and **Framer Motion** — powered by a FastAPI backend and integrated with Clerk for auth.

---

## 📦 Repo Overview

This repo includes:

- ✅ **Educator Dashboard** — Overview of student performance, revenue, and minutes spent.
- 📈 **Leaderboard** — See top-performing students across classes.
- 🧑‍🏫 **Class Views** — Dive into specific class metrics and student data.
- 🎨 **Clean UI/UX** — Gradient backgrounds, subtle motion effects, and a responsive layout.

---

## 🧠 Tech Stack

| Layer        | Tech Used                     |
|--------------|-------------------------------|
| Frontend     | Next.js (App Router)          |
| Styling      | Tailwind CSS, Framer Motion   |
| Auth         | Clerk                         |
| Backend API  | FastAPI (Dockerized)          |
| Payments     | Stripe          |
| Cloud        | Azure (Key Vault, VMs, RGs)   |

---

## 🖥️ Running the Web App Locally

### 1. Clone the repo
```bash
git clone https://github.com/RishithRavi/LevelingFinanceWeb.git
cd LevelingFinanceWeb
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file:

```env
CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

(You’ll also need to configure Stripe keys when payments are integrated.)

### 4. Start the dev server
```bash
npm run dev
```

---

## 🧪 Sample Screens

- **Dashboard Overview**: Total students, revenue, minutes spent.
- **Class Page**: Metrics + student table with progress bars.
- **Leaderboard**: Sortable top performers.

Want to contribute a new screen? Open a PR or message us on Discord!

---

## 🧠 Coming Soon

- AI-powered nudges for educators
- Shareable class reports
- Team-based games

---

## 🙌 Contributing

We welcome PRs! Be sure to lint (`npm run lint`) and follow the existing code structure.

---

## 📬 Contact

📧 rishith@levelingfinance.com  
📸 [@levelingfinance](https://instagram.com/levelingfinance)  
🌐 [Leveling Finance Website](https://levelingfinance.com) (soon)
