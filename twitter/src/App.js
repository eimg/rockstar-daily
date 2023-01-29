import { useState } from "react";
import MainDrawer from "./MainDrawer";
import Header from "./Header";

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
		</div>
	);
}
