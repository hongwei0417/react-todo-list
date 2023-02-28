import { Task } from "./Task";

export type FilterCondition = Partial<Pick<Task, "label" | "isCompleted" | "priority">>;
