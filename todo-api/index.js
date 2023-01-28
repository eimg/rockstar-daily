const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient("mongodb://localhost");
const db = mongo.db("todo");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/tasks", async (req, res) => {
	const { subject } = req.body;

	if(!subject)
		return res.status(400).json({ msg: "subject required" });

	const result = await db.collection("tasks").insertOne({
		subject,
		done: false,
	});

	const task = await db
		.collection("tasks")
		.findOne({
			_id: ObjectId(result.insertedId),
		});

	res.status(201).json(task);
});

app.get("/tasks", async (req, res) => {
	const tasks = await db.collection("tasks").find().toArray();
	res.json(tasks);
});

// curl localhost:8000/tasks/[id]
app.get("/tasks/:id", async (req, res) => {
	const { id } = req.params;

	const task = await db
		.collection("tasks")
		.findOne({ _id: ObjectId(id) });

	res.json(task);
});

// curl -X PUT localhost:8000/tasks/...id... -d subject=Subject
app.put("/tasks/:id", async (req, res) => {
	const { id } = req.params;
	const { subject } = req.body;

	if (!subject) return res.status(400).json({ msg: "subject required" });

	const result = await db.collection("tasks").updateOne(
		{ _id: ObjectId(id) },
		{
			$set: { subject },
		},
	);

	res.json(result);
});

// curl -X DELETE localhost:8000/tasks/...id...
app.delete("/tasks/:id", async (req, res) => {
	const { id } = req.params;
	const result = await db.collection("tasks").deleteOne({
		_id: ObjectId(id),
	});

	res.status(204).json(result);
});

app.delete("/tasks", async (req, res) => {
	const result = await db.collection("tasks").deleteMany({ done: true });
	res.status(204).json(result);
});

app.put("/tasks/:id/toggle", async (req, res) => {
	const { id } = req.params;

	const task = await db
		.collection("tasks")
		.find({ _id: ObjectId(id) })
		.toArray();

	const done = task[0].done;

	const result = await db
		.collection("tasks")
		.updateOne({ _id: ObjectId(id) }, { $set: { done: !done } });

	res.json(result);
});

app.listen(8000, () => {
	console.log("API running at port 8000");
});
