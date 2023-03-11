import { useRouter } from "next/router";

import { useEffect, useRef, useState } from "react";

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

import { getTweet, postComment } from "@/apiCalls";

export default function Tweet() {
	const body = useRef();
	const router = useRouter();
	const { id } = router.query;

	const [tweet, setTweet] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		(async () => {
			const result = await getTweet(id);
			setTweet(result);
			setIsLoading(false);
		})();
	}, [id]);

	return (
		!isLoading && (
			<Box sx={{ my: 3, mx: { lg: 20, md: 5, sm: 5, xs: 3 } }}>
				<Card sx={{ mb: 2 }} key={tweet._id}>
					<CardContent
						sx={{ display: "flex", alignItems: "flex-start" }}>
						<IconButton
							onClick={() => {
								router.push(`/tweet/${tweet._id}`);
							}}>
							<Avatar
								alt="Profile"
								sx={{
									width: 64,
									height: 64,
									background: blue[600],
								}}
							/>
						</IconButton>
						<Box sx={{ ml: 2, flexGrow: 1 }}>
							<Box sx={{ display: "flex", mb: 1 }}>
								<CardActionArea
									sx={{
										display: "flex",
										justifyContent: "flex-start",
										flexWrap: "wrap",
									}}
									onClick={() => {}}>
									<Typography
										sx={{
											fontWeight: "bold",
											fontSize: "0.9em",
										}}>
										{tweet.owner_user &&
											tweet.owner_user[0].name}
									</Typography>
									<Typography
										sx={{
											fontSize: "0.8em",
											ml: 1,
											color: "grey",
										}}>
										@
										{tweet.owner_user &&
											tweet.owner_user[0].handle}
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
							<CardActionArea onClick={() => {}}>
								{tweet.body}
							</CardActionArea>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-around",
									mt: 2,
								}}>
								<ButtonGroup>
									<IconButton onClick={() => {}}>
										<FavoriteBorderIcon
											sx={{ color: pink[500] }}
										/>
									</IconButton>

									<Button variant="clear" onClick={() => {}}>
										{tweet.likes && tweet.likes.length}
									</Button>
								</ButtonGroup>
								<ButtonGroup>
									<IconButton>
										<ChatBubbleOutlineIcon
											sx={{ color: green[500] }}
										/>
									</IconButton>
									<Button variant="clear">
										{tweet.comments && tweet.comments.length}
									</Button>
								</ButtonGroup>
							</Box>
						</Box>
					</CardContent>
				</Card>

				{tweet.comments && tweet.comments.map(comment => {
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
											{comment.owner_user[0].name}
										</Typography>
										<Typography
											sx={{
												fontSize: "0.8em",
												ml: 1,
												color: "grey",
											}}>
											@{comment.owner_user[0].handle}
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
