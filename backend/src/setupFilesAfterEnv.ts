import { client } from "./utils/db";

global.afterAll(async () => {
	await client.close();
});
