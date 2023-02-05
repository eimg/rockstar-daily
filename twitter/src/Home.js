import {
	Avatar,
	Box,
	Card,
	CardActionArea,
	CardContent,
	Typography,
} from "@mui/material";

export default function Home({ tweets }) {
	return (
		<Box sx={{ my: 3, mx: { lg: 20, md: 5, sm: 5, xs: 3 } }}>
			{tweets.map(tweet => {
				return (
					<Card sx={{ mb: 2 }}>
						<CardContent sx={{ display: "flex" }}>
							<Avatar
								alt="Profile"
								sx={{ width: 64, height: 64 }}
							/>
							<Box sx={{ ml: 2, mt: 1 }}>
								<Typography>{tweet.user}</Typography>
								<CardActionArea>{tweet.body}</CardActionArea>
							</Box>
						</CardContent>
					</Card>
				);
			})}
		</Box>
	);
}
