import { useMemo, useState } from "react";
import { useTodoContext } from "./useTodoContext";
import { Task, TaskPriority } from "../models/Task";
import * as A from "fp-ts/Array";
import * as O from "fp-ts/Option";
import * as Ord from "fp-ts/lib/Ord";
import * as N from "fp-ts/number";
import { flow, pipe } from "fp-ts/lib/function";

export const useTaskFilter = () => {
	const { tasks, filterCondition } = useTodoContext();

	const byPriority = pipe(
		N.Ord,
		Ord.contramap((task: Task) => task.priority),
		Ord.reverse
	);

	const sortTask = A.sort(byPriority);

	const filterLabel = (tasks: Task[]) => {
		return pipe(
			O.fromNullable(filterCondition.label),
			O.fold(
				() => tasks,
				(label) => A.filter((task: Task) => task.label.includes(label))(tasks)
			)
		);
	};

	const filterCompleted = (isCompleted: boolean) => {
		return A.filter((task: Task) => task.isCompleted === isCompleted);
	};

	const filterPriority = (tasks: Task[]) => {
		return pipe(
			O.fromNullable(filterCondition.priority),
			O.fold(
				() => tasks,
				(priority) => {
					if (priority === TaskPriority.UNSET) {
						return tasks;
					}
					return A.filter<Task>((task) => task.priority === priority)(tasks);
				}
			)
		);
	};

	const getDisplayTodoItems = (isCompleted: boolean) => {
		return pipe(tasks, filterCompleted(isCompleted), filterLabel, filterPriority, sortTask);
	};

	const todoTasks = useMemo<Task[]>(() => {
		return getDisplayTodoItems(false);
	}, [tasks, filterCondition]);

	const completedTasks = useMemo<Task[]>(() => {
		return getDisplayTodoItems(true);
	}, [tasks, filterCondition]);

	return { todoTasks, completedTasks };
};
