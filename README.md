# Streako

# Not you usual habit tracker

Streako is a full-stack habit tracker designed to help users build and maintain daily routines. It features an intuitive interface, streak tracking, and personalized progress visualization.

---

## Features

* **Streak Tracking:** Visualize consecutive days a habit has been maintained to boost motivation.
* **Habit Management:** Organize and mark daily habits as complete through a simple interface.
* **User Authentication:** Secure signup and protected dashboard access using JWT and cookie-based authentication.
* **Dashboard Analytics:** Monitor progress over time with charts (powered by Recharts) showing weekly streaks and habit completion rates.
* **Modern UI:** Minimalist, responsive design powered by Tailwind CSS for seamless use across devices.

---

## 🛠️ Tech Stack

### Frontend (`/frontend`)

| Technology          | Purpose                                     |
| ------------------- | ------------------------------------------  |
| React               | Component-based library for UI development  |
| Vite                | Fast development server and bundler         |
| Tailwind CSS        | Utility-first CSS framework for styling     |
| Recharts            | Dynamic charts and graphs                   |
| React Router DOM    | Client-side navigation between views        |
| @uiw/react-heat-map | For streaks like github                     |

### Backend (`/backend`)

| Technology           | Purpose                                        |
| -------------------- | ---------------------------------------------- |
| Node.js / Express    | Web application runtime and framework          |
| MongoDB / Mongoose   | Database and ODM                               |
| jsonwebtoken (JWT)   | User session token generation and verification |
| cors & cookie-parser | Handling cross-origin requests and cookies     |

---

## 🚀 Installation & Setup

### Prerequisites

* Node.js v16+
* MongoDB running locally or via cloud service

### 1. Clone Repository

```bash
git clone <your-repo-link>
cd Streako
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
MONGO_URL="mongodb://127.0.0.1:27017/streako-db"
JWT_SECRET="your_secure_jwt_secret_key"
APP_PORT=7000
```

Start backend server:

```bash
npm run dev
# Server running on http://localhost:7000
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
# Frontend opens on http://localhost:5173
```

> Ensure the frontend (5173) and backend (7000) ports match your configuration for successful communication.

---

## 🎯 Usage

1. Open the frontend in your browser.
2. Sign up, to start tracking your habits, further you can also login to see your existing habit.
3. Add, complete, and monitor your habits on the dashboard.
4. Check analytics to see your streaks and habit performance over time.

---

## License

MIT License
