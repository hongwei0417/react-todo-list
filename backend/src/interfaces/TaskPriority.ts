import * as z from "zod";

export enum TaskPriorityEnum {
	UNSET = 0,
	LOW = 1,
	NORMAL = 2,
	HIGH = 3,
}

export const TaskPriority = z.nativeEnum(TaskPriorityEnum);
export type TaskPriority = z.infer<typeof TaskPriority>;
