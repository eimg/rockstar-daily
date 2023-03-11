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
import Likes from "./Likes";
import Followers from "./Followers";
import Following from "./Following";
import Notis from "./Notis";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { getTweets, verify } from "./apiCalls";

import { Fab, Snackbar } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import { putLike, fetchNotis } from "./apiCalls";

export default function App() {
	const navigate = useNavigate();
	const location = useLocation();

	const [drawerState, setDrawerState] = useState(false);

	const { setAuth, setAuthUser, authUser } = useAuth();

	const [tweets, setTweets] = useState([]);

	const [feedback, setFeedback] = useState(false);

	const [notiCount, setNotiCount] = useState(0);

	useEffect(() => {
		(async () => {
			const tweets = await getTweets();
			setTweets(tweets);

			const notis = await fetchNotis();
			setNotiCount(notis.filter(n => !n.read).length);
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
	};

	const updateTweets = update => {
		setTweets(
			tweets.map(tweet => {
				if (tweet._id === update._id) return update;
				else return tweet;
			}),
		);
	};

	const toggleLike = id => {
		putLike(id);
		setTweets(
			tweets.map(tweet => {
				if (tweet._id === id) {
					if (tweet.likes.find(n => n === authUser._id)) {
						tweet.likes = tweet.likes.filter(
							n => n !== authUser._id,
						);
					} else {
						tweet.likes = [authUser._id, ...tweet.likes];
					}
				}

				return tweet;
			}),
		);
	};

	return (
		<div>
			<Header toggleDrawer={toggleDrawer} notiCount={notiCount} />
			<MainDrawer drawerState={drawerState} toggleDrawer={toggleDrawer} />
			<Routes>
				<Route
					path="/"
					element={<Home tweets={tweets} toggleLike={toggleLike} />}
				/>
				<Route path="/add" element={<Add addTweet={addTweet} />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/@/:handle" element={<Profile />} />
				<Route path="/edit" element={<Edit />} />
				<Route path="/likes" element={<Likes />} />
				<Route path="/followers" element={<Followers />} />
				<Route path="/following" element={<Following />} />
				<Route
					path="/notis"
					element={<Notis setNotiCount={setNotiCount} />}
				/>
				<Route
					path="/tweet/:id"
					element={
						<Tweet tweets={tweets} updateTweets={updateTweets} />
					}
				/>
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
