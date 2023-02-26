import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

const Container = styled.div`
	/* border: 1px solid red; */
	display: flex;
	/* padding: 15px; */
	gap: 10px;
	max-height: 10%;
`;

const TaskInput = styled(TextField)``;

export const FunctionBar = () => {
	return (
		<Container>
			<TextField label="Task" variant="outlined" color="warning" fullWidth />
			<Button variant="contained" color="success">
				<AddIcon />
			</Button>
		</Container>
	);
};
