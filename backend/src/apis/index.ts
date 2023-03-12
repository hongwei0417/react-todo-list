import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import todoRoutes from "./todo/todo.routes";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
	res.json({
		message: "API WORK 😄👍",
	});
});

router.use("/todo", todoRoutes);

export default router;
