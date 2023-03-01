import app from "../../app";
import request from "supertest";
import { Todos } from "./todo.model";

beforeAll(async () => {
	try {
		await Todos.drop();
	} catch (error) {
		console.log(error);
	}
});

describe("GET /api/todo", () => {
	it("responds with a json message", (done) => {
		request(app)
			.get("/api/todo")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toHaveProperty("length");
				expect(response.body.length).toBe(0);
				done();
			});
	});
});
