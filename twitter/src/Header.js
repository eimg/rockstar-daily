import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

import { useLocation, useNavigate } from "react-router-dom";

import Search from "./Search";

export default function Header({toggleDrawer, notiCount}) {
	const location = useLocation();
	const navigate = useNavigate();

	const [searchOpen, setSearchOpen] = useState(false);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					{location.pathname === "/" ? (
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							onClick={toggleDrawer(true)}>
							<MenuIcon />
						</IconButton>
					) : (
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							onClick={() => {
								navigate(-1);
							}}>
							<ArrowBackIcon />
						</IconButton>
					)}

					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, textAlign: "center" }}>
						Twitter
					</Typography>

					<IconButton
						color="inherit"
						sx={{ mr: 1 }}
						onClick={() => {
							setSearchOpen(true);
						}}>
						<PersonSearchIcon />
					</IconButton>

					<IconButton
						color="inherit"
						onClick={() => {
							navigate("/notis");
						}}>
						<Badge badgeContent={notiCount} color="error">
							<NotificationsIcon />
						</Badge>
					</IconButton>
				</Toolbar>
			</AppBar>

			<Search open={searchOpen} setOpen={setSearchOpen} />
		</Box>
	);
}
