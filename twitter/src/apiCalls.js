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
