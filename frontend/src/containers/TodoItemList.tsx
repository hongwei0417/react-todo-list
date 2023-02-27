import React from "react";
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

	return (
		<Container>
			<List>
				{tasks.map((task, i) => {
					return <TodoItem key={i} task={task} onChange={changeTask} onDelete={deleteTask} />;
				})}
				{/* <CategoryDivider textAlign="center">Todo Items</CategoryDivider> */}
				{/* {[1, 2, 3, 4, 5].map((i) => {
					return <TodoItem key={i} />;
				})}
				<CategoryDivider textAlign="center">Completed Items</CategoryDivider>
				{[1, 2, 3, 4, 5].map((i) => {
					return <TodoItem key={i} />;
				})} */}
			</List>
			<Divider />
		</Container>
	);
};
