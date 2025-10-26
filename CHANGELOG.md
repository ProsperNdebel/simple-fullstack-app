# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- **Edit Task Functionality (S1-2)**: Users can now edit existing tasks inline
  - Backend: Added PUT `/tasks/<id>` endpoint to update task text
  - Frontend: Added inline edit mode with Save/Cancel buttons
  - Validation: Empty task text is rejected with proper error messages
  - Error handling: Proper 404 response for non-existent tasks
  - Tests: Comprehensive backend tests for update functionality

### Technical Details
- **Backend Changes**:
  - New `update_task(task_id)` route handler in `backend/app.py`
  - Input validation for task text (required and non-empty)
  - Error responses for missing tasks (404) and invalid input (400)
  
- **Frontend Changes**:
  - Updated `frontend/src/api.js` with `updateTask()` function
  - Enhanced `frontend/src/App.js` with edit mode state management
  - Inline editing UI with edit/save/cancel buttons
  - Error handling with user-friendly alerts

- **Tests Added**:
  - `test_update_task`: Verify successful task update
  - `test_update_nonexistent_task`: Verify 404 for missing tasks
  - `test_update_task_empty_text`: Verify validation for empty text
  - `test_update_task_missing_task_field`: Verify validation for missing field
