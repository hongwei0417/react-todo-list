import { FilterCondition } from "./Filter";
import { Task } from "./Task";

export type TodoStore = {
	tasks: Task[];
	filterCondition: FilterCondition;
	updateTasks: (tasks: Task[]) => void;
	updateFilterConditions: (condition: FilterCondition) => void;
};
