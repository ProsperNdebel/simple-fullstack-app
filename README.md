# 📝 Simple Full-Stack Task Manager

A modern, production-ready task management application built with Flask (Python) and React. Features full CRUD operations, comprehensive testing, and a beautiful UI with gradient themes.

## 🎯 Features

- ✅ **Create Tasks** - Add new tasks with a clean, intuitive interface
- ✏️ **Edit Tasks** - Inline editing with save/cancel functionality
- ✔️ **Mark Complete** - Visual feedback with strikethrough styling
- 🗑️ **Delete Tasks** - Remove tasks with confirmation
- 🎨 **Modern UI** - Gradient design with smooth animations
- 🧪 **Full Test Coverage** - Comprehensive pytest suite for all endpoints
- 🔄 **Real-time Updates** - Instant UI updates with error handling

## 🏗️ Architecture

### Backend (Flask + SQLite)
- **Framework**: Flask with CORS support
- **Database**: SQLite3 for lightweight persistence
- **API**: RESTful endpoints for all CRUD operations
- **Testing**: pytest with fixture-based test isolation

### Frontend (React)
- **Framework**: React 18 with Hooks (useState, useEffect)
- **HTTP Client**: Axios for API communication
- **Styling**: Modern CSS with gradients, shadows, and animations
- **State Management**: Local component state

## 📁 Project Structure

```
simple-fullstack-app/
│
├── backend/                    # Flask API
│   ├── app.py                 # Main Flask application with routes
│   ├── models.py              # Database models (reserved for future use)
│   ├── test_app.py            # Comprehensive pytest test suite
│   ├── manual_test.py         # Manual testing script
│   ├── manual_test_delete.py  # Delete operation testing
│   ├── requirements.txt       # Python dependencies
│   └── database.db            # SQLite database (auto-created)
│
├── frontend/                   # React application
│   ├── public/
│   │   └── index.html         # HTML entry point
│   ├── src/
│   │   ├── api.js             # Axios API client
│   │   ├── app.js             # Main React component
│   │   ├── App.css            # Component styles
│   │   └── index.js           # React DOM entry
│   └── package.json           # Node dependencies & scripts
│
├── .gitignore                 # Git ignore rules
├── CHANGELOG.md               # Version history & changes
├── TESTING.md                 # Comprehensive testing guide
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+ & npm
- pip (Python package manager)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask server:**
   ```bash
   python app.py
   ```
   Backend runs on `http://127.0.0.1:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start React development server:**
   ```bash
   npm start
   ```
   Frontend runs on `http://localhost:3000`

## 🔌 API Endpoints

### GET `/tasks`
Retrieve all tasks from database.

**Response:**
```json
{
  "tasks": [
    {"id": 1, "task": "Buy groceries"}
  ]
}
```

### POST `/tasks`
Create a new task.

**Request Body:**
```json
{
  "task": "Complete project documentation"
}
```

**Response:**
```json
{
  "message": "Task added!",
  "id": 2
}
```

### PUT `/tasks/<id>`
Update an existing task by ID.

**Request Body:**
```json
{
  "task": "Updated task text"
}
```

**Response:**
```json
{
  "message": "Task updated!"
}
```

**Error Cases:**
- `404` - Task not found
- `400` - Missing or empty task text

### DELETE `/tasks/<id>`
Delete a task by ID.

**Response:**
```json
{
  "message": "Task deleted!"
}
```

**Error Case:**
- `404` - Task not found

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
pytest test_app.py -v
```

**Test Coverage:**
- ✅ GET all tasks (empty & with data)
- ✅ POST new task (success & validation)
- ✅ PUT update task (success, 404, empty text, missing field)
- ✅ DELETE task (success, 404, double delete)

### Manual Testing
```bash
# Basic CRUD operations
python manual_test.py

# Delete operation testing
python manual_test_delete.py
```

For detailed testing procedures, see [TESTING.md](TESTING.md).

## 🎨 UI Features

- **Gradient Background**: Purple-to-blue gradient (#667eea → #764ba2)
- **Card-based Layout**: Clean white cards with shadows
- **Smooth Animations**: Hover effects and transitions
- **Responsive Design**: Works on desktop and mobile
- **Inline Editing**: Edit tasks without leaving the page
- **Visual Feedback**: Loading states, error messages, success indicators

## 🛠️ Technology Stack

### Backend
- **Flask** 2.0+ - Lightweight web framework
- **Flask-CORS** - Cross-origin resource sharing
- **SQLite3** - Embedded database
- **pytest** - Testing framework
- **requests** - HTTP library for testing

### Frontend
- **React** 18.2.0 - UI framework
- **Axios** 1.12.2 - HTTP client
- **React Scripts** 5.0.1 - Build tooling

## 📝 Development Notes

### Database Initialization
The SQLite database is automatically created on first run. The schema:

```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY,
  task TEXT
)
```

### CORS Configuration
Backend allows all origins for development. For production, configure specific origins in `app.py`.

### Proxy Configuration
Frontend uses proxy to avoid CORS issues during development (configured in `package.json`).

## 🐛 Common Issues

### Backend won't start
- Check Python version: `python --version`
- Verify virtual environment is activated
- Ensure port 5000 is not in use

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check API_URL in `frontend/src/api.js`
- Ensure CORS is enabled

### Tests failing
- Delete `database.db` and restart tests
- Check pytest is installed: `pip list | grep pytest`
- Run with verbose flag: `pytest -v`

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Learn More

- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://react.dev/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [pytest Documentation](https://docs.pytest.org/)

---

**Built with ❤️ using Flask & React**
