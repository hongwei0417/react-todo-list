import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { TodoItem } from "../components/TodoItem";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { useTodoContext } from "../hooks/useTodoContext";
import { Task } from "../models/Task";
import { useTaskFilter } from "../hooks/useTaskFilter";
import { useTaskHandler } from "../hooks/useTaskHandler";
import * as O from "fp-ts/Option";
import * as A from "fp-ts/Array";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import { pipe } from "fp-ts/lib/function";

type Props = {};

const Container = styled.div`
	height: 80%;
	overflow: auto;
`;

const CategoryDivider = styled(Divider)`
	padding: 1rem 0;
`;

export const TodoItemList: React.FC<Props> = ({}) => {
	const { updateTasks } = useTodoContext();
	const { todoTasks, completedTasks } = useTaskFilter();
	const { updateTask$, deleteTask$ } = useTaskHandler();
	const debounceTimer = useRef<NodeJS.Timeout>();

	const taskListWithUpdate = (updatedTask: Task) => (tasks: Task[]) =>
		pipe(
			tasks,
			A.map((t) => (t.id === updatedTask.id ? updatedTask : t))
		);

	const taskListWithDelete = (deletedTask: Task) => (tasks: Task[]) =>
		pipe(
			tasks,
			A.filter((t) => t.id !== deletedTask.id)
		);

	const handleChangeTask = (task: Task, delay: number = 0) => {
		clearTimeout(debounceTimer.current);
		debounceTimer.current = setTimeout(() => {
			pipe(
				updateTask$(task),
				TE.fold(
					(error) => TE.left(error),
					(task) => TE.right(updateTasks(taskListWithUpdate(task)))
				)
			)();
		}, delay);
	};

	const handleDeleteTask = (task: Task) => {
		pipe(
			deleteTask$(task),
			TE.fold(
				(error) => TE.left(error),
				(task) => TE.right(updateTasks(taskListWithDelete(task)))
			)
		)();
	};

	return (
		<Container>
			<List>
				<CategoryDivider textAlign="center">Todo Items ({todoTasks.length})</CategoryDivider>
				{todoTasks.map((task, i) => {
					return (
						<TodoItem
							key={task.id}
							task={task}
							onChange={handleChangeTask}
							onDelete={handleDeleteTask}
						/>
					);
				})}
				<CategoryDivider textAlign="center">
					Completed Items ({completedTasks.length})
				</CategoryDivider>
				{completedTasks.map((task, i) => {
					return (
						<TodoItem
							key={task.id}
							task={task}
							onChange={handleChangeTask}
							onDelete={handleDeleteTask}
						/>
					);
				})}
			</List>
		</Container>
	);
};
