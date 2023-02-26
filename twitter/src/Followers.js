import {
	Box,
	List,
	Avatar,
	ListItem,
	ListItemText,
	ListItemAvatar,
} from "@mui/material";

import { useLocation, Link } from "react-router-dom";

import FollowButton from "./FollowButton";

export default function Followers() {
	const location = useLocation();
	const { users } = location.state;

	return (
		<Box sx={{ my: 3, mx: { lg: 20, md: 5, sm: 5, xs: 3 } }}>
			<List>
				{users.map(user => {
					return (
						<ListItem
							key={user._id}
							secondaryAction={
								<FollowButton user={user} />
							}>
							<ListItemAvatar>
								<Link to={`/@${user.handle}`}>
									<Avatar alt="Profile"></Avatar>
								</Link>
							</ListItemAvatar>
							<ListItemText
								primary={user.name + " @" + user.handle}
								secondary={user.profile}
							/>
						</ListItem>
					);
				})}
			</List>
		</Box>
	);
}
