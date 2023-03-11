import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body>
				<Box sx={{ flexGrow: 1 }}>
					<AppBar position="static">
						<Toolbar>
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="menu"
								sx={{ mr: 2 }}>
								<TwitterIcon />
							</IconButton>
							<Typography
								variant="h6"
								component="div"
								sx={{ flexGrow: 1 }}>
								Next Twitter
							</Typography>
							<Button color="inherit">
								<Link href="/">Home</Link>
							</Button>
							<Button color="inherit">
								<Link href="/login">Login</Link>
							</Button>
							<Button color="inherit">
								<Link href="/">Logout</Link>
							</Button>
						</Toolbar>
					</AppBar>
				</Box>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
