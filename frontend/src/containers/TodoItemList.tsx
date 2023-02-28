import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { TodoItem } from "../components/TodoItem";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { useTodoContext } from "../hooks/todo";
import { Task } from "../models/Task";
import { useTaskFilter } from "../hooks/filter";

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

	const handleChangeTask = (task: Task) => {
		updateTasks(
			tasks.map((t) => {
				return t.id === task.id ? task : t;
			})
		);
	};

	const handleDeleteTask = (task: Task) => {
		updateTasks(tasks.filter((t) => t.id !== task.id));
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
