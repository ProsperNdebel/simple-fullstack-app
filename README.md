```
simple-fullstack-app/
│
├── backend/ # Flask backend
│ ├── app.py # Main Flask application
│ ├── models.py # Database model logic (optional)
│ ├── database.db # SQLite database file (auto-created)
│ └── requirements.txt # Python dependencies
│
├── frontend/ # React frontend
│ ├── public/
│ │ └── index.html # Root HTML entry
│ ├── src/
│ │ ├── api.js # Axios API calls
│ │ ├── App.js # Main React component
│ │ └── index.js # React entry point
│ ├── package.json # Frontend dependencies + scripts
│ └── package-lock.json
│
├── .gitignore # Ignore venv, node_modules, etc.
└── README.md
```

---

## 🧰 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/simple-fullstack-app.git
cd simple-fullstack-app

cd backend
python3 -m venv venv
source venv/bin/activate   # (Mac/Linux)
# or
venv\Scripts\activate      # (Windows)
pip install -r requirements.txt
python app.py

cd frontend
npm install
npm start
