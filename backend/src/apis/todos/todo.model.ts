import * as z from "zod";
import { db } from "../../db";
import { WithId } from "mongodb";

export const Todo = z.object({
	label: z.string(),
	isCompleted: z.boolean().default(false),
});

export type Todo = z.infer<typeof Todo>;
export type TodoWithId = WithId<Todo>;
export const Todos = db.collection<Todo>("todo-list");
