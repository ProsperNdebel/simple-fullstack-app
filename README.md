# Simple Fullstack Task Manager

A simple fullstack web application for managing tasks, built with Flask (backend) and React (frontend).

## Features

- ✅ Create new tasks
- ✏️ Edit existing tasks inline
- 🗑️ Delete tasks
- 📋 View all tasks in a list
- 💾 Persistent storage using SQLite

## Tech Stack

**Backend:**
- Python 3.x
- Flask - Web framework
- Flask-CORS - Cross-origin resource sharing
- SQLite - Database

**Frontend:**
- React 18
- Axios - HTTP client
- React Scripts - Build tooling

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.8 or higher
- Node.js 14 or higher
- npm (comes with Node.js)

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

## Running the Application

### Start the Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Activate the virtual environment (if not already active):
```bash
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Run the Flask application:
```bash
python app.py
```

The backend will start on `http://127.0.0.1:5000`

### Start the Frontend

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Start the React development server:
```bash
npm start
```

The frontend will open automatically in your browser at `http://localhost:3000`

## API Endpoints

The backend provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Retrieve all tasks |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/<id>` | Update an existing task |
| DELETE | `/tasks/<id>` | Delete a task |

### Example API Usage

**Create a task:**
```bash
curl -X POST http://127.0.0.1:5000/tasks \
  -H "Content-Type: application/json" \
  -d '{"task": "Buy groceries"}'
```

**Get all tasks:**
```bash
curl http://127.0.0.1:5000/tasks
```

**Update a task:**
```bash
curl -X PUT http://127.0.0.1:5000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"task": "Buy groceries and cook dinner"}'
```

**Delete a task:**
```bash
curl -X DELETE http://127.0.0.1:5000/tasks/1
```

## Testing

Comprehensive testing documentation is available in [TESTING.md](TESTING.md).

### Quick Test Commands

**Backend tests:**
```bash
cd backend
pytest
```

**Frontend tests:**
```bash
cd frontend
npm test
```

## Project Structure

```
simple-fullstack-app/
│
├── backend/                    # Flask backend
│   ├── app.py                 # Main Flask application
│   ├── models.py              # Database model logic (optional)
│   ├── database.db            # SQLite database file (auto-created)
│   ├── requirements.txt       # Python dependencies
│   └── test_app.py            # Backend tests
│
├── frontend/                   # React frontend
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
├── CHANGELOG.md               # Project changelog
├── TESTING.md                 # Comprehensive testing guide
└── README.md                  # This file
```

## Troubleshooting

### Backend won't start
- Ensure Python 3.8+ is installed: `python --version`
- Verify all dependencies are installed: `pip install -r requirements.txt`
- Check if port 5000 is available

### Frontend won't start
- Ensure Node.js is installed: `node --version`
- Verify all dependencies are installed: `npm install`
- Check if port 3000 is available

### Cannot connect to backend
- Verify backend is running on port 5000
- Check CORS is enabled in `backend/app.py`
- Verify the proxy setting in `frontend/package.json` points to `http://127.0.0.1:5000`

### Changes don't persist
- Check that `database.db` file has write permissions
- Verify backend is saving changes (check console logs)
- Try deleting `database.db` and restarting the backend

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available for educational purposes.
