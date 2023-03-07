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

let id = "";
describe("GET /api/todo", () => {
	it("Should responds with a json message", (done) => {
		request(app)
			.get("/api/todo")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toHaveProperty("length");
				done();
			});
	});
});
describe("POST /api/todo", () => {
	it("Should responds with an error if the todo is invalid", (done) => {
		request(app)
			.post("/api/todo")
			.set("Accept", "application/json")
			.send({
				label: "",
			})
			.expect("Content-Type", /json/)
			.expect(201)
			.then((response) => {
				console.log(response.body.message);
				expect(response.body).toHaveProperty("_id");
				done();
			});
	});

	it("Should responds with an inserted object", (done) => {
		request(app)
			.post("/api/todo")
			.set("Accept", "application/json")
			.send({
				label: "Learn Typescript",
				isCompleted: true,
			})
			.expect("Content-Type", /json/)
			.expect(201)
			.then((response) => {
				expect(response.body).toHaveProperty("_id");
				id = response.body._id;
				expect(response.body).toHaveProperty("label");
				expect(response.body).toHaveProperty("isCompleted");
				done();
			});
	});
});

describe("GET /api/todo/:id", () => {
	it("Should responses with todo item by id", (done) => {
		request(app)
			.get(`/api/todo/${id}`)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toHaveProperty("_id");
				expect(response.body._id).toBe(id);
				expect(response.body).toHaveProperty("label");
				expect(response.body.label).toBe("Learn Typescript");
				expect(response.body).toHaveProperty("isCompleted");
				expect(response.body.isCompleted).toBe(true);
				done();
			});
	});

	it("Should responses with invalid objectId error", (done) => {
		request(app)
			.get(`/api/todo/xxxxxxxxxxx`)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(422)
			.then((response) => {
				console.log(response.body.message);
				done();
			});
	});

	it("Should responses with not found error", (done) => {
		request(app)
			.get(`/api/todo/5400c221cadfeac85f4e63f8`)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(404)
			.then((response) => {
				done();
			});
	});
});

describe("PUT /api/todo/:id", () => {
	it("Should responses with todo item by id", (done) => {
		request(app)
			.put(`/api/todo/${id}`)
			.set("Accept", "application/json")
			.send({
				label: "Learn Typescript be updated",
				isCompleted: false,
			})
			.expect("Content-Type", /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toHaveProperty("_id");
				expect(response.body._id).toBe(id);
				expect(response.body).toHaveProperty("label");
				expect(response.body.label).toBe("Learn Typescript be updated");
				expect(response.body).toHaveProperty("isCompleted");
				expect(response.body.isCompleted).toBe(false);
				done();
			});
	});

	it("Should responses with invalid objectId error", (done) => {
		request(app)
			.put(`/api/todo/xxxxxxxxxxx`)
			.set("Accept", "application/json")
			.send({
				label: "test",
				isCompleted: false,
			})
			.expect("Content-Type", /json/)
			.expect(422)
			.then((response) => {
				done();
			});
	});

	it("Should responses with not found error", (done) => {
		request(app)
			.put(`/api/todo/5400c221cadfeac85f4e63f8`)
			.set("Accept", "application/json")
			.send({
				label: "test",
				isCompleted: false,
			})
			.expect("Content-Type", /json/)
			.expect(404)
			.then((response) => {
				done();
			});
	});
});

describe("DELETE /api/todo/:id", () => {
	it("Should responses with a 204 status code", (done) => {
		request(app)
			.delete(`/api/todo/${id}`)
			.set("Accept", "application/json")
			.expect(204)
			.then((response) => {
				done();
			});
	});

	it("Should responses with invalid objectId error", (done) => {
		request(app)
			.delete(`/api/todo/xxxxxxxxxxx`)
			.set("Accept", "application/json")
			.expect(422)
			.then((response) => {
				done();
			});
	});

	it("Should responses with not found error", (done) => {
		request(app)
			.delete(`/api/todo/5400c221cadfeac85f4e63f8`)
			.set("Accept", "application/json")

			.expect(404)
			.then((response) => {
				done();
			});
	});

	it("Should responses with not found error", (done) => {
		request(app)
			.get(`/api/todo/${id}`)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(404)
			.then((response) => {
				done();
			});
	});
});
