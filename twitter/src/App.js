import { useState, useEffect } from "react";

import MainDrawer from "./MainDrawer";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import Edit from "./Edit";
import Home from "./Home";
import Tweet from "./Tweet";
import Add from "./Add";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { getTweets, verify } from "./apiCalls";

import { Fab, Snackbar } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

export default function App() {
	const navigate = useNavigate();
	const location = useLocation();

	const [drawerState, setDrawerState] = useState(false);

	const { setAuth, setAuthUser } = useAuth();

	const [tweets, setTweets] = useState([]);

	const [feedback, setFeedback] = useState(false);

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

	const addTweet = tweet => {
		setFeedback(true);
		setTweets([tweet, ...tweets]);
	}

	return (
		<div>
			<Header toggleDrawer={toggleDrawer} />
			<MainDrawer drawerState={drawerState} toggleDrawer={toggleDrawer} />
			<Routes>
				<Route path="/" element={<Home tweets={tweets} />} />
				<Route path="/add" element={<Add addTweet={addTweet} />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/edit" element={<Edit />} />
				<Route path="/tweet/:id" element={<Tweet tweets={tweets} />} />
			</Routes>

			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				open={feedback}
				autoHideDuration={5000}
				onClose={() => {
					setFeedback(false);
				}}
				message="You tweet posted"
			/>

			{location.pathname !== "/add" && (
				<Fab
					color="success"
					sx={{ position: "fixed", right: 40, bottom: 40 }}
					onClick={() => {
						navigate("/add");
					}}>
					<AddIcon />
				</Fab>
			)}
		</div>
	);
}
