import React from "react";
import styled from "styled-components";
import { TodoItem } from "../components/TodoItem";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

const Container = styled.div`
	/* border: 1px solid green; */
	height: 80%;
	overflow: auto;
	/* padding-right: 1rem; */
`;

const CategoryDivider = styled(Divider)`
	padding: 1rem 0;
`;

export const TodoItemList = () => {
	return (
		<Container>
			<List>
				{/* <CategoryDivider textAlign="center">Todo Items</CategoryDivider> */}
				{[1, 2, 3, 4, 5].map((i) => {
					return <TodoItem key={i} />;
				})}
				<CategoryDivider textAlign="center">Completed Items</CategoryDivider>
				{[1, 2, 3, 4, 5].map((i) => {
					return <TodoItem key={i} />;
				})}
			</List>
			<Divider />
		</Container>
	);
};
