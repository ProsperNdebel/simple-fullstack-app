# Testing Guide

This document describes how to test the edit task functionality.

## Backend Tests

### Automated Tests

The backend includes comprehensive pytest tests for the edit functionality.

**Setup:**
```bash
cd backend
pip install -r requirements.txt
```

**Run tests:**
```bash
pytest test_app.py -v
```

**Test Coverage:**
- `test_update_task`: Verifies task can be updated successfully
- `test_update_nonexistent_task`: Verifies 404 error for missing tasks
- `test_update_task_empty_text`: Verifies validation for empty text
- `test_update_task_missing_task_field`: Verifies validation for missing data

### Manual API Testing

**Start the backend server:**
```bash
cd backend
python app.py
```

**Run the manual test script:**
```bash
cd backend
python manual_test.py
```

This script will:
1. Create a test task
2. Update the task text
3. Verify the update succeeded
4. Test error cases (non-existent task, empty text, missing field)

### Manual API Testing with curl

**1. Add a task:**
```bash
curl -X POST http://127.0.0.1:5000/tasks \
  -H "Content-Type: application/json" \
  -d '{"task": "Test task"}'
```

**2. Get all tasks (note the ID):**
```bash
curl http://127.0.0.1:5000/tasks
```

**3. Update a task (replace {id} with actual ID):**
```bash
curl -X PUT http://127.0.0.1:5000/tasks/{id} \
  -H "Content-Type: application/json" \
  -d '{"task": "Updated text"}'
```

**4. Test error cases:**
```bash
# Non-existent task (should return 404)
curl -X PUT http://127.0.0.1:5000/tasks/999 \
  -H "Content-Type: application/json" \
  -d '{"task": "Test"}'

# Empty text (should return 400)
curl -X PUT http://127.0.0.1:5000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"task": ""}'

# Missing task field (should return 400)
curl -X PUT http://127.0.0.1:5000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{}'
```

## Frontend Tests

### Manual UI Testing

**1. Start the backend:**
```bash
cd backend
python app.py
```

**2. Start the frontend (in a new terminal):**
```bash
cd frontend
npm install
npm start
```

**3. Test the edit functionality:**

- Open http://localhost:3000 in your browser
- Add a few tasks using the input field
- Click "Edit" button next to any task
- Modify the task text in the inline input
- Click "Save" to save changes
- Verify the task text is updated
- Click "Edit" again and then "Cancel" to test cancellation
- Try to save an empty task (should show error alert)

**Expected Behavior:**
- Edit button appears next to each task
- Clicking Edit shows an input field with current text
- Save button updates the task and returns to view mode
- Cancel button discards changes and returns to view mode
- Empty text shows an error alert
- UI updates immediately after successful save

## Integration Testing

**Full workflow test:**
1. Start both backend and frontend
2. Add a task: "Buy groceries"
3. Edit the task to: "Buy groceries and milk"
4. Verify the change persists after page refresh
5. Try editing multiple tasks in sequence
6. Verify all changes are saved correctly

## API Endpoint Documentation

### PUT /tasks/<id>

Updates the text of an existing task.

**Request:**
- Method: `PUT`
- URL: `/tasks/<id>` where `<id>` is the task ID
- Headers: `Content-Type: application/json`
- Body: `{"task": "Updated task text"}`

**Responses:**

- **200 OK**: Task updated successfully
  ```json
  {"message": "Task updated!"}
  ```

- **400 Bad Request**: Invalid input (empty text or missing field)
  ```json
  {"error": "Task text is required"}
  ```
  or
  ```json
  {"error": "Task field is required"}
  ```

- **404 Not Found**: Task with specified ID doesn't exist
  ```json
  {"error": "Task not found"}
  ```

## Troubleshooting

### Backend Tests Fail
- Ensure pytest is installed: `pip install pytest`
- Check that test_database.db is deleted between runs
- Verify Flask app is not running during tests

### Frontend Cannot Connect to Backend
- Verify backend is running on port 5000
- Check CORS is enabled in backend
- Verify API_URL in frontend/src/api.js is correct

### Changes Don't Persist
- Check that database.db file has write permissions
- Verify backend is actually saving changes (check logs)
- Try deleting database.db and restarting backend
