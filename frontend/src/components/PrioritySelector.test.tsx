import { fireEvent, logRoles, render, screen } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import PrioritySelector from "./PrioritySelector";
import { TaskPriority } from "../models/Task";

const options = Object.values(TaskPriority);

describe("PrioritySelector Component", () => {
	test("Should show four options on open", () => {
		render(<PrioritySelector />);
		const openButton = screen.getByRole("button");
		fireEvent.click(openButton);
		const items = screen.getAllByRole("menuitem");
		for (let i = 0; i < items.length; i++) {
			expect(items[i].textContent?.toUpperCase()).toBe(options[i]);
		}
	});

	test("Should trigger onChange when select the option", () => {
		const onChange = vi.fn();
		render(<PrioritySelector onChange={onChange} />);
		const openButton = screen.getByRole("button");
		fireEvent.click(openButton);
		fireEvent.click(screen.getByText("Normal"));
		expect(onChange).toHaveBeenCalled();
	});
});
