import { vi, describe, test, beforeEach, expect } from "vitest";
import { TodoStore } from "../models/Todo";
import { renderHook } from "@testing-library/react";
import { TodoContext } from "./useTodoContext";
import { useTaskFilter } from "./useTaskFilter";
import { Task, TaskPriority } from "../models/Task";

const tasks: Task[] = [
	{
		id: "6402d82b4b7c9922aa4a7871",
		label: "Hello Todo",
		isCompleted: false,
		priority: TaskPriority.NORMAL,
	},
	{
		id: "1202d82b4b7c9922aa4a7111",
		label: "Typescript is good",
		isCompleted: true,
		priority: TaskPriority.NORMAL,
	},
	{
		id: "5502d82b4b7c9922aa4a1234",
		label: "Do your best",
		isCompleted: false,
		priority: TaskPriority.HIGH,
	},
];

describe("useTaskFilter test", () => {
	let contextValue: TodoStore = {
		tasks,
		filterCondition: {},
		updateTasks: vi.fn(),
		updateFilterConditions: vi.fn(),
	};

	beforeEach(() => {
		contextValue = {
			tasks,
			filterCondition: {},
			updateTasks: vi.fn(),
			updateFilterConditions: vi.fn(),
		};
	});

	test("Filter completed", () => {
		const wrapper = ({ children }: any) => (
			<TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
		);
		const { result } = renderHook(() => useTaskFilter(), { wrapper });

		expect(result.current.todoTasks.length).toBe(2);
		expect(result.current.completedTasks.length).toBe(1);
	});

	test("Filter label", () => {
		contextValue.filterCondition = {
			label: "Typescript",
		};
		const wrapper = ({ children }: any) => (
			<TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
		);
		const { result } = renderHook(() => useTaskFilter(), { wrapper });

		expect(result.current.todoTasks.length).toBe(0);
		expect(result.current.completedTasks.length).toBe(1);
	});

	test("Filter priority", () => {
		contextValue.filterCondition = {
			priority: TaskPriority.NORMAL,
		};
		const wrapper = ({ children }: any) => (
			<TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
		);
		const { result } = renderHook(() => useTaskFilter(), { wrapper });

		expect(result.current.todoTasks.length).toBe(1);
		expect(result.current.completedTasks.length).toBe(1);
	});
});
