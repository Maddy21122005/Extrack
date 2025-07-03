# ExTrack – Personal Expense & Debt Manager 💰📊

**ExTrack** is a full-stack MERN web application designed to help users manage their personal finances efficiently by tracking **expenses, transactions, and debt records** (Borrowers/Lenders).

---

## 🚀 Features

* 🔐 User Authentication (JWT-based)
* 📅 Filter transactions by **date & category**
* 📊 Real-time financial insights: **daily, weekly, monthly, yearly, and total**
* 📈 Pie chart for category-wise expense visualization
* 👥 Manage **Debtors & Creditors**: Create, update (with auto-deduct), and delete
* 🔍 Search/filter debtors and creditors by name
* 🧠 Smart handling of debt balances (auto-delete if balance < 0)
* 🎨 Clean, responsive UI with dark-themed styling
* ⚡ Smooth page transitions, loaders, and scroll prevention for clean UX

---

## 🔧 Tech Stack

**Frontend**:

* React.js
* React Router
* Context API
* Axios
* CSS3 (custom theming)

**Backend**:

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* RESTful API

---

## 📁 Folder Structure

```
ExTrack/
├── client/                      # Frontend (React)
│   ├── public/
│   └── src/
│       ├── api/                 # Axios API calls
│       ├── assets/              # Icons, images
│       ├── components/          # Navbar, Transaction, Debtor, Creditor, Loader, etc.
│       ├── pages/               # Dashboard, Login, Signup, Transactions, DebtManager, Contact
│       ├── styles/              # CSS files
│       ├── utils/               # ProtectedRoute and helpers
│       └── App.jsx              # Root component with routes
│
├── server/                      # Backend (Express)
│   ├── controllers/             # Logic for each route (auth, transactions, debt)
│   ├── models/                  # Mongoose models (User, Transaction, Debtor, Creditor)
│   ├── routes/                  # Route files
│   ├── middleware/              # Auth middleware (JWT)
│   ├── config/                  # MongoDB connection
│   └── index.js                 # Entry point
│
├── .gitignore
├── README.md
├── package.json
└── vite.config.js
```

---

## 🛠️ Setup Instructions

### Prerequisites

* Node.js (v16+)
* MongoDB
* npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/deepanshu2202/ExTrack.git
cd ExTrack
```

### 2. Setup Backend

```bash
cd server
npm install
# Create a .env file with:
# MONGO_URI=your_mongo_connection
# JWT_SECRET=your_secret_key
npm run dev
```

### 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🧪 Test Credentials

You can create your own account or use:

```
Email: demo@extrack.com
Password: demo123
```

---

## 🌐 Deployment

You can deploy the frontend to **Vercel** or **Netlify**, and backend to **Render**, **Railway**, or **VPS**.

Example:

* **Frontend**: Vercel (`client/`)
* **Backend**: Render (`server/`)

Make sure to:

* Whitelist domains in CORS
* Set environment variables on both ends

---

## 🙋 Contact & Feedback

If you find bugs, want to contribute, or have suggestions:

* Open an issue or PR on GitHub
* Contact via https://www.linkedin.com/in/deepanshu-jangra-621507286

---

## 💡 Known Issue

> 🎥 *The dropdowns weren't visible in screen recordings due to browser limitations.*

---

## 📄 License

MIT License © 2025 \ Deepanshu

---

Let me know if you want a `CONTRIBUTING.md` file, deployment `.env` sample, or badge integration (like GitHub stars, license, etc.) for extra polish.
