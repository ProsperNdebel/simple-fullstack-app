# Database Tools Live Demo

This document shows actual database tool commands you can run against the simple-fullstack-app.

## Prerequisites

1. The backend service must be running (to initialize database.db)
2. Database tools must be available in the environment

## Demo Script

### Demo 1: Inspect Database Schema

```python
# Get all tables in the database
ToolGetDatabaseSchema()

# Expected Output:
# Table: tasks
# Columns:
#   - id: INTEGER (PRIMARY KEY)
#   - task: TEXT
```

```python
# Get specific table schema
ToolGetDatabaseSchema(table_name='tasks')

# Expected Output:
# Table: tasks
# Columns:
#   - id: INTEGER (PRIMARY KEY)  
#   - task: TEXT
```

---

### Demo 2: Query Database

```python
# Get all tasks
ToolRunDatabaseQuery(query="SELECT * FROM tasks")

# Expected Output:
# [
#   {"id": 1, "task": "Buy groceries"},
#   {"id": 2, "task": "Write documentation"},
#   {"id": 3, "task": "Review pull requests"}
# ]
```

```python
# Get specific task
ToolRunDatabaseQuery(query="SELECT * FROM tasks WHERE id = 1")

# Expected Output:
# [{"id": 1, "task": "Buy groceries"}]
```

```python
# Count tasks
ToolRunDatabaseQuery(query="SELECT COUNT(*) as total FROM tasks")

# Expected Output:
# [{"total": 3}]
```

```python
# Search tasks
ToolRunDatabaseQuery(
    query="SELECT * FROM tasks WHERE task LIKE '%documentation%'"
)

# Expected Output:
# [{"id": 2, "task": "Write documentation"}]
```

---

### Demo 3: Modify Database

```python
# Insert a new task
ToolRunDatabaseQuery(
    query="INSERT INTO tasks (task) VALUES ('Test database tools')",
    fetch_results=False
)

# Expected Output:
# Query executed successfully
# Rows affected: 1
```

```python
# Update a task
ToolRunDatabaseQuery(
    query="UPDATE tasks SET task = 'Buy groceries AND milk' WHERE id = 1",
    fetch_results=False
)

# Expected Output:
# Query executed successfully
# Rows affected: 1
```

```python
# Verify the update
ToolRunDatabaseQuery(query="SELECT * FROM tasks WHERE id = 1")

# Expected Output:
# [{"id": 1, "task": "Buy groceries AND milk"}]
```

```python
# Delete a task
ToolRunDatabaseQuery(
    query="DELETE FROM tasks WHERE id = 3",
    fetch_results=False
)

# Expected Output:
# Query executed successfully
# Rows affected: 1
```

---

### Demo 4: Create and Manage Snapshots

```python
# Create a snapshot of current state
ToolCreateDatabaseSnapshot(snapshot_name='demo_backup')

# Expected Output:
# ✓ Snapshot created: demo_backup
# Location: ./db_snapshots/demo_backup_20240115_143022.db
# Size: 8192 bytes
```

```python
# List all snapshots
ToolListDatabaseSnapshots()

# Expected Output:
# Snapshots (2 found):
#   - demo_backup_20240115_143022.db
#     Size: 8192 bytes
#     Created: 2024-01-15T14:30:22
#   - test_data_20240115_140000.db
#     Size: 12288 bytes
#     Created: 2024-01-15T14:00:00
```

```python
# Make some destructive changes
ToolRunDatabaseQuery(
    query="DELETE FROM tasks",
    fetch_results=False
)

# Verify data is gone
ToolRunDatabaseQuery(query="SELECT COUNT(*) as total FROM tasks")
# Output: [{"total": 0}]
```

```python
# Restore from snapshot
ToolRestoreDatabaseSnapshot(
    snapshot_file='demo_backup_20240115_143022.db',
    confirm=True
)

# Expected Output:
# ✓ Database restored from snapshot: demo_backup_20240115_143022.db
# ✓ All data has been restored
```

```python
# Verify data is back
ToolRunDatabaseQuery(query="SELECT COUNT(*) as total FROM tasks")
# Output: [{"total": 3}]  (or whatever was there before)
```

---

### Demo 5: Compare Schemas

