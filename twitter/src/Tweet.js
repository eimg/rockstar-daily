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

import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";

export default function Tweet({ tweets }) {
	const { id } = useParams();

	const navigate = useNavigate();

	const tweet = useMemo(() => {
		const result = tweets.filter(t => t._id == id);
		return result[0];
	}, [id]);

	return (
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
								<CardActionArea onClick={() => {
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
		</Box>
	);
}
