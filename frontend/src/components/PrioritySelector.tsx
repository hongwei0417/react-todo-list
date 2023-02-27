import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { FormEvent, MouseEvent, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import { PriorityOption, TaskPriority } from "../models/Todo";

interface Props {
	defaultIcon?: React.ReactNode;
	value?: TaskPriority;
	onChange?: (priority: TaskPriority) => void;
}

const taskPriorityOptionMapper: { [key: string]: PriorityOption } = {
	[TaskPriority.UNSET]: {
		name: TaskPriority.UNSET,
		value: TaskPriority.UNSET,
		icon: <FlagRoundedIcon color="inherit" />,
	},
	[TaskPriority.LOW]: {
		name: TaskPriority.LOW,
		value: TaskPriority.LOW,
		icon: <FlagRoundedIcon color="primary" />,
	},
	[TaskPriority.NORMAL]: {
		name: TaskPriority.NORMAL,
		value: TaskPriority.NORMAL,
		icon: <FlagRoundedIcon color="warning" />,
	},
	[TaskPriority.HIGH]: {
		name: TaskPriority.HIGH,
		value: TaskPriority.HIGH,
		icon: <FlagRoundedIcon color="error" />,
	},
};

const taskPriorityOptions: PriorityOption[] = Object.values(taskPriorityOptionMapper);

const Container = styled.div``;

const PrioritySelector: React.FC<Props> = ({ defaultIcon, value, onChange }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [priorityOption, setPriorityOption] = useState<PriorityOption>(taskPriorityOptions[0]);
	const open = Boolean(anchorEl);
	const displayIcon = useMemo(() => {
		if (value) {
			return taskPriorityOptionMapper[value].icon;
		}
		if (priorityOption.value === TaskPriority.UNSET) {
			return defaultIcon || priorityOption.icon;
		}
		return priorityOption.icon;
	}, [defaultIcon, priorityOption, value]);

	const handleOpenMenu = (e: MouseEvent<HTMLElement>) => {
		setAnchorEl(e.currentTarget);
	};

	const handleChangeOption = (option: PriorityOption) => {
		setPriorityOption((o) => {
			return option;
		});
		setAnchorEl(null);
		onChange?.(option.value);
	};

	const handleClose = (e: MouseEvent<HTMLElement>) => {
		setAnchorEl(null);
	};

	return (
		<Container>
			<IconButton color="default" onClick={handleOpenMenu}>
				{displayIcon}
			</IconButton>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				{taskPriorityOptions.map((option) => (
					<MenuItem key={option.value} onClick={() => handleChangeOption(option)}>
						{option.name}
					</MenuItem>
				))}
			</Menu>
		</Container>
	);
};

export default PrioritySelector;
