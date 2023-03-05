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
import { TodoStore } from "../models/Todo";

describe("Todo Container", () => {
	let itemsNumber = 0;
	test("Render Components", async () => {
		render(<Todo />);

		// screen.debug();

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
		itemsNumber = todoItems.length;
		expect(todoItems.length).toBeGreaterThan(0);
	});

	test("Create new task", async () => {
		render(<Todo />);

		const headerInput = screen.getByTestId("addTaskInput");
		const addButton = screen.getByTestId("addTaskButton");
		await screen.findAllByRole("listitem");

		fireEvent.change(headerInput, { target: { value: "Hello" } });
		fireEvent.click(addButton);

		await waitFor(async () => {
			const todoItems = await screen.findAllByRole("listitem");
			expect(todoItems.length).toBe(itemsNumber + 1);
		});
	});

	test("Filter task by ", async () => {
		render(<Todo />);

		const headerInput = screen.getByTestId("addTaskInput");
		const addButton = screen.getByTestId("addTaskButton");
		await screen.findAllByRole("listitem");

		fireEvent.change(headerInput, { target: { value: "Hello" } });
		fireEvent.click(addButton);

		await waitFor(async () => {
			const todoItems = await screen.findAllByRole("listitem");
			expect(todoItems.length).toBe(itemsNumber + 1);
		});
	});
});
