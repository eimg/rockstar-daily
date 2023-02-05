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
import { verify } from "./apiCalls";

export default function App() {
	const [drawerState, setDrawerState] = useState(false);

	const { setAuth, setAuthUser } = useAuth();

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

	const tweets = [
		{ user: "Alice", body: "Some tweet body conent" },
		{ user: "Bob", body: "Some other tweet post body" },
		{ user: "Tom", body: "More tweet body content"},
	];

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
