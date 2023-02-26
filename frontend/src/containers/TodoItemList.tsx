import React from "react";
import styled from "styled-components";
import { TodoItem } from "./TodoItem";

const Container = styled.div`
	/* border: 1px solid green; */
	height: 80%;
	overflow: auto;
`;

export const TodoItemList = () => {
	return (
		<Container>
			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
				return <TodoItem key={i} />;
			})}
		</Container>
	);
};
