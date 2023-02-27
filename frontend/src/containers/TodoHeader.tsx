import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import OutlinedInput from "@mui/material/OutlinedInput";
import PrioritySelector from "../components/PrioritySelector";
import InputAdornment from "@mui/material/InputAdornment";

const Container = styled.div`
	/* border: 1px solid red; */
	display: flex;
	gap: 10px;
	max-height: 10%;
`;

const TaskInput = styled(OutlinedInput)`
	& legend {
		display: none;
	}
	& fieldset {
		top: 0;
	}
`;

export const TodoHeader = () => {
	return (
		<Container>
			<TaskInput
				label="Task"
				type="text"
				color="warning"
				placeholder="Add some tasks"
				fullWidth
				endAdornment={
					<InputAdornment position="end">
						<PrioritySelector />
					</InputAdornment>
				}
			/>
			<Button variant="contained" color="success">
				<AddIcon />
			</Button>
		</Container>
	);
};
