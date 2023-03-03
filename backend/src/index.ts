import { client } from "./db";
import app from "./app";

const port = process.env.PORT || 5000;
app.listen(port as number, "0.0.0.0", async () => {
	console.log(`Listening: http://localhost:${port}`);
});
