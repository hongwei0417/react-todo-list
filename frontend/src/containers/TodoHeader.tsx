import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import OutlinedInput from "@mui/material/OutlinedInput";
import PrioritySelector from "../components/PrioritySelector";
import InputAdornment from "@mui/material/InputAdornment";
import React, { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useTodoContext } from "../hooks/useTodoContext";
import { Task, TaskPriority } from "../models/Task";
import { getAllTodos } from "../apis/TodoApi";
import { useTaskHandler } from "../hooks/useTaskHandler";

type Props = {};

const Container = styled.div`
	/* border: 1px solid red; */
	display: flex;
	gap: 10px;
	max-height: 10%;
`;

const TaskInput = styled((props) => (
	<OutlinedInput
		inputProps={{
			"data-testid": props["data-testid"],
		}}
	/>
))`
	& legend {
		display: none;
	}
	& fieldset {
		top: 0;
	}
`;

const initialTask: Task = { id: "", label: "", priority: TaskPriority.UNSET, isCompleted: false };

export const TodoHeader: React.FC<Props> = ({}) => {
	const { tasks, updateTasks } = useTodoContext();
	const [newTask, setNewTask] = useState<Task>(initialTask);
	const { getAllTask, createTask } = useTaskHandler();

	const handleNewTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTask((task) => {
			return {
				...task,
				label: e.target.value,
			};
		});
	};

	const handleNewTaskPriorityChange = (priority: TaskPriority) => {
		setNewTask((task) => {
			return {
				...task,
				priority,
			};
		});
	};

	const handleNewTaskEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			addTask();
		}
	};

	const handleNewTaskClick = (e: MouseEvent<HTMLButtonElement>) => {
		addTask();
	};

	const addTask = async () => {
		const resTask = await createTask(newTask);
		updateTasks([...tasks, resTask]);
	};

	return (
		<Container>
			<TaskInput
				label="Task"
				type="text"
				data-testid="addTaskInput"
				color="warning"
				placeholder="Enter some tasks"
				fullWidth
				endAdornment={
					<InputAdornment position="end">
						<PrioritySelector onChange={handleNewTaskPriorityChange} />
					</InputAdornment>
				}
				onChange={handleNewTaskLabelChange}
				onKeyDown={handleNewTaskEnter}
			/>
			<Button
				data-testid="addTaskButton"
				variant="contained"
				color="success"
				onClick={handleNewTaskClick}
			>
				<AddIcon />
			</Button>
		</Container>
	);
};
