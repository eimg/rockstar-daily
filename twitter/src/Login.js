import { useRef, useState } from "react";
import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
	const location = useLocation();
	const navigate = useNavigate();

	const handle = useRef();
	const password = useRef();

	const [err, setErr] = useState(false);
	const [errMsg, setErrMsg] = useState("");

	return (
		<Box sx={{ my: 3, mx: { lg: 20, md: 5, sm: 5, xs: 3 } }}>
			<Typography variant="h4" sx={{ my: 4 }}>
				Login
			</Typography>

			{location.state && (
				<Alert severity="success" sx={{ mb: 4 }}>
					{location.state}
				</Alert>
			)}

			{err && (
				<Alert severity="warning" sx={{ mb: 4 }}>
					{errMsg}
				</Alert>
			)}

			<form onSubmit={e => {
				e.preventDefault();

				fetch("http://localhost:8000/users/login", {
					method: "post",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						handle: handle.current.value,
						password: password.current.value,
					}),
				})
					.then(res => {
						if (!res.ok) {
							res.json().then(json => {
								setErr(true);
								setErrMsg(json.msg);
							});
						} else {
							res.text().then(token => {
								localStorage.setItem("token", token);
								navigate("/");
							});
						}
					});
			}}>
				<OutlinedInput placeholder="handle" fullWidth sx={{ mb: 2 }} inputRef={handle} />
				<OutlinedInput
					type="password"
					placeholder="password"
					fullWidth
					sx={{ mb: 2 }}
					inputRef={password}
				/>
				<Button type="submit" variant="contained">Login</Button>
			</form>
		</Box>
	);
}
