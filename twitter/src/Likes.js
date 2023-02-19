import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function Likes() {
	const location = useLocation();
	const { users } = location.state;

	return <Box sx={{ my: 3, mx: { lg: 20, md: 5, sm: 5, xs: 3 } }}>
		{users.map(user => {
			return <div>{user.name}</div>;
		})}
	</Box>;
}
