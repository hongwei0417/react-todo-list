import { useState } from "react";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import "./App.css";
import TextField from "@mui/material/TextField";
import TodoList from "./containers/Todo";

function App() {
	const darkTheme = createTheme({
		palette: {
			mode: "dark",
		},
	});

	return (
		<div className="App">
			<ThemeProvider theme={darkTheme}>
				<TodoList />
			</ThemeProvider>
		</div>
	);
}

export default App;
