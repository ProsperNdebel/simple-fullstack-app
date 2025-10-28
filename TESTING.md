# Testing Guide

This document describes how to test the application functionality.

## Backend Tests

### Automated Tests

The backend includes comprehensive pytest tests for all CRUD operations.

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

*Edit functionality:*
- `test_update_task`: Verifies task can be updated successfully
- `test_update_nonexistent_task`: Verifies 404 error for missing tasks
- `test_update_task_empty_text`: Verifies validation for empty text
- `test_update_task_missing_task_field`: Verifies validation for missing data

*Delete functionality:*
- `test_delete_task`: Verifies task can be deleted successfully
- `test_delete_nonexistent_task`: Verifies 404 error for missing tasks
- `test_delete_task_with_invalid_id`: Verifies 404 error for invalid ID format
- `test_delete_multiple_tasks`: Verifies sequential deletion works correctly
- `test_delete_task_twice`: Verifies proper error when deleting same task twice

### Manual API Testing

**Start the backend server:**
```bash
cd backend
python app.py
```

**Run the manual test scripts:**
```bash
cd backend
python manual_test.py        # Test edit functionality
python manual_test_delete.py  # Test delete functionality
```

The edit test script will:
1. Create a test task
2. Update the task text
3. Verify the update succeeded
4. Test error cases (non-existent task, empty text, missing field)

The delete test script will:
1. Create a test task
2. Delete the task
3. Verify the deletion succeeded
4. Test error cases (non-existent task, double deletion)

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

**4. Delete a task (replace {id} with actual ID):**
```bash
curl -X DELETE http://127.0.0.1:5000/tasks/{id}
```

**5. Test error cases:**
```bash
# Non-existent task for update (should return 404)
curl -X PUT http://127.0.0.1:5000/tasks/999 \
  -H "Content-Type: application/json" \
  -d '{"task": "Test"}'

# Empty text for update (should return 400)
curl -X PUT http://127.0.0.1:5000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"task": ""}'

# Missing task field for update (should return 400)
curl -X PUT http://127.0.0.1:5000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{}'

# Non-existent task for delete (should return 404)
curl -X DELETE http://127.0.0.1:5000/tasks/999
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

**4. Test the delete functionality:**

- Open http://localhost:3000 in your browser
- Add a few tasks using the input field
- Click "Delete" button next to any task
- Confirm the deletion in the confirmation dialog
- Verify the task is removed from the list
- Add more tasks and delete multiple tasks in sequence
- Verify all deletions work correctly

**Expected Behavior:**

*Edit:*
- Edit button appears next to each task
- Clicking Edit shows an input field with current text
- Save button updates the task and returns to view mode
- Cancel button discards changes and returns to view mode
- Empty text shows an error alert
- UI updates immediately after successful save

*Delete:*
- Delete button appears next to each task
- Clicking Delete shows a confirmation dialog
- Confirming deletion removes the task from the list
- UI updates immediately after successful deletion
- Error alert shown if deletion fails

## Integration Testing

**Full workflow test:**
1. Start both backend and frontend
2. Add a task: "Buy groceries"
3. Edit the task to: "Buy groceries and milk"
4. Verify the change persists after page refresh
5. Delete the task
6. Verify the task is removed and persists after page refresh
7. Try editing and deleting multiple tasks in sequence
8. Verify all changes are saved correctly

## API Endpoint Documentation

### GET /tasks

Retrieves all tasks.

**Request:**
- Method: `GET`
- URL: `/tasks`

**Response:**
- **200 OK**: Returns array of tasks
  ```json
  [
    {"id": 1, "task": "Task 1"},
    {"id": 2, "task": "Task 2"}
  ]
  ```

### POST /tasks

Creates a new task.

**Request:**
- Method: `POST`
- URL: `/tasks`
- Headers: `Content-Type: application/json`
- Body: `{"task": "New task text"}`

**Response:**
- **201 Created**: Task created successfully
  ```json
  {"message": "Task added!"}
  ```

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

### DELETE /tasks/<id>

Deletes a task by ID.

**Request:**
- Method: `DELETE`
- URL: `/tasks/<id>` where `<id>` is the task ID

**Responses:**

- **200 OK**: Task deleted successfully
  ```json
  {"message": "Task deleted!"}
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
