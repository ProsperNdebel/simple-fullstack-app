simple-fullstack-app/
│
├── backend/                   # Flask backend
│   ├── app.py                 # Main Flask application
│   ├── models.py              # Database model logic (optional)
│   ├── database.db            # SQLite database file (auto-created)
│   └── requirements.txt       # Python dependencies
│
├── frontend/                  # React frontend
│   ├── public/
│   │   └── index.html         # Root HTML entry
│   ├── src/
│   │   ├── api.js             # Axios API calls
│   │   ├── App.js             # Main React component
│   │   └── index.js           # React entry point
│   ├── package.json           # Frontend dependencies + scripts
│   └── package-lock.json
│
├── .gitignore                 # Ignore venv, node_modules, etc.
└── README.md
