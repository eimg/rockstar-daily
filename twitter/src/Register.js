import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
	const name = useRef();
	const handle = useRef();
	const profile = useRef();
	const password = useRef();

	const [err, setErr] = useState(false);
	const [errMsg, setErrMsg] = useState("");

	const navigate = useNavigate();

	return (
		<Box sx={{ my: 3, mx: { lg: 20, md: 5, sm: 5, xs: 3 } }}>
			<Typography variant="h4" sx={{ my: 4 }}>
				Register
			</Typography>

			{err && <Alert severity="warning" sx={{mb: 4}}>{errMsg}</Alert>}

			<form
				onSubmit={e => {
					e.preventDefault();

					fetch("http://localhost:8000/users/register", {
						method: "post",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							name: name.current.value,
							handle: handle.current.value,
							profile: profile.current.value,
							password: password.current.value
						})
					})
					.then(res => {
						if(!res.ok) return res.json();
						else navigate("/login", { state: "Register successful" });
					})
					.then(json => {
						setErr(true);
						setErrMsg(json.msg);
					});
				}}>
				<OutlinedInput
					placeholder="name"
					fullWidth
					sx={{ mb: 2 }}
					inputRef={name}
				/>
				<OutlinedInput
					placeholder="handle"
					fullWidth
					sx={{ mb: 2 }}
					inputRef={handle}
				/>
				<OutlinedInput
					placeholder="profile"
					fullWidth
					sx={{ mb: 2 }}
					inputRef={profile}
				/>
				<OutlinedInput
					type="password"
					placeholder="password"
					fullWidth
					sx={{ mb: 2 }}
					inputRef={password}
				/>
				<Button type="submit" variant="contained">Register</Button>
			</form>
		</Box>
	);
}
