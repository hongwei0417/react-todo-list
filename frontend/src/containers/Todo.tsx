import { TodoHeader } from "./TodoHeader";
import Card from "@mui/material/Card";
import styled from "styled-components";
import { TodoItemList } from "./TodoItemList";
import Divider from "@mui/material/Divider";
import { TodoFilter } from "./TodoFilter";
import { ChangeEvent, createContext, useState } from "react";
import { TodoContext } from "../hooks/todo";
import { Task } from "../models/Task";
import { TodoStore } from "../models/Todo";
import { FilterCondition } from "../models/Filter";

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
	const [filterCondition, setFilterCondition] = useState<FilterCondition>({});

	const handleUpdateTasks = (tasks: Task[]) => {
		setTasks((t) => tasks);
	};

	const handleFilterConditionChange = (condition: FilterCondition) => {
		setFilterCondition((c) => condition);
	};

	const contextValue: TodoStore = {
		tasks,
		filterCondition,
		updateTasks: handleUpdateTasks,
		updateFilterConditions: handleFilterConditionChange,
	};

	return (
		<TodoContext.Provider value={contextValue}>
			<TodoContainer>
				<Title>TODO LIST</Title>
				<ContentContainer>
					<TodoHeader />
					<Divider />
					<TodoFilter />
					<TodoItemList />
				</ContentContainer>
			</TodoContainer>
		</TodoContext.Provider>
	);
}
