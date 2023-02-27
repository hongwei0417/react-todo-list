import { createContext, useContext } from "react";
import { TodoStore } from "../models/Todo";

export const TodoContext = createContext<TodoStore>({
	createTask: () => {},
	changeTask: () => {},
	deleteTask: () => {},
});

export const useTodoContext = () => useContext(TodoContext);
