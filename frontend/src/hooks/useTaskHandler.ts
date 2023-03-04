import { nanoid } from "nanoid";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../apis/TodoApi";
import { Task } from "../models/Task";
import { useTodoContext } from "./useTodoContext";

export const useTaskHandler = () => {
	const getAllTask = async (): Promise<Task[]> => {
		const res = await getAllTodos();
		console.log(res.data);
		return res.data.map<Task>((t) => {
			return {
				...t,
				id: t._id!,
			};
		});
	};

	const createTask = async (task: Task): Promise<Task> => {
		try {
			const res = await createTodo(task);
			return {
				...res.data,
				id: res.data._id!,
			};
		} catch (error) {
			throw error;
		}
	};

	const updateTask = async (task: Task): Promise<Task> => {
		try {
			const res = await updateTodo(task.id, task);
			return {
				...res.data,
				id: res.data._id!,
			};
		} catch (error) {
			throw error;
		}
	};

	const deleteTask = async (task: Task): Promise<Task> => {
		try {
			const res = await deleteTodo(task.id);
			return task;
		} catch (error) {
			throw error;
		}
	};

	return {
		getAllTask,
		createTask,
		updateTask,
		deleteTask,
	};
};
