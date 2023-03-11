const api = "http://localhost:8000";

function getToken() {
	return localStorage.getItem("token");
}

export async function verify() {
	const token = getToken();
	if (!token) return false;

	const res = await fetch(`${api}/users/verify`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) return false;

	const user = await res.json();
	return user;
}

export async function login(handle, password) {
	const res = await fetch(`${api}/users/login`, {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ handle, password }),
	});

	if (!res.ok) return false;

	const token = await res.text();
	localStorage.setItem("token", token);

	return token;
}

export async function register(name, handle, profile, password) {
	const res = await fetch(`${api}/users/register`, {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ name, handle, profile, password }),
	});

	if (!res.ok) return false;

	const user = await res.json();
	return user;
}

export async function updateUser(id, name, profile, password) {
	const token = getToken();

	const res = await fetch(`${api}/users/${id}`, {
		method: "put",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, profile, password }),
	});

	if (!res.ok) return false;

	const user = await res.json();
	return user;
}

export async function getTweets() {
	const res = await fetch(`${api}/tweets`);
	if (!res.ok) return false;

	const tweets = await res.json();
	return tweets;
}

export async function getTweet(id) {
	const res = await fetch(`${api}/tweets/${id}`);
	if (!res.ok) return false;

	const tweet = await res.json();
	return tweet;
}

export async function postTweet(body) {
	const token = getToken();

	const res = await fetch(`${api}/tweet`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		},
		body: JSON.stringify({ body })
	});

	if (!res.ok) return false;

	const tweet = await res.json();
	return tweet;
}

export async function postComment(body, origin) {
	const token = getToken();

	const res = await fetch(`${api}/comment`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ body, origin }),
	});

	if (!res.ok) return false;

	const tweet = await res.json();
	return tweet;
}

export async function getUser(handle) {
	const res = await fetch(`${api}/users/${handle}`);
	if (!res.ok) return false;

	const user = await res.json();

	return user;
}

export async function getUserTweets(id) {
	const res = await fetch(`${api}/tweets/user/${id}`);
	if (!res.ok) return false;

	const tweets = await res.json();

	return tweets;
}

export async function toggleFollow(id) {
	const token = getToken();

	const res = await fetch(`${api}/users/${id}/follow`, {
		'method': 'PUT',
		'headers': {
			'Authorization': `Bearer ${token}`
		}
	});

	if(!res.ok) return false;

	const result = await res.json();
	return result;
}

export async function searchUsers(q) {
	const res = await fetch(`${api}/search?q=${q}`);
	if(!res.ok) return false;

	const users = await res.json();
	return users;
}
