import { FilterCondition } from "./Filter";
import { Task } from "./Task";
import React from "react";

export type TodoStore = {
	tasks: Task[];
	filterCondition: FilterCondition;
	updateTasks: React.Dispatch<React.SetStateAction<Task[]>>;
	updateFilterConditions: React.Dispatch<React.SetStateAction<FilterCondition>>;
};
