#!/usr/bin/env python3
"""
Manual test script to verify the delete task functionality
Run this with the Flask server running on http://127.0.0.1:5000
"""

import requests
import json

API_URL = "http://127.0.0.1:5000"

def test_delete_functionality():
    print("=" * 60)
    print("Testing Delete Task Functionality")
    print("=" * 60)

    # 1. Add a test task
    print("\n1. Adding a test task...")
    response = requests.post(f"{API_URL}/tasks", json={"task": "Task to be deleted"})
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

    task_id = tasks[-1]['id']  # Get the ID of the last task
    print(f"\n   Using task ID: {task_id}")

    # 3. Delete the task
    print("\n3. Deleting the task...")
    response = requests.delete(f"{API_URL}/tasks/{task_id}")
    print(f"   Status: {response.status_code}")
    print(f"   Response: {response.json()}")
    
    if response.status_code == 200:
        print("   ✅ Task deleted successfully!")
    else:
        print(f"   ❌ Failed to delete task!")
        return

    # 4. Verify task was deleted
    print("\n4. Verifying task was deleted...")
    response = requests.get(f"{API_URL}/tasks")
    tasks_after = response.json()
    print(f"   Status: {response.status_code}")
    print(f"   Tasks after deletion: {json.dumps(tasks_after, indent=2)}")
    
    task_still_exists = any(t['id'] == task_id for t in tasks_after)
    if not task_still_exists:
        print("   ✅ Task successfully removed from database!")
    else:
        print("   ❌ Task still exists in database!")

    # 5. Test deleting non-existent task
    print("\n5. Testing deletion of non-existent task (ID: 999)...")
    response = requests.delete(f"{API_URL}/tasks/999")
    print(f"   Status: {response.status_code}")
    print(f"   Response: {response.json()}")
    
    if response.status_code == 404:
        print("   ✅ Correctly returned 404 for non-existent task!")
    else:
        print(f"   ❌ Expected 404, got {response.status_code}")

    # 6. Test deleting the same task twice
    print("\n6. Testing double deletion (deleting same task twice)...")
    print(f"   First deletion (creating new task first)...")
    response = requests.post(f"{API_URL}/tasks", json={"task": "Double delete test"})
    tasks = requests.get(f"{API_URL}/tasks").json()
    new_task_id = tasks[-1]['id']
    
    print(f"   Deleting task {new_task_id} first time...")
    response1 = requests.delete(f"{API_URL}/tasks/{new_task_id}")
    print(f"   First delete status: {response1.status_code}")
    
    print(f"   Deleting task {new_task_id} second time...")
    response2 = requests.delete(f"{API_URL}/tasks/{new_task_id}")
    print(f"   Second delete status: {response2.status_code}")
    print(f"   Second delete response: {response2.json()}")
    
    if response1.status_code == 200 and response2.status_code == 404:
        print("   ✅ Correctly handled double deletion!")
    else:
        print(f"   ❌ Expected 200 then 404, got {response1.status_code} then {response2.status_code}")

    print("\n" + "=" * 60)
    print("Delete Functionality Testing Complete!")
    print("=" * 60)

if __name__ == "__main__":
    try:
        test_delete_functionality()
    except requests.exceptions.ConnectionError:
        print("\n❌ Error: Could not connect to the Flask server.")
        print("   Make sure the server is running on http://127.0.0.1:5000")
        print("   Start it with: cd backend && python app.py")
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
