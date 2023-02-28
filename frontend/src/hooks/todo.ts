import { createContext, useContext } from "react";
import { TodoStore } from "../models/Todo";

export const TodoContext = createContext<TodoStore>({
	tasks: [],
	filterCondition: {},
	updateTasks: () => {},
	updateFilterConditions: () => {},
});

export const useTodoContext = () => useContext(TodoContext);
