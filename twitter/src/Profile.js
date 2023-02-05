import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "./AuthProvider";

export default function Login() {
	const navigate = useNavigate();

	const { authUser } = useAuth();

	return (
		<Box sx={{ my: 3, mx: { lg: 20, md: 5, sm: 5, xs: 3 } }}>
			<Box sx={{ height: 150, background: "grey", mb: 2 }}></Box>

			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<Box>
					<Typography>
						{authUser.name}
						<Typography
							component="span"
							sx={{ color: "grey", fontSize: "0.8em", ml: 1 }}>
							@{authUser.handle}
						</Typography>
					</Typography>
					<Typography sx={{ mt: 1, fontSize: "0.9em" }}>
						{authUser.profile}
					</Typography>
				</Box>
				<Box>
					<Button variant="contained" onClick={() => {
						navigate("/edit");
					}}>Edit Profile</Button>
				</Box>
			</Box>
		</Box>
	);
}
