import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { TodoItem } from "../components/TodoItem";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { useTodoContext } from "../hooks/useTodoContext";
import { Task } from "../models/Task";
import { useTaskFilter } from "../hooks/useTaskFilter";
import { useTaskHandler } from "../hooks/useTaskHandler";

type Props = {};

const Container = styled.div`
	/* border: 1px solid green; */
	height: 80%;
	overflow: auto;
	/* padding-right: 1rem; */
`;

const CategoryDivider = styled(Divider)`
	padding: 1rem 0;
`;

export const TodoItemList: React.FC<Props> = ({}) => {
	const { tasks, updateTasks } = useTodoContext();
	const { todoTasks, completedTasks } = useTaskFilter();
	const { updateTask, deleteTask } = useTaskHandler();
	const debounceTimer = useRef<NodeJS.Timeout>();

	const handleChangeTask = (task: Task, delay: number = 0) => {
		clearTimeout(debounceTimer.current);
		debounceTimer.current = setTimeout(async () => {
			const newTask = await updateTask(task);
			if (newTask) {
				updateTasks(
					tasks.map((t) => {
						return t.id === newTask.id ? newTask : t;
					})
				);
			}
		}, delay);
	};

	const handleDeleteTask = async (task: Task) => {
		const deletedTask = await deleteTask(task);
		if (deletedTask) {
			updateTasks(tasks.filter((t) => t.id !== deletedTask.id));
		}
	};

	return (
		<Container>
			<List>
				<CategoryDivider textAlign="center">Todo Items ({todoTasks.length})</CategoryDivider>
				{todoTasks.map((task, i) => {
					return (
						<TodoItem
							key={task.id}
							task={task}
							onChange={handleChangeTask}
							onDelete={handleDeleteTask}
						/>
					);
				})}
				<CategoryDivider textAlign="center">
					Completed Items ({completedTasks.length})
				</CategoryDivider>
				{completedTasks.map((task, i) => {
					return (
						<TodoItem
							key={task.id}
							task={task}
							onChange={handleChangeTask}
							onDelete={handleDeleteTask}
						/>
					);
				})}
			</List>
		</Container>
	);
};
