import { renderHook } from "@testing-library/react";
import { vi, describe, test, beforeEach, expect, SpyInstance } from "vitest";
import { useTaskHandler } from "./useTaskHandler";
import * as TodoApi from "../apis/TodoApi";
import { Task, TaskDto, TaskPriority } from "../models/Task";

const fakeTasks: TaskDto[] = [
	{
		_id: "6402d82b4b7c9922aa4a7871",
		label: "Hello Todo",
		isCompleted: false,
		priority: 0,
	},
	{
		_id: "1202d82b4b7c9922aa4a7111",
		label: "Typescript is good",
		isCompleted: true,
		priority: 0,
	},
	{
		_id: "5502d82b4b7c9922aa4a1234",
		label: "Do your best",
		isCompleted: false,
		priority: 1,
	},
];

const taskFromApi: TaskDto = {
	_id: "6402d82b4b7c9922aa4a7871",
	label: "New Task Add",
	isCompleted: true,
	priority: TaskPriority.NORMAL,
};

const task: Task = {
	id: "6402d82b4b7c9922aa4a7871",
	label: "New Task Add",
	isCompleted: true,
	priority: TaskPriority.NORMAL,
};

const getAllTodos$ = vi.spyOn(TodoApi as any, "getAllTodos").mockImplementation(() => {
	return Promise.resolve({ data: fakeTasks });
});

const createTodo$ = vi.spyOn(TodoApi as any, "createTodo").mockImplementation(() => {
	return Promise.resolve({ data: taskFromApi });
});

const updateTodo$ = vi.spyOn(TodoApi as any, "updateTodo").mockImplementation(() => {
	return Promise.resolve({ data: taskFromApi });
});

const deleteTodo$ = vi.spyOn(TodoApi as any, "deleteTodo").mockImplementation(() => {
	return Promise.resolve({});
});

describe("useTaskHandler hook", () => {
	test("Should get all task from mock api.", async () => {
		const { result } = renderHook(() => useTaskHandler());
		const data = await result.current.getAllTask$()();
		if (data._tag === "Right") {
			expect(getAllTodos$).toHaveBeenCalled();
			expect(data.right.length).toBe(3);
		}
	});

	test("Should create new task from mock api.", async () => {
		const { result } = renderHook(() => useTaskHandler());
		const data = await result.current.createTask$(task)();
		if (data._tag === "Right") {
			expect(createTodo$).toHaveBeenCalled();
			expect(data.right).toStrictEqual(task);
		}
	});

	test("Should update one task from mock api.", async () => {
		const { result } = renderHook(() => useTaskHandler());
		const data = await result.current.updateTask$(task)();
		if (data._tag === "Right") {
			expect(updateTodo$).toHaveBeenCalled();
			expect(data.right).toStrictEqual(task);
		}
	});

	test("Should delete one task from mock api.", async () => {
		const { result } = renderHook(() => useTaskHandler());
		const data = await result.current.deleteTask$(task)();
		if (data._tag === "Right") {
			expect(deleteTodo$).toHaveBeenCalled();
			expect(data.right).toStrictEqual(task);
		}
	});
});
