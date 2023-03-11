import { useEffect, useState } from "react";

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

import { getTweets } from "@/apiCalls";
import { useRouter } from "next/router";

export default function Home() {
	const [tweets, setTweets] = useState([]);
	useEffect(() => {
		(async () => {
			const result = await getTweets();
			setTweets(result);
		})();
	}, []);

	const router = useRouter();

	return (
		<Box sx={{ my: 3, mx: { lg: 20, md: 5, sm: 5, xs: 3 } }}>
			{tweets.map(tweet => {
				return (
					<Card sx={{ mb: 2 }} key={tweet._id}>
						<CardContent
							sx={{ display: "flex", alignItems: "flex-start" }}>
							<IconButton onClick={() => {
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

										<Button
											variant="clear"
											onClick={() => {}}>
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
				);
			})}
		</Box>
	);
}
