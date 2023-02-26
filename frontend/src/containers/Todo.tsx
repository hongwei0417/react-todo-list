import { FunctionBar } from "./FunctionBar";
import Card from "@mui/material/Card";
import styled from "styled-components";
import { TodoItemList } from "./TodoItemList";
import Divider from "@mui/material/Divider";

const TodoContainer = styled(Card)`
	width: 50vw;
	height: 70vh;
	padding: 30px;
`;

const ContentContainer = styled.div`
	width: 100%;
	height: 90%;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`;

const Title = styled.h2``;

export default function TodoList() {
	return (
		<TodoContainer>
			<Title>TODO LIST DEMO</Title>
			<ContentContainer>
				<FunctionBar />
				<Divider />
				<TodoItemList />
			</ContentContainer>
		</TodoContainer>
	);
}
