import { TodoItem } from "./TodoItem";
import { logRoles, prettyDOM, render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import { Task, TaskPriority } from "../models/Task";
import { nanoid } from "nanoid";

const task: Task = {
	id: nanoid(),
	label: "Hello World",
	isCompleted: true,
	priority: TaskPriority.NORMAL,
};

describe("TodoItem Component", () => {
	test("Should render correctly.", () => {
		render(<TodoItem task={task} />);
		const checkbox = screen.getByRole("checkbox");
		const buttons = screen.getAllByRole("button");
		const textbox = screen.getByRole("textbox");

		expect(buttons.length).toBe(2);
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toBeChecked();
		expect(textbox).toBeInTheDocument();
		expect(textbox).toHaveDisplayValue("Hello World");
	});

	test("Should trigger changes on check item.", () => {
		const onChange = vi.fn();
		render(<TodoItem task={task} onChange={onChange} />);
		const checkbox = screen.getByRole("checkbox");
		fireEvent.click(checkbox);
		fireEvent.click(checkbox);
		fireEvent.click(checkbox);
		expect(onChange).toHaveBeenCalledTimes(3);
	});

	test("Should trigger changes on input text.", () => {
		const onChange = vi.fn();
		render(<TodoItem task={task} onChange={onChange} />);
		const textbox = screen.getByRole("textbox");
		fireEvent.change(textbox, { target: { value: "Type Something..." } });
		fireEvent.blur(textbox);
		fireEvent.change(textbox, { target: { value: "OK" } });
		fireEvent.blur(textbox);

		expect(onChange).toHaveBeenCalledTimes(4);
		expect(textbox).toHaveDisplayValue("OK");
	});

	test("Should trigger delete on click delete button.", () => {
		const onDelete = vi.fn();
		render(<TodoItem task={task} onDelete={onDelete} />);
		const button = screen.getAllByRole("button")[1];
		fireEvent.click(button);

		expect(onDelete).toHaveBeenCalled();
	});
});
