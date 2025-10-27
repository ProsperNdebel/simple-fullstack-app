# Database Tools Testing Guide

This document demonstrates all available database tools and how they work with the simple-fullstack-app.

## Application Database Overview

This application uses **SQLite** with a simple schema:

- **Database File**: `backend/database.db`
- **Tables**: 
  - `tasks` table with columns: `id` (INTEGER PRIMARY KEY), `task` (TEXT)

## Available Database Tools

### 1. ToolGetDatabaseSchema

Get the structure of database tables including column names, types, and constraints.

**Purpose**: Understand the database structure before writing queries

**Usage**:
```python
ToolGetDatabaseSchema(table_name='tasks')  # Get specific table
ToolGetDatabaseSchema()                     # Get all tables
```

**Example Output**:
```
Table: tasks
Columns:
  - id: INTEGER (PRIMARY KEY)
  - task: TEXT
```

**When to use**:
- Before writing queries to see available columns
- To understand table relationships
- When planning schema changes

---

### 2. ToolRunDatabaseQuery

Execute SQL queries against the database and return results.

**Purpose**: Query or modify data in the database

**Usage**:
```python
# SELECT queries
ToolRunDatabaseQuery(query="SELECT * FROM tasks")
ToolRunDatabaseQuery(query="SELECT * FROM tasks WHERE id = 1")
ToolRunDatabaseQuery(query="SELECT COUNT(*) FROM tasks")

# INSERT queries
ToolRunDatabaseQuery(
    query="INSERT INTO tasks (task) VALUES ('New task')",
    fetch_results=False
)

# UPDATE queries
ToolRunDatabaseQuery(
    query="UPDATE tasks SET task = 'Updated' WHERE id = 1",
    fetch_results=False
)

# DELETE queries
ToolRunDatabaseQuery(
    query="DELETE FROM tasks WHERE id = 3",
    fetch_results=False
)
```

**Parameters**:
- `query` (required): SQL query string
- `fetch_results` (optional): Whether to return results (default: True)

**When to use**:
- Check data in tables
- Verify database state during testing
- Debug data issues
- Run ad-hoc queries

---

### 3. ToolCreateDatabaseSnapshot

Create a backup of the database.

**Purpose**: Backup database before making risky changes

**Usage**:
```python
ToolCreateDatabaseSnapshot(snapshot_name='before_migration')
ToolCreateDatabaseSnapshot(snapshot_name='test_data_setup')
```

**What it does**:
- Creates a copy of the database file
- Saves to `./db_snapshots/` directory
- Preserves complete database state

**When to use**:
- Before running database migrations
- Before making bulk data changes
- To create test data snapshots
- To preserve known-good state for testing

---

### 4. ToolListDatabaseSnapshots

List all available database snapshots.

**Purpose**: See what backups are available

**Usage**:
```python
ToolListDatabaseSnapshots()
```

**Example Output**:
```
Snapshot: before_migration_20240115_143022.db
  Size: 8192 bytes
  Created: 2024-01-15T14:30:22

Snapshot: test_data_setup_20240115_143045.db
  Size: 12288 bytes
  Created: 2024-01-15T14:30:45
```

**When to use**:
- Before restoring to see available snapshots
- To check when backups were created
- To verify snapshot size

---

### 5. ToolRestoreDatabaseSnapshot

Restore database from a snapshot.

**Purpose**: Rollback to a previous database state

**Usage**:
```python
ToolRestoreDatabaseSnapshot(
    snapshot_file='before_migration_20240115_143022.db',
    confirm=True  # Required safety check
)
```

**⚠️ WARNING**: This will REPLACE the current database contents!

**When to use**:
- After a failed migration
- To reset to known test state
- To recover from bad data changes
- To reload test data

---

### 6. ToolCompareDatabaseSchemas

Compare current database schema with a snapshot.

**Purpose**: Verify migrations were applied correctly

**Usage**:
```python
ToolCompareDatabaseSchemas()
```

**What it shows**:
- Added tables/columns
- Removed tables/columns
- Modified column types or constraints
- Schema drift detection

**When to use**:
- After running migrations
- To verify schema matches expected state
- To detect schema drift between environments

---

### 7. ToolRunDatabaseMigration

Run database migrations using tools like Alembic, Django, or Flyway.

**Purpose**: Apply database schema changes

**Usage**:
```python
# Initialize migrations
ToolRunDatabaseMigration(action='init', migration_tool='alembic')

# Apply migrations
ToolRunDatabaseMigration(action='upgrade', revision='head')

# Rollback migration
ToolRunDatabaseMigration(action='downgrade', revision='-1')

# Show migration history
ToolRunDatabaseMigration(action='history')

# Show current migration state
ToolRunDatabaseMigration(action='current')
```

**Supported migration tools**:
- `alembic` - Python SQLAlchemy migrations
- `django` - Django ORM migrations
- `flyway` - Java-based migrations

**When to use**:
- Applying schema changes
- Rolling back migrations
- Checking migration status

---

## Complete Testing Workflow Example

Here's how you would use all database tools together in a typical workflow:

### Step 1: Understand the Schema
```python
# See what tables exist and their structure
ToolGetDatabaseSchema()
```

### Step 2: Check Current Data
```python
# Query current data
ToolRunDatabaseQuery(query="SELECT * FROM tasks")
```

### Step 3: Create Backup Before Changes
```python
# Backup before making changes
ToolCreateDatabaseSnapshot(snapshot_name='before_changes')
```

