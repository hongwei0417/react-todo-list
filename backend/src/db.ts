import { MongoClient } from "mongodb";

require("dotenv").config();

const { MONGO_URI = "mongodb://localhost:27017/todos" } = process.env;

export const client = new MongoClient(MONGO_URI);
export const db = client.db();

client.connect();
