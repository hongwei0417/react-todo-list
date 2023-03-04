import { Option } from "./Common";

export type TaskDto = {
	_id?: string;
	label: string;
	priority: TaskPriority;
	isCompleted: boolean;
};

export type Task = {
	id: string;
	label: string;
	priority: TaskPriority;
	isCompleted: boolean;
};

export type PriorityOption = {
	icon: React.ReactNode;
} & Option<TaskPriority>;

export enum TaskPriority {
	UNSET = 0,
	LOW = 1,
	NORMAL = 2,
	HIGH = 3,
}
