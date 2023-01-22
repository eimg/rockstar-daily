import { useState, createContext, useContext, useEffect } from "react";

import {
	Box,
	Button,
	AppBar,
	Toolbar,
	Divider,
	useTheme,
	IconButton,
} from "@mui/material";

import {
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon,
} from "@mui/icons-material";

import { pink } from "@mui/material/colors";
import { Routes, Route } from "react-router-dom";
import { ModeContext } from "./ThemedApp";

import TaskList from "./TaskList";
import NewTask from "./NewTask";
import Edit from "./Edit";
import Title from "./Title";

export const CountContext = createContext(0);

export default function App() {
	const theme = useTheme();

	const [items, setItems] = useState([]);

	useEffect(() => {
		(async () => {
			const res = await fetch("http://localhost:8000/tasks");
			const tasks = await res.json();

			setItems(tasks);
		})();
	}, []);

	const add = subject => {
		(async () => {
			const res = await fetch("http://localhost:8000/tasks", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ subject })
			});
			const task = await res.json();

			setItems([ task, ...items ])
		})();
	};

	const remove = id => {
		setItems(items.filter(item => item._id !== id));
		fetch(`http://localhost:8000/tasks/${id}`, {
			method: "DELETE"
		});
	};

	const get = id => {
		return items.filter(item => item.id === parseInt(id))[0];
	};

	const update = (id, subject) => {
		setItems(
			items.map(item => {
				if (item.id === parseInt(id)) item.subject = subject;
				return item;
			}),
		);
	};

	const toggle = id => {
		const result = items.map(item => {
			if (item.id === id) item.done = !item.done;
			return item;
		});

		setItems(result);
	};

	const clear = () => {
		setItems(items.filter(item => !item.done));
	};

	const changeMode = useContext(ModeContext);

	return (
		<CountContext.Provider value={items.length}>
			<Box>
				<Box sx={{ flexGrow: 1 }}>
					<AppBar position="static" sx={{ bgcolor: pink[500] }}>
						<Toolbar>
							<Title />
							<Button color="inherit" onClick={clear}>
								Clear
							</Button>

							{theme.palette.mode === "dark" ? (
								<IconButton
									onClick={() => {
										changeMode();
									}}>
									<LightModeIcon />
								</IconButton>
							) : (
								<IconButton
									onClick={() => {
										changeMode();
									}}>
									<DarkModeIcon />
								</IconButton>
							)}
						</Toolbar>
					</AppBar>
				</Box>
				<Routes>
					<Route
						path="/"
						element={
							<Box
								sx={{
									mt: 4,
									px: { lg: "200px", md: "50px", sm: "10px" },
								}}>
								<NewTask add={add} />

								<TaskList
									items={items.filter(item => !item.done)}
									remove={remove}
									toggle={toggle}
								/>
								<Divider />
								<TaskList
									items={items.filter(item => item.done)}
									remove={remove}
									toggle={toggle}
								/>
							</Box>
						}
					/>
					<Route
						path="/edit/:id"
						element={<Edit get={get} update={update} />}
					/>
				</Routes>
			</Box>
		</CountContext.Provider>
	);
}
