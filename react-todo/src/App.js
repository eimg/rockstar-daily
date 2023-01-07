import { useState, createContext } from "react";
import TaskList from "./TaskList";
import NewTask from "./NewTask";
import Edit from "./Edit";
import Title from "./Title";
import { Box, Button, AppBar, Toolbar, Divider, } from "@mui/material";
import { pink } from "@mui/material/colors";
import { Routes, Route } from "react-router-dom";

export const CountContext = createContext(0);

export default function App() {
	const [items, setItems] = useState([
		{ id: 1, subject: "Egg", done: false },
		{ id: 2, subject: "Apple", done: true },
		{ id: 3, subject: "Bread", done: false },
	]);

	const add = subject => {
		setItems([{ id: items.length + 1, subject, done: false }, ...items]);
	};

	const remove = id => {
		setItems(items.filter(item => item.id !== id));
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
