import { useRef, useState } from "react";
import { Alert, Avatar, Box, Button, OutlinedInput } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { postTweet } from "./apiCalls";

export default function Add({ addTweet }) {
	const navigate = useNavigate();

	const body = useRef();

	const [err, setErr] = useState(false);
	const [errMsg, setErrMsg] = useState("");

	return (
		<Box sx={{ my: 3, mx: { lg: 20, md: 5, sm: 5, xs: 3 } }}>
			{err && (
				<Alert severity="warning" sx={{ mb: 4 }}>
					{errMsg}
				</Alert>
			)}

			<form
				onSubmit={e => {
					e.preventDefault();
					(async () => {
						if(!body) {
							setErr(true);
							setErrMsg( "body is required");
							return false;
						}

						const tweet = await postTweet(body.current.value);
						if(!tweet) {
							setErr(true);
							setErrMsg("Something went wrong, please try again.");
							return false;
						}

						addTweet(tweet);
						navigate("/");
					})();
				}}>
				<Box sx={{display: "flex", justifyContent: "space-between", mb: 2}}>
					<Avatar />
					<Button type="submit" variant="contained">
						Tweet
					</Button>
				</Box>
				<OutlinedInput
					placeholder="What's on your mind"
					fullWidth
					sx={{ mb: 2 }}
					inputRef={body}
					multiline
					rows={3}
				/>
			</form>
		</Box>
	);
}
