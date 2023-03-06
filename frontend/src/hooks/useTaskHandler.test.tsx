import { renderHook } from "@testing-library/react";
import { vi, describe, test, beforeEach, expect, SpyInstance } from "vitest";
import { useTaskHandler } from "./useTaskHandler";
import * as TodoApi from "../apis/TodoApi";
import { Task, TaskDto, TaskPriority } from "../models/Task";
import { nanoid } from "nanoid";

const tasks: TaskDto[] = [
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

const getAllTodos = vi.spyOn(TodoApi as any, "getAllTodos").mockImplementation(() => {
	return Promise.resolve({ data: tasks });
});

const createTodo = vi.spyOn(TodoApi as any, "createTodo").mockImplementation(() => {
	return Promise.resolve({ data: taskFromApi });
});

const updateTodo = vi.spyOn(TodoApi as any, "updateTodo").mockImplementation(() => {
	return Promise.resolve({ data: taskFromApi });
});

const deleteTodo = vi.spyOn(TodoApi as any, "deleteTodo").mockImplementation(() => {
	return Promise.resolve({});
});

describe("useTaskHandler test", () => {
	test("Get all task from api", async () => {
		const { result } = renderHook(() => useTaskHandler());
		const data = await result.current.getAllTask$();

		expect(getAllTodos).toHaveBeenCalled();
		expect(data.length).toBe(3);
	});

	test("Create task", async () => {
		const { result } = renderHook(() => useTaskHandler());
		const data = await result.current.createTask$(task);

		expect(createTodo).toHaveBeenCalled();
		expect(data).toStrictEqual(task);
	});

	test("Update task", async () => {
		const { result } = renderHook(() => useTaskHandler());
		const data = await result.current.updateTask$(task);

		expect(updateTodo).toHaveBeenCalled();
		expect(data).toStrictEqual(task);
	});

	test("Delete task", async () => {
		const { result } = renderHook(() => useTaskHandler());
		const data = await result.current.deleteTask$(task);

		expect(deleteTodo).toHaveBeenCalled();
		expect(data).toStrictEqual(task);
	});
});
