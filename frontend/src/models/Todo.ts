export type Task = {
	id: string;
	label: string;
	priority: TaskPriority;
	isCompleted: boolean;
};

export type PriorityOption = {
	icon: React.ReactNode;
} & Option<TaskPriority>;

export type TodoStore = {
	createTask: (task: Task) => void;
	changeTask: (task: Task) => void;
	deleteTask: (task: Task) => void;
};

export type Option<T> = {
	name: string;
	value: T;
};

export enum TaskPriority {
	UNSET = "UNSET",
	LOW = "LOW",
	NORMAL = "NORMAL",
	HIGH = "HIGH",
}
