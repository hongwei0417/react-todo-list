import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";

const options: swaggerJsdoc.Options = {
	definition: {
		openapi: "3.0.3",
		info: {
			title: "React Todo List",
			description: "This is todo list api document",
			contact: {
				email: "iamhongwei0417@gmail.com",
			},
			version: "1.0.0",
		},
		externalDocs: {
			description: "Github",
			url: "https://github.com/hongwei0417",
		},
		// servers: [
		// 	{
		// 		url: "https://petstore3.swagger.io/api/v3",
		// 	},
		// ],
		tags: [
			{
				name: "App",
				description: "",
			},
			{
				name: "Todos",
				description: "Todo CRUD API",
			},
		],
		paths: {
			"/health": {
				get: {
					tags: ["App"],
					summary: "Check server health",
					description: "",
					responses: {
						"200": {
							description: "Server Response Successful",
							content: {
								"application/json": {
									schema: {
										type: "object",
									},
								},
								"application/xml": {
									schema: {
										type: "object",
									},
								},
							},
						},
						"400": {
							description: "Server No response",
						},
					},
				},
			},
			"/api/todo": {
				get: {
					tags: ["Todos"],
					summary: "Find all todo items",
					description: "",
					operationId: "getTodoList",
					responses: {
						"200": {
							description: "Query Successful",
							content: {
								"application/json": {
									schema: {
										type: "array",
										items: {
											$ref: "#/components/schemas/TodoItem",
										},
									},
								},
								"application/xml": {
									schema: {
										type: "array",
										items: {
											$ref: "#/components/schemas/TodoItem",
										},
									},
								},
							},
						},
						"400": {
							description: "Query Fail",
						},
					},
				},
				post: {
					tags: ["Todos"],
					summary: "Create todo item",
					description: "",
					operationId: "createTodoItem",
					requestBody: {
						description: "Created user object",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/TodoItem",
								},
							},
							"application/xml": {
								schema: {
									$ref: "#/components/schemas/TodoItem",
								},
							},
							"application/x-www-form-urlencoded": {
								schema: {
									$ref: "#/components/schemas/TodoItem",
								},
							},
						},
					},
					responses: {
						201: {
							description: "successful operation",
							content: {
								"application/json": {
									schema: {
										$ref: "#/components/schemas/TodoItem",
									},
								},
								"application/xml": {
									schema: {
										$ref: "#/components/schemas/TodoItem",
									},
								},
							},
						},
					},
				},
			},
			"/api/todo/{todoItemID}": {
				get: {
					tags: ["Todos"],
					summary: "Find todo item by id",
					description: "",
					operationId: "findTodoItem",
					parameters: [
						{
							name: "todoItemID",
							in: "path",
							description: "Todo item id to query",
							required: true,
							schema: {
								type: "string",
							},
						},
					],
					responses: {
						"200": {
							description: "Query Successful",
							content: {
								"application/json": {
									schema: {
										type: "object",
										$ref: "#/components/schemas/TodoItem",
									},
								},
								"application/xml": {
									schema: {
										type: "object",
										$ref: "#/components/schemas/TodoItem",
									},
								},
							},
						},
						"400": {
							description: "Query Fail",
						},
					},
				},
				put: {
					tags: ["Todos"],
					summary: "Update todo item",
					description: "",
					operationId: "updateTodoItem",
					parameters: [
						{
							name: "todoItemID",
							in: "path",
							description: "Todo item id to update",
							required: true,
							schema: {
								type: "string",
							},
						},
					],
					requestBody: {
						description: "",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/TodoItem",
								},
							},
							"application/xml": {
								schema: {
									$ref: "#/components/schemas/TodoItem",
								},
							},
							"application/x-www-form-urlencoded": {
								schema: {
									$ref: "#/components/schemas/TodoItem",
								},
							},
						},
					},
					responses: {
						default: {
							description: "Update Successful",
							content: {
								"application/json": {
									schema: {
										$ref: "#/components/schemas/TodoItem",
									},
								},
								"application/xml": {
									schema: {
										$ref: "#/components/schemas/TodoItem",
									},
								},
							},
						},
					},
				},
				delete: {
					tags: ["Todos"],
					summary: "Delete a todo item",
					description: "",
					operationId: "deleteTodoItem",
					parameters: [
						{
							name: "todoItemID",
							in: "path",
							description: "Todo item id to delete",
							required: true,
							schema: {
								type: "string",
							},
						},
					],
					responses: {
						"204": {
							description: "Delete Successful",
						},
						"404": {
							description: "Todo id not found",
						},
					},
				},
			},
		},
		components: {
			schemas: {
				TodoItem: {
					type: "object",
					properties: {
						id: {
							type: "string",
						},
						label: {
							type: "string",
							example: "Hello Todo",
						},
						isCompleted: {
							type: "boolean",
							example: true,
						},
						priority: {
							type: "integer",
							format: "int32",
							example: 0,
						},
					},
				},
			},
			requestBodies: {
				TodoList: {
					description: "List of todo item",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									$ref: "#/components/schemas/TodoItem",
								},
							},
						},
					},
				},
			},
		},
	},
	apis: [],
	// apis: ["./src/apis/app.ts", "./src/apis/*.ts", "./src/apis/todos/*.ts"],
};

export const swaggerDoc = swaggerJsdoc(options);
