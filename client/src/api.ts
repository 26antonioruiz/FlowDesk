import axios from "axios";

const API = "http://localhost:3000/api";

const getToken = () => localStorage.getItem("token");

export const api = axios.create({
  baseURL: API,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = token;
  return config;
});

// AUTH
export const login = (data: any) => api.post("/login", data);
export const register = (data: any) => api.post("/register", data);

// TASKS
export const getTasks = () => api.get("/tasks");
export const addTask = (data: any) => api.post("/tasks", data);
export const deleteTask = (id: number) => api.delete(`/tasks/${id}`);

// EXPENSES
export const getExpenses = () => api.get("/expenses");
export const addExpense = (data: any) => api.post("/expenses", data);
export const deleteExpense = (id: number) => api.delete(`/expenses/${id}`);