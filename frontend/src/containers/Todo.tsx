import { TodoHeader } from "./TodoHeader";
import Card from "@mui/material/Card";
import styled from "styled-components";
import { TodoItemList } from "./TodoItemList";
import Divider from "@mui/material/Divider";
import { TodoFilter } from "./TodoFilter";
import { ChangeEvent, createContext, useEffect, useState } from "react";
import { TodoContext } from "../hooks/useTodoContext";
import { Task } from "../models/Task";
import { TodoStore } from "../models/Todo";
import { FilterCondition } from "../models/Filter";
import { useTaskHandler } from "../hooks/useTaskHandler";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";

const TodoContainer = styled(Card)`
	width: 75vw;
	height: 80vh;
	box-sizing: border-box;
	padding: 2rem;
	@media (max-width: 768px) {
		width: 90vw;
		height: 90vh;
	}
`;

const ContentContainer = styled.div`
	width: 100%;
	height: 90%;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`;

const Title = styled.h2`
	text-align: center;
`;

export default function TodoList() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [filterCondition, setFilterCondition] = useState<FilterCondition>({});
	const { getAllTask$ } = useTaskHandler();

	useEffect(() => {
		pipe(
			getAllTask$(),
			TE.fold(
				(error) => TE.left(error),
				(tasks) => TE.right(setTasks(tasks))
			)
		)();
	}, []);

	const contextValue: TodoStore = {
		tasks,
		filterCondition,
		updateTasks: setTasks,
		updateFilterConditions: setFilterCondition,
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
