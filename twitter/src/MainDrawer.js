import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {
	Login as LoginIcon,
	PersonAdd as PersonAddIcon
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

export default function MainDrawer({drawerState, toggleDrawer}) {
	const navigate = useNavigate();

	const list = () => (
		<Box
			sx={{ width: 250 }}
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}>
			<List>
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
		</Box>
	);

	return (
		<Drawer anchor="left" open={drawerState} onClose={toggleDrawer(false)}>
			{list()}
		</Drawer>
	);
}
