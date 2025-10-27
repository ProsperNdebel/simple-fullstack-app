import sqlite3

# Create database and initialize schema
conn = sqlite3.connect('database.db')
conn.execute('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, task TEXT)')

# Add some test data
test_tasks = [
    ("Buy groceries",),
    ("Write documentation",),
    ("Review pull requests",),
]

for task in test_tasks:
    conn.execute('INSERT INTO tasks (task) VALUES (?)', task)

conn.commit()
conn.close()

print("Database initialized successfully!")
print("Created tasks table with sample data")
