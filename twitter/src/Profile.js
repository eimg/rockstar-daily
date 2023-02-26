import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, getUserTweets } from "./apiCalls";

import {
	Avatar,
	Box,
	Card,
	CardActionArea,
	CardContent,
	Typography,
	ButtonGroup,
	Button,
	IconButton,
} from "@mui/material";

import { blue, pink, green } from "@mui/material/colors";

import {
	Favorite as FavoriteIcon,
	FavoriteBorder as FavoriteBorderIcon,
	ChatBubbleOutline as ChatBubbleOutlineIcon,
} from "@mui/icons-material";

import { useAuth } from "./AuthProvider";

import FollowButton from "./FollowButton";

export default function Profile() {
	const navigate = useNavigate();
	const { handle } = useParams();

	const { authUser } = useAuth();

	const [user, setUser] = useState(authUser);
	const [tweets, setTweets] = useState([]);

	const toggleLike = () => {};

	useEffect(() => {
		(async () => {
			const update = await getUser(handle);
			if (update) setUser(update);

			const list = await getUserTweets(update._id);
			if (list) setTweets(list);
		})();
	}, [handle]);

	return (
		<Box sx={{ my: 3, mx: { lg: 20, md: 5, sm: 5, xs: 3 } }}>
			<Box sx={{ height: 150, background: "grey", mb: 2 }}></Box>

			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<Box>
					<Typography>
						{user.name}
						<Typography
							component="span"
							sx={{ color: "grey", fontSize: "0.8em", ml: 1 }}>
							@{user.handle}
						</Typography>
					</Typography>
					<Typography sx={{ mt: 1, fontSize: "0.9em" }}>
						{user.profile}
					</Typography>

					<Box sx={{ mt: 4 }}>
						<Button
							onClick={() => {
								navigate("/followers", {
									state: {
										users: user.followers_users,
									},
								});
							}}
							sx={{ mr: 4, color: blue[500] }}>
							{user.followers_users &&
								user.followers_users.length}{" "}
							Followers
						</Button>
						<Button
							onClick={() => {
								navigate("/following", {
									state: {
										users: user.following_users,
									},
								});
							}}
							sx={{ mr: 4, color: pink[500] }}>
							{user.following_users &&
								user.following_users.length}{" "}
							Following
						</Button>
					</Box>
				</Box>
				<Box>
					{user._id === authUser._id ? (
						<Button
							variant="contained"
							onClick={() => {
								navigate("/edit");
							}}>
							Edit Profile
						</Button>
					) : (
						<FollowButton user={user} />
					)}
				</Box>
			</Box>
			<Box sx={{ mt: 3 }}>
				{tweets.map(tweet => {
					return (
						<Card sx={{ mb: 2 }} key={tweet._id}>
							<CardContent sx={{ display: "flex" }}>
								<Avatar
									alt="Profile"
									sx={{
										width: 64,
										height: 64,
										background: blue[600],
									}}
								/>
								<Box sx={{ ml: 2, flexGrow: 1 }}>
									<Box sx={{ display: "flex", mb: 1 }}>
										<CardActionArea
											sx={{
												display: "flex",
												justifyContent: "flex-start",
												flexWrap: "wrap",
											}}
											onClick={() => {
												navigate(
													`/@/${tweet.owner_user[0].handle}`,
												);
											}}>
											<Typography
												sx={{
													fontWeight: "bold",
													fontSize: "0.9em",
												}}>
												{tweet.owner_user[0].name}
											</Typography>
											<Typography
												sx={{
													fontSize: "0.8em",
													ml: 1,
													color: "grey",
												}}>
												@{tweet.owner_user[0].handle}
											</Typography>
											<Typography
												sx={{
													fontSize: "0.8em",
													ml: 1,
													color: blue[500],
												}}>
												{tweet.created}
											</Typography>
										</CardActionArea>
									</Box>
									<CardActionArea
										onClick={() => {
											navigate(`/tweet/${tweet._id}`);
										}}>
										{tweet.body}
									</CardActionArea>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-around",
											mt: 2,
										}}>
										<ButtonGroup>
											<IconButton
												onClick={() => {
													toggleLike(tweet._id);
												}}>
												{tweet.likes.find(
													n => n === authUser._id,
												) ? (
													<FavoriteIcon
														sx={{
															color: pink[500],
														}}
													/>
												) : (
													<FavoriteBorderIcon
														sx={{
															color: pink[500],
														}}
													/>
												)}
											</IconButton>

											<Button
												variant="clear"
												onClick={() => {
													navigate("/likes", {
														state: {
															users: tweet.likes_users,
														},
													});
												}}>
												{tweet.likes.length}
											</Button>
										</ButtonGroup>
										<ButtonGroup>
											<IconButton>
												<ChatBubbleOutlineIcon
													sx={{
														color: green[500],
													}}
												/>
											</IconButton>
											<Button variant="clear">
												{tweet.comments.length}
											</Button>
										</ButtonGroup>
									</Box>
								</Box>
							</CardContent>
						</Card>
					);
				})}
			</Box>
		</Box>
	);
}
