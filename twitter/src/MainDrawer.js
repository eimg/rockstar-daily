import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {
	Home as HomeIcon,
	Login as LoginIcon,
	PersonAdd as PersonAddIcon,
	Logout as LogoutIcon,
	Person as PersonIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import { useAuth } from "./AuthProvider";
import { Typography } from "@mui/material";

export default function MainDrawer({ drawerState, toggleDrawer }) {
	const navigate = useNavigate();

	const { auth, setAuth, authUser, setAuthUser } = useAuth();

	const list = () => (
		<Box
			sx={{ width: 250 }}
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}>
			<Box
				sx={{
					height: 150,
					bgcolor: "grey",
					p: 3,
					display: "flex",
					alignItems: "flex-end",
				}}>
				<Typography sx={{ color: "white" }}>
					{authUser.name}@{authUser.handle}
				</Typography>
			</Box>

			{auth ? (
				<List>
					<ListItem disablePadding>
						<ListItemButton
							onClick={() => {
								navigate("/");
							}}>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary="Home" />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton
							onClick={() => {
								navigate(`/@/${authUser.handle}`);
							}}>
							<ListItemIcon>
								<PersonIcon />
							</ListItemIcon>
							<ListItemText primary="Profile" />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton
							onClick={() => {
								setAuth(false);
								setAuthUser({});
								localStorage.removeItem("token");
							}}>
							<ListItemIcon>
								<LogoutIcon />
							</ListItemIcon>
							<ListItemText primary="Logout" />
						</ListItemButton>
					</ListItem>
				</List>
			) : (
				<List>
					<ListItem disablePadding>
						<ListItemButton
							onClick={() => {
								navigate("/");
							}}>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary="Home" />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton
							onClick={() => {
								navigate("/login");
							}}>
							<ListItemIcon>
								<LoginIcon />
							</ListItemIcon>
							<ListItemText primary="Login" />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton
							onClick={() => {
								navigate("/register");
							}}>
							<ListItemIcon>
								<PersonAddIcon />
							</ListItemIcon>
							<ListItemText primary="Register" />
						</ListItemButton>
					</ListItem>
				</List>
			)}
		</Box>
	);

	return (
		<Drawer anchor="left" open={drawerState} onClose={toggleDrawer(false)}>
			{list()}
		</Drawer>
	);
}
