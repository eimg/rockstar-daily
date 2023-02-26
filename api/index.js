const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient("mongodb://127.0.0.1");
const db = mongo.db("twitter");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
const secret = "some secret";

const bcrypt = require("bcrypt");

function auth(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) return res.status(401).json({ msg: "token missing" });

	jwt.verify(token, secret, (err, user) => {
		if (err) {
			return res.status(403).json({ msg: "invalid token" });
		}

		res.locals.user = user;
		next();
	});
}

app.post("/users/login", async (req, res) => {
	const { handle, password } = req.body;

	if (!handle || !password) {
		return res.status(400).json({ msg: "handle or password missing" });
	}

	const user = await db.collection("users").findOne({ handle });
	if (user) {
		const valid = await bcrypt.compare(password, user.password);
		if (valid) {
			const token = jwt.sign(user, secret);
			return res.send(token);
		}
	}

	res.status(401).json({ msg: "handle or password incorrect" });
});

app.get("/users/verify", auth, (req, res) => {
	res.json(res.locals.user);
});

app.post("/users/register", async (req, res) => {
	const { name, handle, password, profile } = req.body;
	if (!name || !handle || !password) {
		return res
			.status(400)
			.json({ msg: "name, handle, password: all required" });
	}

	const hash = await bcrypt.hash(password, 10);
	const result = await db.collection("users").insertOne({
		name,
		handle,
		password: hash,
		profile,
	});

	if (result.insertedId) {
		const user = await db.collection("users").findOne({
			_id: ObjectId(result.insertedId),
		});
		return res.json(user);
	}
	res.status(500).json({ msg: "something wrong, please try again" });
});

app.get("/users/:handle", async (req, res) => {
	const { handle } = req.params;
	const user = await db
		.collection("users")
		.aggregate([
			{
				$match: { handle },
			},
			{
				$lookup: {
					from: "users",
					localField: "followers",
					foreignField: "_id",
					as: "followers_users",
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "following",
					foreignField: "_id",
					as: "following_users",
				},
			},
		])
		.toArray();

	if (user) res.json(user[0]);
	else res.status(500).json(user);
});

app.put("/users/:id", auth, async (req, res) => {
	const { id } = req.params;
	const { name, profile, password } = req.body;

	if (!name) {
		return res.status(400).json({ msg: "name required" });
	}

	const data = { name, profile };
	if (password) {
		data.password = await bcrypt.hash(password, 10);
	}

	const result = await db
		.collection("users")
		.updateOne({ _id: ObjectId(id) }, { $set: data });

	if (result.acknowledged) {
		const user = await db
			.collection("users")
			.findOne({ _id: ObjectId(id) });
		return res.json(user);
	}

	res.sendStatus(500);
});

app.get("/users", auth, async (req, res) => {
	const users = await db.collection("users").find().toArray();
	res.json(users);
});

app.get("/tweets", async (req, res) => {
	try {
		const tweets = await db
			.collection("tweets")
			.aggregate([
				{
					$match: {
						type: "post",
					},
				},
				{
					$sort: {
						created: -1,
					},
				},
				{ $limit: 20 },
				{
					$lookup: {
						from: "users",
						localField: "owner",
						foreignField: "_id",
						as: "owner_user",
					},
				},
				{
					$lookup: {
						from: "users",
						localField: "likes",
						foreignField: "_id",
						as: "likes_users",
					},
				},
				{
					$lookup: {
						from: "tweets",
						localField: "_id",
						foreignField: "origin",
						as: "comments",
						pipeline: [
							{
								$lookup: {
									from: "users",
									localField: "owner",
									foreignField: "_id",
									as: "owner_user",
								},
							},
							{
								$lookup: {
									from: "tweets",
									localField: "_id",
									foreignField: "origin",
									as: "comments",
								},
							},
						],
					},
				},
			])
			.toArray();

		res.json(tweets);
	} catch (e) {
		res.sendStatus(500);
	}
});

app.get("/tweets/user/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const tweets = await db
			.collection("tweets")
			.aggregate([
				{
					$match: { type: "post", owner: ObjectId(id) },
				},
				{
					$sort: {
						created: -1,
					},
				},
				{ $limit: 20 },
				{
					$lookup: {
						from: "users",
						localField: "owner",
						foreignField: "_id",
						as: "owner_user",
					},
				},
				{
					$lookup: {
						from: "users",
						localField: "likes",
						foreignField: "_id",
						as: "likes_users",
					},
				},
				{
					$lookup: {
						from: "tweets",
						localField: "_id",
						foreignField: "origin",
						as: "comments",
						pipeline: [
							{
								$lookup: {
									from: "users",
									localField: "owner",
									foreignField: "_id",
									as: "owner_user",
								},
							},
							{
								$lookup: {
									from: "tweets",
									localField: "_id",
									foreignField: "origin",
									as: "comments",
								},
							},
						],
					},
				},
			])
			.toArray();

		res.json(tweets);
	} catch (e) {
		res.sendStatus(500);
	}
});

