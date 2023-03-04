import { TaskPriority, TaskPriorityEnum } from "./../../interfaces/TaskPriority";
import * as z from "zod";
import { db } from "../../utils/db";
import { WithId } from "mongodb";

export const Todo = z.object({
	label: z.string(),
	isCompleted: z.boolean().default(false),
	priority: TaskPriority.default(TaskPriorityEnum.UNSET),
});

export type Todo = z.infer<typeof Todo>;
export type TodoWithId = WithId<Todo>;
export const Todos = db.collection<Todo>("todo-list");
