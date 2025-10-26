#!/usr/bin/env python3
"""
Manual test script to verify the edit task functionality
Run this with the Flask server running on http://127.0.0.1:5000
"""

import requests
import json

API_URL = "http://127.0.0.1:5000"

def test_edit_functionality():
    print("=" * 60)
    print("Testing Edit Task Functionality")
    print("=" * 60)
    
    # 1. Add a test task
    print("\n1. Adding a test task...")
    response = requests.post(f"{API_URL}/tasks", json={"task": "Original task text"})
    print(f"   Status: {response.status_code}")
    print(f"   Response: {response.json()}")
    
    # 2. Get all tasks to find the ID
    print("\n2. Getting all tasks...")
    response = requests.get(f"{API_URL}/tasks")
    tasks = response.json()
    print(f"   Status: {response.status_code}")
    print(f"   Tasks: {json.dumps(tasks, indent=2)}")
    
    if not tasks:
        print("   ❌ No tasks found!")
        return
    
    task_id = tasks[-1]['id']  # Get the last task
    print(f"   Using task ID: {task_id}")
    
    # 3. Update the task
    print(f"\n3. Updating task {task_id}...")
    response = requests.put(f"{API_URL}/tasks/{task_id}", 
                           json={"task": "Updated task text"})
    print(f"   Status: {response.status_code}")
    print(f"   Response: {response.json()}")
    
    # 4. Verify the update
    print("\n4. Verifying the update...")
    response = requests.get(f"{API_URL}/tasks")
    tasks = response.json()
    updated_task = next((t for t in tasks if t['id'] == task_id), None)
    if updated_task:
        print(f"   ✅ Task updated successfully!")
        print(f"   New text: {updated_task['task']}")
    else:
        print("   ❌ Task not found after update!")
    
    # 5. Test error cases
    print("\n5. Testing error cases...")
    
    # Test updating non-existent task
    print("\n   5a. Updating non-existent task (ID: 999)...")
    response = requests.put(f"{API_URL}/tasks/999", json={"task": "Test"})
    print(f"      Status: {response.status_code} (expected 404)")
    print(f"      Response: {response.json()}")
    
    # Test updating with empty text
    print(f"\n   5b. Updating task {task_id} with empty text...")
    response = requests.put(f"{API_URL}/tasks/{task_id}", json={"task": ""})
    print(f"      Status: {response.status_code} (expected 400)")
    print(f"      Response: {response.json()}")
    
    # Test updating without task field
    print(f"\n   5c. Updating task {task_id} without task field...")
    response = requests.put(f"{API_URL}/tasks/{task_id}", json={})
    print(f"      Status: {response.status_code} (expected 400)")
    print(f"      Response: {response.json()}")
    
    print("\n" + "=" * 60)
    print("Test completed!")
    print("=" * 60)

if __name__ == "__main__":
    try:
        test_edit_functionality()
    except requests.exceptions.ConnectionError:
        print("❌ Error: Could not connect to Flask server.")
        print("   Please make sure the server is running on http://127.0.0.1:5000")
    except Exception as e:
        print(f"❌ Error: {e}")