```python
# This compares the current database schema with the last snapshot
ToolCompareDatabaseSchemas()

# Expected Output:
# Schema comparison:
#   No differences found - schemas match
```

**After making schema changes:**

```python
# First, let's add a column
ToolRunDatabaseQuery(
    query="ALTER TABLE tasks ADD COLUMN completed BOOLEAN DEFAULT 0",
    fetch_results=False
)

# Now compare
ToolCompareDatabaseSchemas()

# Expected Output:
# Schema differences detected:
#   Table: tasks
#     Added columns:
#       - completed: BOOLEAN DEFAULT 0
```

---

### Demo 6: Database Migrations

**Note**: This requires a migration tool like Alembic to be set up

```python
# Check current migration status
ToolRunDatabaseMigration(
    action='current',
    migration_tool='alembic'
)

# Expected Output:
# Current migration: abc123def456 (head)
```

```python
# View migration history
ToolRunDatabaseMigration(
    action='history',
    migration_tool='alembic'
)

# Expected Output:
# Migration history:
#   abc123def456 -> Add completed column
#   xyz789abc012 -> Initial schema
```

```python
# Apply migrations
ToolRunDatabaseMigration(
    action='upgrade',
    revision='head',
    migration_tool='alembic'
)

# Expected Output:
# Running upgrade abc123def456 -> xyz789ghi345
# ✓ Migration applied successfully
```

```python
# Rollback migration
ToolRunDatabaseMigration(
    action='downgrade',
    revision='-1',
    migration_tool='alembic'
)

# Expected Output:
# Running downgrade xyz789ghi345 -> abc123def456
# ✓ Migration rolled back successfully
```

---

## Complete Workflow Example

Here's a complete workflow testing the edit task functionality:

```python
# Step 1: Check current state
print("Step 1: Checking database schema...")
ToolGetDatabaseSchema(table_name='tasks')

# Step 2: View current tasks
print("\nStep 2: Viewing current tasks...")
ToolRunDatabaseQuery(query="SELECT * FROM tasks")

# Step 3: Create backup before testing
print("\nStep 3: Creating backup...")
ToolCreateDatabaseSnapshot(snapshot_name='before_edit_test')

# Step 4: Add test task
print("\nStep 4: Adding test task...")
ToolRunDatabaseQuery(
    query="INSERT INTO tasks (task) VALUES ('Test edit functionality')",
    fetch_results=False
)

# Get the task ID
result = ToolRunDatabaseQuery(
    query="SELECT id FROM tasks WHERE task = 'Test edit functionality'"
)
task_id = result[0]['id']
print(f"Created task with ID: {task_id}")

# Step 5: Update the task (simulating the edit endpoint)
print(f"\nStep 5: Updating task {task_id}...")
ToolRunDatabaseQuery(
    query=f"UPDATE tasks SET task = 'EDITED: Test edit functionality' WHERE id = {task_id}",
    fetch_results=False
)

# Step 6: Verify the update
print("\nStep 6: Verifying update...")
result = ToolRunDatabaseQuery(
    query=f"SELECT * FROM tasks WHERE id = {task_id}"
)
print(f"Updated task: {result[0]}")

# Step 7: Test error case - task not found
print("\nStep 7: Testing non-existent task (should fail gracefully)...")
result = ToolRunDatabaseQuery(
    query="SELECT * FROM tasks WHERE id = 999999"
)
print(f"Result for non-existent task: {result}")  # Should be empty list

# Step 8: Test edge case - empty task text
print("\nStep 8: Testing update with empty text...")
ToolRunDatabaseQuery(
    query=f"UPDATE tasks SET task = '' WHERE id = {task_id}",
    fetch_results=False
)

result = ToolRunDatabaseQuery(
    query=f"SELECT * FROM tasks WHERE id = {task_id}"
)
print(f"Task with empty text: {result[0]}")

# Step 9: Restore from backup
print("\nStep 9: Restoring from backup...")
snapshots = ToolListDatabaseSnapshots()
# Find our snapshot
snapshot_file = 'before_edit_test_TIMESTAMP.db'  # Use actual filename
ToolRestoreDatabaseSnapshot(snapshot_file=snapshot_file, confirm=True)

# Step 10: Verify restoration
print("\nStep 10: Verifying restoration...")
result = ToolRunDatabaseQuery(query="SELECT * FROM tasks")
print(f"Tasks after restoration: {result}")
```

