import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { Express, Request, Response } from "express";

import * as middlewares from "./middlewares";
import api from "./apis";
import MessageResponse from "./interfaces/MessageResponse";
import { swaggerDoc } from "./utils/swagger";

require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
	res.json({
		message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
	});
});

app.use("/api", api);

// Swagger page
app.use("/", swaggerUi.serve);
app.get("/", swaggerUi.setup(swaggerDoc));
app.get("/api.json", (req: Request, res: Response) => {
	res.setHeader("Content-Type", "application/json");
	res.send(swaggerDoc);
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
