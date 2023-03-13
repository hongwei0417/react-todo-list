import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../apis/TodoApi";
import { Task, TaskDto } from "../models/Task";
import * as A from "fp-ts/Array";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";

export const useTaskHandler = () => {
	const taskDtoMapper = (task: TaskDto) => ({
		id: task._id!,
		label: task.label,
		isCompleted: task.isCompleted,
		priority: task.priority,
	});

	const taskDtoListMapper = A.map<TaskDto, Task>(taskDtoMapper);

	const getAllTask$ = (): TE.TaskEither<Error, Task[]> =>
		pipe(
			TE.tryCatch(() => getAllTodos(), E.toError),
			TE.map((res) => res.data),
			TE.map(taskDtoListMapper)
		);

	const createTask$ = (task: Task): TE.TaskEither<Error, Task> =>
		pipe(
			TE.tryCatch(() => createTodo(task), E.toError),
			TE.map((res) => res.data),
			TE.map(taskDtoMapper)
		);

	const updateTask$ = (task: Task): TE.TaskEither<Error, Task> =>
		pipe(
			TE.tryCatch(() => updateTodo(task.id, task), E.toError),
			TE.map((res) => res.data),
			TE.map(taskDtoMapper)
		);

	const deleteTask$ = (task: Task): TE.TaskEither<Error, Task> =>
		pipe(
			TE.tryCatch(() => deleteTodo(task.id), E.toError),
			TE.map(() => task)
		);

	return {
		getAllTask$,
		createTask$,
		updateTask$,
		deleteTask$,
	};
};
