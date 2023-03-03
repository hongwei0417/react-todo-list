import { NextFunction, Request, Response } from "express";
import { Todo, TodoWithId, Todos } from "./todo.model";
import { InsertOneResult, ObjectId } from "mongodb";
import { ZodError } from "zod";
import { ParamsWithId } from "@/interfaces/ParamsWithId";

export const getAllTodos = async (
	req: Request,
	res: Response<TodoWithId[]>,
	next: NextFunction
) => {
	try {
		const result = await Todos.find({}).toArray();
		res.json(result);
	} catch (error) {
		next(error);
	}
};

export const getOneTodo = async (
	req: Request<ParamsWithId, TodoWithId, {}>,
	res: Response<TodoWithId>,
	next: NextFunction
) => {
	try {
		const result = await Todos.findOne({ _id: new ObjectId(req.params.id) });
		if (!result) {
			res.status(404);
			throw new Error(`ID "${req.params.id} not fround!`);
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
};

export const createTodo = async (
	req: Request<{}, TodoWithId, Todo>,
	res: Response<TodoWithId>,
	next: NextFunction
) => {
	try {
		const result = await Todos.insertOne(req.body);
		if (!result.acknowledged) throw new Error("Error");
		res.status(201);
		res.json({
			_id: result.insertedId,
			...req.body,
		});
	} catch (error) {
		if (error instanceof ZodError) {
			res.status(422);
		}
		next(error);
	}
};

export const updateTodo = async (
	req: Request<ParamsWithId, TodoWithId, {}>,
	res: Response<TodoWithId>,
	next: NextFunction
) => {
	try {
		const result = await Todos.findOneAndUpdate(
			{
				_id: new ObjectId(req.params.id),
			},
			{
				$set: req.body,
			},
			{
				returnDocument: "after",
			}
		);

		if (!result.value) {
			res.status(404);
			throw new Error(`ID ${req.params.id} not fround!`);
		}
		res.json(result.value);
	} catch (error) {
		next(error);
	}
};

export const deleteTodo = async (
	req: Request<ParamsWithId, {}, {}>,
	res: Response<{}>,
	next: NextFunction
) => {
	try {
		const result = await Todos.findOneAndDelete({
			_id: new ObjectId(req.params.id),
		});

		if (!result.value) {
			res.status(404);
			throw new Error(`ID ${req.params.id} not fround!`);
		}
		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
