import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Input, { InputProps } from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import InputAdornment from "@mui/material/InputAdornment";
import PrioritySelector from "./PrioritySelector";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from "@mui/icons-material/Folder";
import { ChangeEvent, FocusEvent, MouseEvent, useEffect, useState } from "react";
import { Task, TaskPriority } from "../models/Task";

type Props = {
	task: Task;
	onChange?: (task: Task, delay?: number) => void;
	onDelete?: (task: Task) => void;
};

const Container = styled(Paper)`
	height: 70px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 1rem;
	&:not(:first-child):not(:last-child) {
		margin: 1.5rem 0;
	}
`;

const CheckInput = styled(Checkbox)`
	& .MuiSvgIcon-root {
		/* font-size: 2rem; */
	}
`;

const TodoText = styled(Input)<InputProps & { $isCompleted: boolean }>`
	text-decoration: ${(p) => (p.$isCompleted ? "line-through" : "unset")};
	opacity: ${(p) => (p.$isCompleted ? 0.5 : 1)};
	&:before {
		border: none !important;
	}
`;

export const TodoItem: React.FC<Props> = ({ task, onChange, onDelete }) => {
	const [innerTask, setInnerTask] = useState<Task>(task);

	useEffect(() => {
		setInnerTask((t) => task);
	}, [task]);

	const handleLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInnerTask((t) => {
			return {
				...t,
				label: e.target.value,
			};
		});
		onChange?.(innerTask, 1000);
	};

	const handleUnFocusLabel = (e: FocusEvent<HTMLInputElement>) => {
		onChange?.(innerTask);
	};

	const handlePriorityChange = (priority: TaskPriority) => {
		onChange?.({ ...innerTask, priority });
	};

	const handleCheckTask = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.({ ...innerTask, isCompleted: !innerTask.isCompleted });
	};

	const handleDeleteTask = (e: MouseEvent<HTMLButtonElement>) => {
		onDelete?.(innerTask);
	};

	return (
		<ListItem
			secondaryAction={
				<IconButton edge="end" onClick={handleDeleteTask} data-testid="deleteItemButton">
					<DeleteIcon />
				</IconButton>
			}
		>
			<ListItemIcon>
				<CheckInput edge="start" checked={innerTask.isCompleted} onChange={handleCheckTask} />
			</ListItemIcon>
			<TodoText
				type="text"
				color="warning"
				value={innerTask.label}
				fullWidth
				endAdornment={
					<InputAdornment position="end">
						<PrioritySelector value={innerTask.priority} onChange={handlePriorityChange} />
					</InputAdornment>
				}
				$isCompleted={innerTask.isCompleted}
				onBlur={handleUnFocusLabel}
				onChange={handleLabelChange}
			/>
		</ListItem>
	);
};
