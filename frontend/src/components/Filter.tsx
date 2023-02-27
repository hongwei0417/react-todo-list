import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import styled from "styled-components";
import PrioritySelector from "./PrioritySelector";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const SearchInput = styled(Input)``;

export const Filter = () => {
	return (
		<Container>
			<SearchInput
				type="text"
				placeholder="Enter any keyword"
				startAdornment={
					<InputAdornment position="start">
						<SearchRoundedIcon />
					</InputAdornment>
				}
			/>
			<PrioritySelector defaultIcon={<FilterListRoundedIcon />} />
		</Container>
	);
};
