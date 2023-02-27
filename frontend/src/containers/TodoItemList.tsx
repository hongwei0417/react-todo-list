import React, { useMemo } from "react";
import styled from "styled-components";
import { TodoItem } from "../components/TodoItem";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { Task } from "../models/Todo";
import { useTodoContext } from "../hooks/todo";

type Props = {
	tasks: Task[];
};

const Container = styled.div`
	/* border: 1px solid green; */
	height: 80%;
	overflow: auto;
	/* padding-right: 1rem; */
`;

const CategoryDivider = styled(Divider)`
	padding: 1rem 0;
`;

export const TodoItemList: React.FC<Props> = ({ tasks }) => {
	const { changeTask, deleteTask } = useTodoContext();

	const todoTasks = useMemo<Task[]>(() => {
		return tasks.filter((t) => !t.isCompleted);
	}, [tasks]);

	const completedTasks = useMemo<Task[]>(() => {
		return tasks.filter((t) => t.isCompleted);
	}, [tasks]);

	return (
		<Container>
			<List>
				<CategoryDivider textAlign="center">Todo Items ({todoTasks.length})</CategoryDivider>
				{todoTasks.map((task, i) => {
					return <TodoItem key={task.id} task={task} onChange={changeTask} onDelete={deleteTask} />;
				})}
				<CategoryDivider textAlign="center">
					Completed Items ({completedTasks.length})
				</CategoryDivider>
				{completedTasks.map((task, i) => {
					return <TodoItem key={task.id} task={task} onChange={changeTask} onDelete={deleteTask} />;
				})}
				{/* {[1, 2, 3, 4, 5].map((i) => {
					return <TodoItem key={i} />;
				})}
				{[1, 2, 3, 4, 5].map((i) => {
					return <TodoItem key={i} />;
				})} */}
			</List>
			<Divider />
		</Container>
	);
};
