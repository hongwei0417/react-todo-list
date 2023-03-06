import { nanoid } from "nanoid";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../apis/TodoApi";
import { Task, TaskDto } from "../models/Task";
import { useTodoContext } from "./useTodoContext";
import * as A from "fp-ts/Array";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";

export const useTaskHandler = () => {
	const taskDtoMapper = (task: TaskDto) => ({
		id: task._id!,
		label: task.label,
		isCompleted: task.isCompleted,
		priority: task.priority,
	});

	const getAllTask$ = (): TE.TaskEither<Error, Task[]> =>
		pipe(
			TE.tryCatch(
				() => getAllTodos(),
				(reason) => new Error(String(reason))
			),
			TE.map((res) => A.map<TaskDto, Task>(taskDtoMapper)(res.data))
		);

	const createTask$ = (task: Task): TE.TaskEither<Error, Task> =>
		pipe(
			TE.tryCatch(
				() => createTodo(task),
				(reason) => new Error(String(reason))
			),
			TE.map((res) => res.data),
			TE.map(taskDtoMapper)
		);

	const updateTask$ = (task: Task): TE.TaskEither<Error, Task> =>
		pipe(
			TE.tryCatch(
				() => updateTodo(task.id, task),
				(reason) => new Error(String(reason))
			),
			TE.map((res) => res.data),
			TE.map(taskDtoMapper)
		);

	const deleteTask$ = (task: Task): TE.TaskEither<Error, Task> =>
		pipe(
			TE.tryCatch(
				() => deleteTodo(task.id),
				(reason) => new Error(String(reason))
			),
			TE.map(() => task),
			TE.mapLeft((error) => {
				throw error;
			})
		);

	return {
		getAllTask$,
		createTask$,
		updateTask$,
		deleteTask$,
	};
};
