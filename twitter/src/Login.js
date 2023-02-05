import { useRef, useState } from "react";
import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "./AuthProvider";
import { login, verify } from "./apiCalls";

export default function Login() {
	const location = useLocation();
	const navigate = useNavigate();

	const handle = useRef();
	const password = useRef();

	const [err, setErr] = useState(false);
	const [errMsg, setErrMsg] = useState("");

	const { setAuth, setAuthUser } = useAuth();

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

			<form
				onSubmit={e => {
					e.preventDefault();

					(async () => {
						const token = await login(
							handle.current.value,
							password.current.value,
						);

						if(token) {
							setAuth(true);

							const user = await verify();
							setAuthUser(user);

							navigate("/");
						} else {
							setErr(true);
							setErrMsg("Handle or password incorrect");
						}
					})();
				}}>
				<OutlinedInput
					placeholder="handle"
					fullWidth
					sx={{ mb: 2 }}
					inputRef={handle}
				/>
				<OutlinedInput
					type="password"
					placeholder="password"
					fullWidth
					sx={{ mb: 2 }}
					inputRef={password}
				/>
				<Button type="submit" variant="contained">
					Login
				</Button>
			</form>
		</Box>
	);
}