### Step 4: Make Changes
```python
# Add new data
ToolRunDatabaseQuery(
    query="INSERT INTO tasks (task) VALUES ('Test task')",
    fetch_results=False
)

# Modify existing data
ToolRunDatabaseQuery(
    query="UPDATE tasks SET task = 'Updated task' WHERE id = 1",
    fetch_results=False
)
```

### Step 5: Verify Changes
```python
# Check the updated data
ToolRunDatabaseQuery(query="SELECT * FROM tasks")
```

### Step 6: Restore if Needed
```python
# List available snapshots
ToolListDatabaseSnapshots()

# Restore from backup if something went wrong
ToolRestoreDatabaseSnapshot(
    snapshot_file='before_changes_20240115_143022.db',
    confirm=True
)
```

### Step 7: Run Migrations
```python
# If schema changes are needed
ToolRunDatabaseMigration(action='upgrade', revision='head')

# Compare schema with snapshot
ToolCompareDatabaseSchemas()
```

---

## Testing the Database Tools

### Method 1: Run the Test Script

I've created a comprehensive test script that demonstrates all database tools:

```bash
python test_database_tools.py
```

This script will:
1. Initialize a test database with sample data
2. Demonstrate all database tool operations
3. Show expected inputs and outputs
4. Clean up after itself

### Method 2: Manual Testing

You can manually test each tool by:

1. **Start the backend** (this creates database.db):
   ```bash
   cd backend
   python app.py
   ```

2. **Add some test data** using the API:
   ```bash
   curl -X POST http://127.0.0.1:5000/tasks \
     -H "Content-Type: application/json" \
     -d '{"task": "Test task 1"}'
   
   curl -X POST http://127.0.0.1:5000/tasks \
     -H "Content-Type: application/json" \
     -d '{"task": "Test task 2"}'
   ```

3. **Use database tools** to inspect and manipulate the data

---

## Common Use Cases

### Use Case 1: Debugging Failed Tests

```python
# 1. Check database schema
ToolGetDatabaseSchema(table_name='tasks')

# 2. Query data to see current state
ToolRunDatabaseQuery(query="SELECT * FROM tasks")

# 3. Check for specific issues
ToolRunDatabaseQuery(query="SELECT * FROM tasks WHERE task IS NULL OR task = ''")
```

### Use Case 2: Setting Up Test Data

```python
# 1. Create snapshot of empty database
ToolCreateDatabaseSnapshot(snapshot_name='empty_db')

# 2. Add test data
ToolRunDatabaseQuery(query="INSERT INTO tasks (task) VALUES ('Test 1')")
ToolRunDatabaseQuery(query="INSERT INTO tasks (task) VALUES ('Test 2')")

# 3. Create snapshot of test data
ToolCreateDatabaseSnapshot(snapshot_name='test_data')

# 4. Before each test, restore test data snapshot
ToolRestoreDatabaseSnapshot(snapshot_file='test_data.db', confirm=True)
```

### Use Case 3: Migration Testing

```python
# 1. Create snapshot before migration
ToolCreateDatabaseSnapshot(snapshot_name='before_migration')

# 2. Run migration
ToolRunDatabaseMigration(action='upgrade', revision='head')

# 3. Verify schema changes
ToolCompareDatabaseSchemas()

# 4. Test application with new schema
# ... run tests ...

# 5. If migration failed, rollback
ToolRestoreDatabaseSnapshot(snapshot_file='before_migration.db', confirm=True)
```

---

## Tips and Best Practices

1. **Always create snapshots before risky operations**
   - Before migrations
   - Before bulk updates
   - Before testing destructive operations

2. **Use descriptive snapshot names**
   - Include timestamp: `before_migration_20240115`
   - Include purpose: `test_data_setup`, `production_backup`

3. **Query before modifying**
   - Always SELECT before UPDATE or DELETE
   - Verify affected rows count
   - Test queries in read-only mode first

4. **Check schema before queries**
   - Use ToolGetDatabaseSchema to see available columns
   - Avoid typos in column names
   - Understand data types

5. **Clean up old snapshots**
   - Snapshots take disk space
   - Keep only necessary backups
   - Use ToolListDatabaseSnapshots to see what exists

6. **Test migrations on snapshots**
   - Create snapshot
   - Test migration
   - Verify results
   - Either commit or rollback

---

## Troubleshooting

### Problem: "table not found" errors
**Solution**: Use `ToolGetDatabaseSchema()` to see available tables

### Problem: "no such column" errors
**Solution**: Use `ToolGetDatabaseSchema(table_name='tasks')` to see column names

### Problem: Changes not persisting
**Solution**: 
- Check if queries are committing
- Verify database file permissions
- Use `ToolRunDatabaseQuery` to verify changes

### Problem: Can't restore snapshot
**Solution**:
- Use `ToolListDatabaseSnapshots()` to see available snapshots
- Check snapshot filename is correct
- Ensure `confirm=True` parameter is set

### Problem: Migration failed
**Solution**:
1. Check migration error logs
2. Restore from pre-migration snapshot
3. Fix migration script
4. Try again

---

## Summary

The database tools provide complete control over database operations:

- **Inspect**: `ToolGetDatabaseSchema` - understand structure
- **Query**: `ToolRunDatabaseQuery` - read and modify data  
- **Backup**: `ToolCreateDatabaseSnapshot` - save state
- **Restore**: `ToolRestoreDatabaseSnapshot` - rollback changes
- **List**: `ToolListDatabaseSnapshots` - see backups
- **Compare**: `ToolCompareDatabaseSchemas` - verify changes
- **Migrate**: `ToolRunDatabaseMigration` - apply schema changes

These tools work together to provide a complete database management workflow for development, testing, and debugging.
