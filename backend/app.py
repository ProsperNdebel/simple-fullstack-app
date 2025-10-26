from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # allow frontend access

def get_db():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/tasks', methods=['GET'])
def get_tasks():
    conn = get_db()
    tasks = conn.execute('SELECT * FROM tasks').fetchall()
    conn.close()
    return jsonify([dict(row) for row in tasks])

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    task = data.get('task', '')
    conn = get_db()
    conn.execute('INSERT INTO tasks (task) VALUES (?)', (task,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Task added!'}), 201

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    """Update an existing task by ID"""
    data = request.get_json()
    
    # Validate request data
    if not data or 'task' not in data:
        return jsonify({'error': 'Task field is required'}), 400
    
    task = data.get('task', '').strip()
    if not task:
        return jsonify({'error': 'Task text is required'}), 400
    
    conn = get_db()
    
    # Check if task exists
    existing_task = conn.execute('SELECT * FROM tasks WHERE id = ?', (task_id,)).fetchone()
    if not existing_task:
        conn.close()
        return jsonify({'error': 'Task not found'}), 404
    
    # Update the task
    conn.execute('UPDATE tasks SET task = ? WHERE id = ?', (task, task_id))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Task updated!'}), 200

if __name__ == '__main__':
    # Initialize DB
    conn = get_db()
    conn.execute('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, task TEXT)')
    conn.close()
    app.run(debug=True)
