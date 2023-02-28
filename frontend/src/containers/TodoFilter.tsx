import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import styled from "styled-components";
import PrioritySelector from "../components/PrioritySelector";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { useTodoContext } from "../hooks/todo";
import { ChangeEvent, useEffect, useState } from "react";
import { TaskPriority } from "../models/Task";

type Props = {};

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const SearchInput = styled(Input)``;

export const TodoFilter: React.FC<Props> = ({}) => {
	const { filterCondition, updateFilterConditions } = useTodoContext();
	const [filterLabel, setFilterLabel] = useState<string>("");
	const [filterPriority, setFilterPriority] = useState<TaskPriority>(TaskPriority.UNSET);

	useEffect(() => {
		updateFilterConditions({
			...filterCondition,
			label: filterLabel,
			priority: filterPriority,
		});
	}, [filterLabel, filterPriority]);

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFilterLabel((s) => e.target.value);
	};

	const handlePrioritySelectorChange = (priority: TaskPriority) => {
		setFilterPriority((p) => priority);
	};

	return (
		<Container>
			<SearchInput
				type="text"
				placeholder="Enter any keyword"
				color="warning"
				startAdornment={
					<InputAdornment position="start">
						<SearchRoundedIcon />
					</InputAdornment>
				}
				onChange={handleSearchChange}
			/>
			<PrioritySelector
				defaultIcon={<FilterListRoundedIcon />}
				onChange={handlePrioritySelectorChange}
			/>
		</Container>
	);
};
