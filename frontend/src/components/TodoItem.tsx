import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import InputAdornment from "@mui/material/InputAdornment";
import PrioritySelector from "./PrioritySelector";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from "@mui/icons-material/Folder";

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
		/* font-size: 2rem; */
	}
`;

const TodoText = styled(Input)`
	&:before {
		border: none !important;
	}
`;

export const TodoItem = () => {
	return (
		<ListItem
			secondaryAction={
				<IconButton edge="end">
					<DeleteIcon />
				</IconButton>
			}
		>
			<ListItemIcon>
				<CheckInput edge="start" />
			</ListItemIcon>
			<TodoText
				type="text"
				value="Hello Kevin You Are Good!"
				fullWidth
				endAdornment={
					<InputAdornment position="end">
						<PrioritySelector />
					</InputAdornment>
				}
			/>
		</ListItem>
		// <Container elevation={24}>
		// 	<CheckInput />
		// 	<TodoText
		// 		type="text"
		// 		endAdornment={
		// 			<InputAdornment position="end">
		// 				<PrioritySelector />
		// 			</InputAdornment>
		// 		}
		// 	/>
		// 	<IconButton>
		// 		<DeleteIcon />
		// 	</IconButton>
		// </Container>
	);
};
