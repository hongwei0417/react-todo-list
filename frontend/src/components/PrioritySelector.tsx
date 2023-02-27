import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import styled from "styled-components";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import SvgIcon, { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface Props {
	defaultIcon?: React.ReactNode;
}

const options = [
	"None",
	"Atria",
	"Callisto",
	"Dione",
	"Ganymede",
	"Hangouts Call",
	"Luna",
	"Oberon",
	"Phobos",
	"Pyxis",
	"Sedna",
	"Titania",
	"Triton",
	"Umbriel",
];

const Container = styled.div``;

const PrioritySelector: React.FC<Props> = ({ defaultIcon }) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Container>
			<IconButton color="default" onClick={handleClick}>
				{defaultIcon || <FlagRoundedIcon />}
				{/* { defaultIcon || <FlagRoundedIcon /> } */}
			</IconButton>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				{options.map((option) => (
					<MenuItem key={option} selected={option === "Pyxis"} onClick={handleClose}>
						{option}
					</MenuItem>
				))}
			</Menu>
		</Container>
	);
};

export default PrioritySelector;
