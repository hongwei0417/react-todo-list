import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import OutlinedInput from "@mui/material/OutlinedInput";
import PrioritySelector from "../components/PrioritySelector";
import InputAdornment from "@mui/material/InputAdornment";
import React, { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useTodoContext } from "../hooks/todo";
import { Task, TaskPriority } from "../models/Task";

type Props = {};

const Container = styled.div`
	/* border: 1px solid red; */
	display: flex;
	gap: 10px;
	max-height: 10%;
`;

const TaskInput = styled(OutlinedInput)`
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

	const addTask = () => {
		const task = {
			...newTask,
			id: nanoid(),
		};
		updateTasks([...tasks, task]);
	};

	return (
		<Container>
			<TaskInput
				label="Task"
				type="text"
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
			<Button variant="contained" color="success" onClick={handleNewTaskClick}>
				<AddIcon />
			</Button>
		</Container>
	);
};