---

## Performance Testing

Test database performance under load:

```python
# Test 1: Bulk insert performance
print("Testing bulk insert...")
ToolCreateDatabaseSnapshot(snapshot_name='before_bulk_insert')

for i in range(100):
    ToolRunDatabaseQuery(
        query=f"INSERT INTO tasks (task) VALUES ('Bulk task {i}')",
        fetch_results=False
    )

# Check count
result = ToolRunDatabaseQuery(query="SELECT COUNT(*) as total FROM tasks")
print(f"Total tasks after bulk insert: {result[0]['total']}")

# Test 2: Query performance
print("\nTesting query performance...")
result = ToolRunDatabaseQuery(
    query="SELECT * FROM tasks WHERE task LIKE '%Bulk%'"
)
print(f"Found {len(result)} bulk tasks")

# Cleanup
ToolRestoreDatabaseSnapshot(
    snapshot_file='before_bulk_insert_TIMESTAMP.db',
    confirm=True
)
```

---

## Error Handling Examples

```python
# Example 1: Invalid SQL syntax
try:
    ToolRunDatabaseQuery(query="SELCT * FROM tasks")  # Typo
except Exception as e:
    print(f"Caught expected error: {e}")
    # Error: near "SELCT": syntax error

# Example 2: Non-existent table
try:
    ToolRunDatabaseQuery(query="SELECT * FROM users")
except Exception as e:
    print(f"Caught expected error: {e}")
    # Error: no such table: users

# Example 3: Invalid column
try:
    ToolRunDatabaseQuery(query="SELECT username FROM tasks")
except Exception as e:
    print(f"Caught expected error: {e}")
    # Error: no such column: username

# Example 4: Restore non-existent snapshot
try:
    ToolRestoreDatabaseSnapshot(
        snapshot_file='does_not_exist.db',
        confirm=True
    )
except Exception as e:
    print(f"Caught expected error: {e}")
    # Error: Snapshot file not found
```

---

## Best Practices Demonstrated

1. **Always create snapshots before risky operations**
2. **Query data before and after modifications to verify**
3. **Use transactions for related changes** (if supported)
4. **Test error cases explicitly**
5. **Clean up test data using snapshots**
6. **Use descriptive snapshot names with context**
7. **Verify schema before complex queries**
8. **Count affected rows for bulk operations**

---

## Integration with Backend Testing

You can use these tools alongside the existing backend tests:

```python
# In test setup
def setup_test_database():
    # Create clean database snapshot
    ToolRunDatabaseQuery(query="DELETE FROM tasks", fetch_results=False)
    ToolRunDatabaseQuery(
        query="INSERT INTO tasks (task) VALUES ('Test task 1')",
        fetch_results=False
    )
    ToolCreateDatabaseSnapshot(snapshot_name='test_baseline')

# Before each test
def reset_database():
    ToolRestoreDatabaseSnapshot(
        snapshot_file='test_baseline_TIMESTAMP.db',
        confirm=True
    )

# In test
def test_update_task():
    # Setup
    reset_database()
    
    # Get task
    tasks = ToolRunDatabaseQuery(query="SELECT * FROM tasks LIMIT 1")
    task_id = tasks[0]['id']
    
    # Update via API (or directly)
    ToolRunDatabaseQuery(
        query=f"UPDATE tasks SET task = 'Updated' WHERE id = {task_id}",
        fetch_results=False
    )
    
    # Verify
    result = ToolRunDatabaseQuery(
        query=f"SELECT * FROM tasks WHERE id = {task_id}"
    )
    assert result[0]['task'] == 'Updated'
```

---

## Summary

These database tools provide complete database management capabilities:

✅ **Inspection**: View schema and query data  
✅ **Modification**: Insert, update, delete records  
✅ **Backup**: Create snapshots at any point  
✅ **Recovery**: Restore from any snapshot  
✅ **Comparison**: Detect schema changes  
✅ **Migration**: Apply and rollback migrations  

Use them throughout development and testing for complete database control!
