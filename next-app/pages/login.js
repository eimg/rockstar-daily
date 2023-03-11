import { useRef, useState } from "react";

import {
	Box,
	Typography,
	Button,
	Alert,
	OutlinedInput,
} from "@mui/material";

import { login, verify } from "@/apiCalls";
import { useRouter } from "next/router";

import { useAuth } from "@/AuthProvider";

export default function Home() {
	const router = useRouter();
	const handle = useRef();
	const password = useRef();
	const [err, setErr] = useState();
	const { setAuth, setAuthUser } = useAuth();

	return (
		<Box sx={{ my: 3, mx: { lg: 20, md: 5, sm: 5, xs: 3 } }}>
			<Typography variant="h4" sx={{ my: 4 }}>
				Login
			</Typography>

			{err && (
				<Alert severity="warning" sx={{ mb: 4 }}>
					{err}
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

						if (token) {
							setAuth(true);
							const user = await verify();
							setAuthUser(user);
							router.push("/");
						} else {
							setErr("Handle or password incorrect");
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
