import {
	logRoles,
	render,
	screen,
	queryByAttribute,
	fireEvent,
	waitFor,
	act,
} from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import Todo from "./Todo";
import * as TodoApi from "../apis/TodoApi";
import { TaskDto, TaskPriority } from "../models/Task";

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
		priority: 2,
	},
	{
		_id: "5502d82b4b7c9922aa4a1234",
		label: "Today is a good day",
		isCompleted: false,
		priority: 2,
	},
];

const taskFromApi: TaskDto = {
	_id: "6402d82b4b7c9922aa4a7871",
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

const deleteTodo$ = vi.spyOn(TodoApi as any, "deleteTodo").mockImplementation(() => {
	return Promise.resolve({});
});

describe("Todo Container", () => {
	test("Should render correctly.", async () => {
		render(<Todo />);

		const title = screen.getByRole("heading");
		const headerInput = screen.getByTestId("addTaskInput");
		const addButton = screen.getByTestId("addTaskButton");
		const searchInput = screen.getByTestId("filterKeywordInput");
		const priorityButton = screen.getByTestId("filterPriorityButton");

		expect(title).toBeInTheDocument();
		expect(headerInput).toBeInTheDocument();
		expect(addButton).toBeInTheDocument();
		expect(searchInput).toBeInTheDocument();
		expect(priorityButton).toBeInTheDocument();

		const todoItems = await screen.findAllByRole("listitem");
		expect(getAllTodos$).toHaveBeenCalled();
		expect(todoItems.length).toEqual(fakeTasks.length);
	});

	test("Should create a new task.", async () => {
		render(<Todo />);

		const headerInput = screen.getByTestId("addTaskInput");
		const addButton = screen.getByTestId("addTaskButton");
		await screen.findAllByRole("listitem");

		fireEvent.change(headerInput, { target: { value: "Hello Kevin" } });
		fireEvent.click(addButton);

		await waitFor(async () => {
			const todoItems = await screen.findAllByRole("listitem");
			expect(createTodo$).toHaveBeenCalled();
			expect(todoItems.length).toEqual(fakeTasks.length + 1);
		});
	});

	test("Should render items correctly on filter by text.", async () => {
		render(<Todo />);

		const filterKeywordInput = screen.getByTestId("filterKeywordInput");
		await screen.findAllByRole("listitem");

		fireEvent.change(filterKeywordInput, { target: { value: "Hello" } });

		await waitFor(async () => {
			const todoItems = await screen.findAllByRole("listitem");
			const filterItems = fakeTasks.filter((i) => i.label.includes("Hello"));
			expect(todoItems.length).toEqual(filterItems.length);
		});
	});

	test("Should render items correctly on filter by priority.", async () => {
		render(<Todo />);

		const filterPriorityButton = screen.getByTestId("filterPriorityButton");
		await screen.findAllByRole("listitem");

		fireEvent.click(filterPriorityButton);
		fireEvent.click(screen.getByText("Normal"));

		await waitFor(async () => {
			const todoItems = await screen.findAllByRole("listitem");
			const filterItems = fakeTasks.filter((i) => i.priority === TaskPriority.NORMAL);
			expect(todoItems.length).toEqual(filterItems.length);
		});
	});

	test("Should render items correctly on delete one task.", async () => {
		render(<Todo />);

		await screen.findAllByRole("listitem");

		const deleteItemButtons = screen.getAllByTestId("deleteItemButton");
		fireEvent.click(deleteItemButtons[0]);

		await waitFor(async () => {
			const todoItems = await screen.findAllByRole("listitem");
			const filterItems = fakeTasks.filter((i) => i.priority === TaskPriority.NORMAL);
			expect(deleteTodo$).toHaveBeenCalled();
			expect(todoItems.length).toEqual(filterItems.length);
		});
	});
});
