# Simple Fullstack Task Manager

A lightweight task management application built with Flask (backend) and React (frontend). This app demonstrates a simple fullstack architecture with CRUD operations for managing tasks.

## Features

- ✅ Create new tasks
- ✏️ Edit existing tasks
- ✔️ Mark tasks as completed
- 🗑️ Delete tasks
- 📊 Track completed tasks count
- 🔄 Real-time updates

## Tech Stack

**Backend:**
- Flask - Python web framework
- SQLite - Lightweight database
- Flask-CORS - Cross-origin resource sharing

**Frontend:**
- React - UI framework
- Axios - HTTP client
- Modern ES6+ JavaScript

## Project Structure

```
simple-fullstack-app/
│
├── backend/                # Flask backend
│   ├── app.py             # Main Flask application
│   ├── models.py          # Database model logic (optional)
│   ├── database.db        # SQLite database file (auto-created)
│   └── requirements.txt   # Python dependencies
│
├── frontend/              # React frontend
│   ├── public/
│   │   └── index.html     # Root HTML entry
│   ├── src/
│   │   ├── api.js         # Axios API calls
│   │   ├── App.js         # Main React component
│   │   └── index.js       # React entry point
│   ├── package.json       # Frontend dependencies + scripts
│   └── package-lock.json
│
├── .gitignore             # Ignore venv, node_modules, etc.
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Python 3.8 or higher
- Node.js 14.x or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
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

   The backend will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The frontend will open in your browser at `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/<id>` | Update a task |
| DELETE | `/tasks/<id>` | Delete a task |

## Usage

1. Start both backend and frontend servers (see setup instructions above)
2. Open your browser to `http://localhost:3000`
3. Add tasks using the input field
4. Click on tasks to mark them as completed
5. Edit or delete tasks using the respective buttons

## Development

### Running Tests

See [TESTING.md](TESTING.md) for testing instructions.

### Database

The SQLite database is automatically created when you first run the backend. It stores tasks with the following schema:
- `id` - Primary key
- `task` - Task description
- `completed` - Boolean status

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
