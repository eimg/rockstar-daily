import { useState, useEffect } from "react";
import MainDrawer from "./MainDrawer";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import Edit from "./Edit";
import Home from "./Home";

import { Routes, Route } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { getTweets, verify } from "./apiCalls";

export default function App() {
	const [drawerState, setDrawerState] = useState(false);

	const { setAuth, setAuthUser } = useAuth();

	const [tweets, setTweets] = useState([]);

	useEffect(() => {
		(async () => {
			const tweets = await getTweets();
			setTweets(tweets);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const user = await verify();
			if (user) {
				setAuth(true);
				setAuthUser(user);
			}
		})();
	}, [setAuth, setAuthUser]);

	const toggleDrawer = open => event => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setDrawerState(open);
	};

	return (
		<div>
			<Header toggleDrawer={toggleDrawer} />
			<MainDrawer drawerState={drawerState} toggleDrawer={toggleDrawer} />
			<Routes>
				<Route path="/" element={<Home tweets={tweets} />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/edit" element={<Edit />} />
			</Routes>
		</div>
	);
}
