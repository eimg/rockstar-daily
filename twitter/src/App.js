import { useState } from "react";
import MainDrawer from "./MainDrawer";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";

import { Routes, Route } from "react-router-dom";

const Home = <div>Home</div>;

export default function App() {
	const [drawerState, setDrawerState] = useState(false);

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
				<Route path="/" element={Home} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</div>
	);
}
