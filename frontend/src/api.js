import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

export const getTasks = () => axios.get(`${API_URL}/tasks`);
export const addTask = (task) => axios.post(`${API_URL}/tasks`, { task });
