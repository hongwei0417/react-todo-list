import { Router, Request, Response, NextFunction } from "express";
import { Todo, TodoWithId, Todos } from "./todo.model";
import * as TodoController from "./todo.controller";
import { validateRequest } from "../../middlewares";
import { ParamsWithId } from "../../interfaces/ParamsWithId";

const router = Router();

//* GET
router.get("/", TodoController.getAllTodos);
router.get(
	"/:id",
	validateRequest({
		params: ParamsWithId,
	}),
	TodoController.getOneTodo
);
//* POST
router.post(
	"/",
	validateRequest({
		body: Todo,
	}),
	TodoController.createTodo
);
//* PUT
router.put(
	"/:id",
	validateRequest({
		params: ParamsWithId,
		body: Todo,
	}),
	TodoController.updateTodo
);
//* DELETE
router.delete(
	"/:id",
	validateRequest({
		params: ParamsWithId,
	}),
	TodoController.deleteTodo
);

export default router;
