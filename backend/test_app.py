import pytest
import json
import os
import sqlite3
import app as app_module
from app import app


@pytest.fixture
def client():
    """Create a test client and test database"""
    # Use a test database
    app.config['TESTING'] = True
    
    # Setup test database
    conn = sqlite3.connect('test_database.db')
    conn.execute('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, task TEXT)')
    conn.close()
    
    # Override get_db to use test database
    original_get_db = app_module.get_db
    
    def test_get_db():
        conn = sqlite3.connect('test_database.db')
        conn.row_factory = sqlite3.Row
        return conn
    
    app_module.get_db = test_get_db
    
    with app.test_client() as client:
        yield client
    
    # Restore original get_db
    app_module.get_db = original_get_db
    
    # Cleanup test database
    if os.path.exists('test_database.db'):
        os.remove('test_database.db')


@pytest.fixture
def sample_task(client):
    """Create a sample task for testing"""
    # Insert a task directly into database
    conn = sqlite3.connect('test_database.db')
    cursor = conn.execute('INSERT INTO tasks (task) VALUES (?)', ('Sample task',))
    task_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return task_id


def test_get_tasks(client):
    """Test getting all tasks"""
    response = client.get('/tasks')
    assert response.status_code == 200
    assert isinstance(response.json, list)


def test_add_task(client):
    """Test adding a new task"""
    response = client.post('/tasks', 
                          data=json.dumps({'task': 'Test task'}),
                          content_type='application/json')
    assert response.status_code == 201
    assert response.json['message'] == 'Task added!'


def test_update_task(client, sample_task):
    """Test updating an existing task"""
    task_id = sample_task
    response = client.put(f'/tasks/{task_id}',
                         data=json.dumps({'task': 'Updated task text'}),
                         content_type='application/json')
    assert response.status_code == 200
    assert response.json['message'] == 'Task updated!'
    
    # Verify the task was actually updated
    conn = sqlite3.connect('test_database.db')
    conn.row_factory = sqlite3.Row
    task = conn.execute('SELECT * FROM tasks WHERE id = ?', (task_id,)).fetchone()
    conn.close()
    assert task['task'] == 'Updated task text'


def test_update_nonexistent_task(client):
    """Test updating a task that doesn't exist"""
    response = client.put('/tasks/999',
                         data=json.dumps({'task': 'Updated text'}),
                         content_type='application/json')
    assert response.status_code == 404
    assert 'not found' in response.json['error'].lower()


def test_update_task_empty_text(client, sample_task):
    """Test updating a task with empty text"""
    task_id = sample_task
    response = client.put(f'/tasks/{task_id}',
                         data=json.dumps({'task': ''}),
                         content_type='application/json')
    assert response.status_code == 400
    assert 'required' in response.json['error'].lower()


def test_update_task_missing_task_field(client, sample_task):
    """Test updating a task without the task field"""
    task_id = sample_task
    response = client.put(f'/tasks/{task_id}',
                         data=json.dumps({}),
                         content_type='application/json')
    assert response.status_code == 400
    assert 'required' in response.json['error'].lower()
