import axios from "axios";
import { Task, TaskDto } from "../models/Task";

export const BASE_API_URL = import.meta.env.VITE_BASE_API || "http://localhost:8080";

console.log(import.meta.env);

const TodoAPI = axios.create({
	baseURL: `${BASE_API_URL}/api/todo`,
});

export const getAllTodos = () => TodoAPI.get<TaskDto[]>("/");

export const createTodo = (data: Task) => TodoAPI.post<TaskDto>("/", data);

export const updateTodo = (id: string, data: Task) => TodoAPI.put<TaskDto>(`/${id}`, data);

export const deleteTodo = (id: string) => TodoAPI.delete(`/${id}`);
