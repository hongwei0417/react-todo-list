import { TaskPriority } from "./../../interfaces/TaskPriority";
import { NextFunction, Request, Response } from "express";
import { Todo, TodoWithId, Todos } from "./todo.model";
import { InsertOneResult, ModifyResult, ObjectId } from "mongodb";
import { ZodError } from "zod";
import { ParamsWithId } from "@/interfaces/ParamsWithId";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import * as A from "fp-ts/Array";
import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/function";

const findTodoList = () => Todos.find().toArray();

const findOneTodo = (id: string) => () => Todos.findOne({ _id: new ObjectId(id) });

const insertOneTodo = (data: Todo) => () => Todos.insertOne(data);

const updateOneTodo = (id: string, data: Todo) => () =>
	Todos.findOneAndUpdate(
		{
			_id: new ObjectId(id),
		},
		{
			$set: data,
		},
		{
			returnDocument: "after",
		}
	);

const deleteOneTodo = (id: string) => () =>
	Todos.findOneAndDelete({
		_id: new ObjectId(id),
	});

export const getAllTodos = (req: Request, res: Response<TodoWithId[]>, next: NextFunction) => {
	pipe(
		TE.tryCatch(findTodoList, E.toError),
		TE.fold(
			(error) => TE.left(next(error)),
			(result) => TE.right(res.json(result))
		)
	)();
};

export const getOneTodo = (
	req: Request<ParamsWithId, TodoWithId, {}>,
	res: Response<TodoWithId>,
	next: NextFunction
) => {
	pipe(
		TE.tryCatch(findOneTodo(req.params.id), E.toError),
		TE.chain((result) => {
			if (!result) {
				res.status(404);
				const errorMessage = `ID "${req.params.id}" not found!`;
				return TE.left(new Error(errorMessage));
			}
			return TE.right(result);
		}),
		TE.fold(
			(error) => TE.left(next(error)),
			(result) => TE.right(res.json(result))
		)
	)();
};

export const createTodo = (
	req: Request<{}, TodoWithId, Todo>,
	res: Response<TodoWithId>,
	next: NextFunction
) => {
	const createTodoCheck = pipe(
		TE.tryCatch(insertOneTodo(req.body), E.toError),
		TE.chain((result) => {
			if (result.acknowledged) {
				res.status(201);
				return TE.right(result);
			}
			return TE.left(new Error("Error"));
		})
	);

	const handleCreateError = (error: Error) => {
		if (error instanceof ZodError) {
			res.status(422);
		}
		return TE.left(next(error));
	};

	const handleCreateSuccess = (result: InsertOneResult<Todo>) => {
		res.json({
			_id: result.insertedId,
			...req.body,
		});
		return TE.right<void, InsertOneResult<Todo>>(result);
	};

	pipe(createTodoCheck, TE.fold(handleCreateError, handleCreateSuccess))();
};

export const updateTodo = async (
	req: Request<ParamsWithId, TodoWithId, Todo>,
	res: Response<TodoWithId>,
	next: NextFunction
) => {
	const updateTodoCheck = pipe(
		TE.tryCatch(updateOneTodo(req.params.id, req.body), E.toError),
		TE.chain((result) => {
			if (result.value) {
				return TE.right(result);
			}
			return TE.left(new Error(`ID ${req.params.id} not fround!`));
		})
	);

	const handleUpdateError = (error: Error) => {
		res.status(404);
		return TE.left(next(error));
	};

	const handleUpdateSuccess = (result: ModifyResult<Todo>) => {
		res.json(result.value!);
		return TE.right<void, Todo>(result.value!);
	};

	pipe(updateTodoCheck, TE.fold(handleUpdateError, handleUpdateSuccess))();
};

export const deleteTodo = async (
	req: Request<ParamsWithId, {}, {}>,
	res: Response<{}>,
	next: NextFunction
) => {
	const deleteTodoCheck = pipe(
		TE.tryCatch(deleteOneTodo(req.params.id), E.toError),
		TE.chain((result) => {
			if (result.value) {
				return TE.right(result);
			}
			return TE.left(new Error(`ID ${req.params.id} not fround!`));
		})
	);

	const handleDeleteError = (error: Error) => {
		res.status(404);
		return TE.left(next(error));
	};

	const handleDeleteSuccess = (result: ModifyResult<Todo>) => {
		res.status(204).end();
		return TE.right<void, Todo>(result.value!);
	};

	pipe(deleteTodoCheck, TE.fold(handleDeleteError, handleDeleteSuccess))();
};
