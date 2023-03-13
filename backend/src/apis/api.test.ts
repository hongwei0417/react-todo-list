import app from "../app";
import request from "supertest";

describe("GET /api", () => {
	it("Should responds with a api work message.", (done) => {
		request(app)
			.get("/api")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(
				200,
				{
					message: "API WORK 😄👍",
				},
				done
			);
	});
});
