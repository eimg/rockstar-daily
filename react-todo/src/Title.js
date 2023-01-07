import { useContext } from "react";
import { Typography } from "@mui/material";

import { CountContext } from "./App";

export default function Title() {
	const count = useContext(CountContext);

	return (
		<Typography variant="h6" sx={{ flexGrow: 1 }}>
			Todo List ({count})
		</Typography>
	);
}
