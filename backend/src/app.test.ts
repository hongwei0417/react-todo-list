import request from "supertest";

import app from "./app";

describe("app", () => {
	it("responds with a not found message", (done) => {
		request(app)
			.get("/xxxxxxxxxxxxxx")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(404, done);
	});
});

describe("GET /", () => {
	it("responds with a json message", (done) => {
		request(app)
			.get("/health")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(
				200,
				{
					message: "π¦’π»ππΆπ±π¦π§π·π¬π’π΅π",
				},
				done
			);
	});
});
