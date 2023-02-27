import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import InputAdornment from "@mui/material/InputAdornment";
import PrioritySelector from "./PrioritySelector";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from "@mui/icons-material/Folder";
import { Task, TaskPriority } from "../models/Todo";
import { ChangeEvent, FocusEvent, MouseEvent, useEffect, useState } from "react";

type Props = {
	task: Task;
	onChange?: (task: Task) => void;
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

const TodoText = styled(Input)`
	&:before {
		border: none !important;
	}
`;

export const TodoItem: React.FC<Props> = ({ task, onChange, onDelete }) => {
	const [cacheTask, setCacheTask] = useState<Task>(task);

	useEffect(() => {
		setCacheTask((t) => task);
	}, [task]);

	const handleLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCacheTask((t) => {
			return {
				...t,
				label: e.target.value,
			};
		});
	};

	const handleUnFocusLabel = (e: FocusEvent<HTMLInputElement>) => {
		onChange?.(cacheTask);
	};

	const handlePriorityChange = (priority: TaskPriority) => {
		const task = { ...cacheTask, priority };
		setCacheTask((t) => task);
		onChange?.(task);
	};

	const handleDeleteTask = (e: MouseEvent<HTMLButtonElement>) => {
		onDelete?.(cacheTask);
	};

	return (
		<ListItem
			secondaryAction={
				<IconButton edge="end" onClick={handleDeleteTask}>
					<DeleteIcon />
				</IconButton>
			}
		>
			<ListItemIcon>
				<CheckInput edge="start" />
			</ListItemIcon>
			<TodoText
				type="text"
				value={cacheTask.label}
				fullWidth
				endAdornment={
					<InputAdornment position="end">
						<PrioritySelector value={cacheTask.priority} onChange={handlePriorityChange} />
					</InputAdornment>
				}
				onBlur={handleUnFocusLabel}
				onChange={handleLabelChange}
			/>
		</ListItem>
		// <Container elevation={24}>
		// 	<CheckInput />
		// 	<TodoText
		// 		type="text"
		// 		endAdornment={
		// 			<InputAdornment position="end">
		// 				<PrioritySelector />
		// 			</InputAdornment>
		// 		}
		// 	/>
		// 	<IconButton>
		// 		<DeleteIcon />
		// 	</IconButton>
		// </Container>
	);
};
