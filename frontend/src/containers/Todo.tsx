import { TodoHeader } from "./TodoHeader";
import Card from "@mui/material/Card";
import styled from "styled-components";
import { TodoItemList } from "./TodoItemList";
import Divider from "@mui/material/Divider";
import { Filter } from "../components/Filter";
import { ChangeEvent, createContext, useState } from "react";
import { Task, TodoStore } from "../models/Todo";
import { TodoContext } from "../hooks/todo";

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
	const [tasks, setTasks] = useState<Task[]>([]);

	const handleNewTask = (task: Task) => {
		console.log(task);
		setTasks((tasks) => {
			return [...tasks, task];
		});
	};

	const handleChangeTask = (task: Task) => {
		setTasks((tasks) => {
			return tasks.map((t) => {
				return t.id === task.id ? task : t;
			});
		});
	};

	const handleDeleteTask = (task: Task) => {
		setTasks((tasks) => {
			return tasks.filter((t) => t.id !== task.id);
		});
	};

	const contextValue: TodoStore = {
		createTask: handleNewTask,
		changeTask: handleChangeTask,
		deleteTask: handleDeleteTask,
	};

	return (
		<TodoContext.Provider value={contextValue}>
			<TodoContainer>
				<Title>TODO LIST</Title>
				<ContentContainer>
					<TodoHeader />
					<Divider />
					<Filter />
					<TodoItemList tasks={tasks} />
				</ContentContainer>
			</TodoContainer>
		</TodoContext.Provider>
	);
}
