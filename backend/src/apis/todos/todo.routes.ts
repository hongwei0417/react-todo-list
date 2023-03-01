import { Router, Request, Response } from "express";
import { TodoWithId, Todos } from "./todo.model";

const router = Router();

router.get("/", async (req: Request, res: Response<TodoWithId[]>) => {
	const result = await Todos.find().toArray();
	res.json(result);
});

export default router;