app.get("/tweets/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const tweet = await db
			.collection("tweets")
			.aggregate([
				{
					$match: { _id: ObjectId(id) },
				},
				{
					$lookup: {
						from: "users",
						localField: "owner",
						foreignField: "_id",
						as: "owner_user",
					},
				},
				{
					$lookup: {
						from: "tweets",
						localField: "_id",
						foreignField: "origin",
						as: "comments",
						pipeline: [
							{
								$lookup: {
									from: "users",
									localField: "owner",
									foreignField: "_id",
									as: "owner_user",
								},
							},
							{
								$lookup: {
									from: "tweets",
									localField: "_id",
									foreignField: "origin",
									as: "comments",
								},
							},
						],
					},
				},
			])
			.toArray();

		res.json(tweet[0]);
	} catch (e) {
		res.sendStatus(500);
	}
});

app.post("/tweet", auth, async (req, res) => {
	const user = res.locals.user;
	const { body } = req.body;

	if (!body) return res.status(400).json({ msg: "body required" });

	const result = await db.collection("tweets").insertOne({
		type: "post",
		body,
		owner: ObjectId(user._id),
		created: new Date(),
		likes: [],
	});

	if (result.insertedId) {
		const tweet = await db
			.collection("tweets")
			.aggregate([
				{
					$match: { _id: ObjectId(result.insertedId) },
				},
				{
					$lookup: {
						from: "users",
						localField: "owner",
						foreignField: "_id",
						as: "owner_user",
					},
				},
			])
			.toArray();

		let data = tweet[0];
		data.comments = [];

		return res.json(data);
	} else {
		return res.status(500).json(result);
	}
});

app.post("/comment", auth, async (req, res) => {
	const user = res.locals.user;
	const { body, origin } = req.body;

	if (!body) return res.status(400).json({ msg: "body required" });

	const result = await db.collection("tweets").insertOne({
		type: "comment",
		body,
		origin: ObjectId(origin),
		owner: ObjectId(user._id),
		created: new Date(),
		likes: [],
	});

	if (result.insertedId) {
		const tweet = await db
			.collection("tweets")
			.aggregate([
				{
					$match: { _id: ObjectId(result.insertedId) },
				},
				{
					$lookup: {
						from: "users",
						localField: "owner",
						foreignField: "_id",
						as: "owner_user",
					},
				},
			])
			.toArray();

		let data = tweet[0];
		data.comments = [];

		return res.json(data);
	} else {
		return res.status(500).json(result);
	}
});

app.put("/tweets/:id/toggle/like", auth, async (req, res) => {
	const id = req.params.id;
	const user = res.locals.user._id;

	const tweet = await db.collection("tweets").findOne({
		_id: ObjectId(id),
	});

	tweet.likes = tweet.likes || [];

	if (tweet.likes.find(item => item.toString() === user)) {
		tweet.likes = tweet.likes.filter(uid => uid.toString() !== user);
	} else {
		tweet.likes.push(ObjectId(user));
	}

	try {
		await db.collection("tweets").updateOne(
			{ _id: ObjectId(id) },
			{
				$set: tweet,
			},
		);

		return res.status(200).json(tweet.likes);
	} catch (e) {
		return res.status(500).json({ msg: e.message });
	}
});

app.put("/users/:id/follow", auth, async (req, res) => {
	const targetId = req.params.id;
	const actorId = res.locals.user._id;

	const targetUser = await db.collection("users").findOne({
		_id: ObjectId(targetId),
	});

	targetUser.followers = targetUser.followers || [];

	const actorUser = await db.collection("users").findOne({
		_id: ObjectId(actorId),
	});

	actorUser.following = actorUser.following || [];

	if (targetUser.followers.find(item => item.toString() === actorId)) {
		targetUser.followers = targetUser.followers.filter(
			uid => uid.toString() !== actorId,
		);
		actorUser.following = actorUser.following.filter(
			uid => uid.toString() !== targetId,
		);
	} else {
		targetUser.followers.push(ObjectId(actorId));
		actorUser.following.push(ObjectId(targetId));
	}

	try {
		await db.collection("users").updateOne(
			{ _id: ObjectId(targetId) },
			{
				$set: { followers: targetUser.followers },
			},
		);

		await db.collection("users").updateOne(
			{ _id: ObjectId(actorId) },
			{
				$set: { following: actorUser.following },
			},
		);

		return res.status(200).json({
			followers: targetUser.followers,
			following: actorUser.following,
		});
	} catch (e) {
		return res.status(500).json({ msg: e.message });
	}
});

app.get("/search", async (req, res) => {
	let { q } = req.query;

	let result = await db
		.collection("users")
		.aggregate([
			{
				$match: {
					name: new RegExp(`.*${q}.*`, "i"),
				},
			},
			{
				$sort: { name: 1 },
			},
			{
				$limit: 5,
			},
			{
				$lookup: {
					from: "users",
					localField: "followers",
					foreignField: "_id",
					as: "followers_users",
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "following",
					foreignField: "_id",
					as: "following_users",
				},
			},
		])
		.toArray();

	if (result) {
		return res.status(200).json(result);
	}

	return res.status(401).json({ msg: "user not found" });
});

app.listen(8000, () => {
	console.log("API server running at 8000");
});
