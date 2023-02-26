import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";

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
		font-size: 2rem;
	}
`;

const TodoText = styled(Input)`
	flex: 1;
`;

export const TodoItem = () => {
	return (
		<Container elevation={24}>
			<CheckInput />
			<TodoText defaultValue="Hello world" />
			<IconButton aria-label="delete">
				<DeleteIcon />
			</IconButton>
		</Container>
	);
};
