# Simple Fullstack Task Manager

A fullstack web application for managing tasks, built with Flask (backend) and React (frontend). This project demonstrates CRUD operations with a REST API and modern frontend.

## 🚀 Features

- ✅ Create new tasks
- 📝 View all tasks
- ✏️ Update existing tasks
- 🗑️ Delete tasks
- 💾 SQLite database for persistence
- 🔄 RESTful API architecture

## 🛠️ Tech Stack

### Backend
- **Flask** - Python web framework
- **Flask-CORS** - Cross-Origin Resource Sharing
- **SQLite** - Lightweight database
- **pytest** - Testing framework

### Frontend
- **React 18** - UI library
- **Axios** - HTTP client
- **React Scripts** - Build tooling

## 📁 Project Structure

```
simple-fullstack-app/
│
├── backend/                # Flask backend
│   ├── app.py             # Main Flask application
│   ├── models.py          # Database model logic
│   ├── database.db        # SQLite database (auto-created)
│   ├── requirements.txt   # Python dependencies
│   ├── test_app.py        # Automated tests
│   ├── manual_test.py     # Manual testing scripts
│   └── manual_test_delete.py
│
├── frontend/              # React frontend
│   ├── public/
│   │   └── index.html    # Root HTML entry
│   ├── src/
│   │   ├── api.js        # Axios API calls
│   │   ├── app.js        # Main React component
│   │   ├── App.css       # Styles
│   │   └── index.js      # React entry point
│   ├── package.json      # Frontend dependencies + scripts
│   └── package-lock.json
│
├── .gitignore            # Ignore venv, node_modules, etc.
├── README.md             # This file
├── TESTING.md            # Comprehensive testing guide
└── CHANGELOG.md          # Version history
```

## 🏁 Getting Started

### Prerequisites

- Python 3.7+
- Node.js 14+
- npm or yarn

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

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the Flask server:
```bash
python app.py
```

The backend will start on `http://127.0.0.1:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will open automatically at `http://localhost:3000`

## 📖 API Documentation

### Base URL
```
http://127.0.0.1:5000
```

### Endpoints

#### Get All Tasks
```http
GET /tasks
```

**Response:**
```json
{
  "tasks": [
    {"id": 1, "task": "Complete project"}
  ]
}
```

#### Create Task
```http
POST /tasks
Content-Type: application/json

{
  "task": "New task description"
}
```

**Response:**
```json
{
  "message": "Task added!",
  "task": {"id": 2, "task": "New task description"}
}
```

#### Update Task
```http
PUT /tasks/<task_id>
Content-Type: application/json

{
  "task": "Updated task description"
}
```

**Response:**
```json
{
  "message": "Task updated!"
}
```

#### Delete Task
```http
DELETE /tasks/<task_id>
```

**Response:**
```json
{
  "message": "Task deleted!"
}
```

## 🧪 Testing

The project includes comprehensive testing documentation. See [TESTING.md](TESTING.md) for:

- Automated backend tests (pytest)
- Manual testing scripts
- Frontend testing guide
- Common troubleshooting

### Quick Test

Run backend tests:
```bash
cd backend
pytest test_app.py -v
```

## 🔧 Configuration

### Frontend Proxy
The frontend is configured to proxy API requests to `http://127.0.0.1:5000` (see `frontend/package.json`).

### CORS
CORS is enabled on the backend to allow frontend requests.

### Database
SQLite database (`database.db`) is automatically created on first run.

## 🐛 Troubleshooting

### Backend won't start
- Check Python version: `python --version`
- Ensure virtual environment is activated
- Verify all dependencies are installed

### Frontend won't connect
- Ensure backend is running on port 5000
- Check proxy configuration in `package.json`
- Verify CORS is enabled in backend

### Database issues
- Delete `database.db` and restart backend to recreate
- Check file permissions for write access

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Support

For issues and questions, please open an issue on the repository.

---

**Happy coding! 🎉**
