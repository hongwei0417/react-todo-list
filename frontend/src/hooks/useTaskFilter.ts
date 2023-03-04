import { useMemo, useState } from "react";
import { useTodoContext } from "./useTodoContext";
import { Task, TaskPriority } from "../models/Task";

export const useTaskFilter = () => {
	const { tasks, filterCondition } = useTodoContext();

	const filterCompleted = (tasks: Task[], isCompleted: boolean) => {
		return tasks.filter((task) => task.isCompleted === isCompleted);
	};

	const filterLabel = (tasks: Task[]) => {
		if (filterCondition.label) {
			return tasks.filter((task) => task.label.includes(filterCondition.label!));
		}
		return tasks;
	};

	const filterPriority = (tasks: Task[]) => {
		if (filterCondition.priority !== TaskPriority.UNSET) {
			return tasks.filter((task) => task.priority === filterCondition.priority);
		}
		return tasks;
	};

	const sortTask = (tasks: Task[]) => {
		const cloneTasks = [...tasks];
		cloneTasks.sort((a, b) => {
			return b.priority - a.priority;
		});
		return cloneTasks;
	};

	const todoTasks = useMemo<Task[]>(() => {
		return sortTask(filterPriority(filterLabel(filterCompleted(tasks, false))));
	}, [tasks, filterCondition]);

	const completedTasks = useMemo<Task[]>(() => {
		return sortTask(filterPriority(filterLabel(filterCompleted(tasks, true))));
	}, [tasks, filterCondition]);

	return { todoTasks, completedTasks };
};
