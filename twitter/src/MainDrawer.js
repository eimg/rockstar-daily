import * as React from "react";
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

export default function MainDrawer({drawerState, toggleDrawer}) {
	const list = () => (
		<Box
			sx={{ width: 250 }}
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}>
			<List>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<LoginIcon />
						</ListItemIcon>
						<ListItemText primary="Login" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton>
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
		<div>
			<React.Fragment>
				<Drawer
					anchor="left"
					open={drawerState}
					onClose={toggleDrawer(false)}>
					{list()}
				</Drawer>
			</React.Fragment>
		</div>
	);
}
