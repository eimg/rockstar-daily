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
	OutlinedInput,
} from "@mui/material";

import { blue, pink, green } from "@mui/material/colors";

import {
	Favorite as FavoriteIcon,
	FavoriteBorder as FavoriteBorderIcon,
	ChatBubbleOutline as ChatBubbleOutlineIcon,
} from "@mui/icons-material";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { getTweet, postComment } from "./apiCalls";

export default function Tweet({ tweets, updateTweets }) {
	const { id } = useParams();

	const navigate = useNavigate();
	const [tweet, setTweet] = useState({});
	const [loading, setLoading] = useState(true);

	const body = useRef();

	// const cache = useMemo(() => {
	// 	const result = tweets.filter(t => t._id == id);
	// 	return result[0];
	// }, [id]);

	useEffect(() => {
		(async () => {
			const result = await getTweet(id);
			setTweet(result);
			setLoading(false);
		})();
	}, []);

	return (
		!loading && (
			<Box sx={{ my: 3, mx: { lg: 20, md: 5, sm: 5, xs: 3 } }}>
				<Card sx={{ mb: 2 }} key={tweet._id}>
					<CardContent sx={{ display: "flex" }}>
						<Avatar
							alt="Profile"
							sx={{
								width: 80,
								height: 80,
								background: blue[600],
							}}
						/>
						<Box sx={{ ml: 2, flexGrow: 1 }}>
							<Box sx={{ display: "flex", mb: 1 }}>
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
							</Box>
							<CardActionArea>
								<Typography sx={{ fontSize: "1.1em" }}>
									{tweet.body}
								</Typography>
							</CardActionArea>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-around",
									mt: 2,
								}}>
								<ButtonGroup>
									<IconButton>
										<FavoriteBorderIcon
											sx={{ color: pink[500] }}
										/>
									</IconButton>
									<Button variant="clear">
										{tweet.likes.length}
									</Button>
								</ButtonGroup>
								<ButtonGroup>
									<IconButton>
										<ChatBubbleOutlineIcon
											sx={{ color: green[500] }}
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

				{tweet.comments.map(comment => {
					return (
						<Card sx={{ mb: 2 }} key={comment._id}>
							<CardContent sx={{ display: "flex" }}>
								<Avatar
									alt="Profile"
									sx={{
										width: 48,
										height: 48,
									}}
								/>
								<Box sx={{ ml: 2, flexGrow: 1 }}>
									<Box sx={{ display: "flex", mb: 1 }}>
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
											{comment.created}
										</Typography>
									</Box>
									<CardActionArea
										onClick={() => {
											navigate(`/tweet/${comment._id}`);
										}}>
										{comment.body}
									</CardActionArea>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-around",
											mt: 2,
										}}>
										<ButtonGroup>
											<IconButton>
												<FavoriteBorderIcon
													sx={{
														color: pink[500],
													}}
												/>
											</IconButton>
											<Button variant="clear">
												{comment.likes.length}
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
												{comment.comments.length}
											</Button>
										</ButtonGroup>
									</Box>
								</Box>
							</CardContent>
						</Card>
					);
				})}

				<Box>
					<form
						onSubmit={e => {
							e.preventDefault();

							(async () => {
								if (!body.current.value) return false;

								const comment = await postComment(
									body.current.value,
									tweet._id,
								);

								if (!comment) return false;

								const result = await getTweet(id);
								setTweet(result);
								updateTweets(result);
							})();
						}}>
						<OutlinedInput
							placeholder="Your reply"
							fullWidth
							inputRef={body}
							multiline
							sx={{ mb: 2 }}
						/>
						<Box
							sx={{
								display: "flex",
								justifyContent: "flex-end",
							}}>
							<Button type="submit" variant="contained">
								Reply
							</Button>
						</Box>
					</form>
				</Box>
			</Box>
		)
	);
}
