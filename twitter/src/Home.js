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

import { useNavigate } from "react-router-dom";

import { useAuth } from "./AuthProvider";

export default function Home({ tweets, toggleLike }) {
	const navigate = useNavigate();

	const { authUser } = useAuth();

	return (
		<Box sx={{ my: 3, mx: { lg: 20, md: 5, sm: 5, xs: 3 } }}>
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
										<IconButton onClick={() => {
											toggleLike(tweet._id);
										}}>
											{tweet.likes.find(
												n => n === authUser._id,
											) ? (
												<FavoriteIcon
													sx={{ color: pink[500] }}
												/>
											) : (
												<FavoriteBorderIcon
													sx={{ color: pink[500] }}
												/>
											)}
										</IconButton>

										<Button variant="clear" onClick={() => {
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
