import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { updateUser } from "./apiCalls";
import { useAuth } from "./AuthProvider";

export default function Register() {
	const name = useRef();
	const profile = useRef();
	const password = useRef();

	const [err, setErr] = useState(false);
	const [success, setSuccess] = useState(false);
	const [errMsg, setErrMsg] = useState("");

	const navigate = useNavigate();

	const { authUser, setAuthUser } = useAuth();

	return (
		<Box sx={{ my: 3, mx: { lg: 20, md: 5, sm: 5, xs: 3 } }}>
			<Typography variant="h4" sx={{ my: 4 }}>
				Edit Profile
			</Typography>

			{err && (
				<Alert severity="warning" sx={{ mb: 4 }}>
					{errMsg}
				</Alert>
			)}

			{success && (
				<Alert severity="success" sx={{ mb: 4 }}>
					Profile updated
				</Alert>
			)}

			<form
				onSubmit={e => {
					e.preventDefault();

					(async () => {
						const user = await updateUser(
							authUser._id,
							name.current.value,
							profile.current.value,
							password.current.value,
						);

						if (user) {
							setAuthUser(user);
							setSuccess(true);
						} else {
							setErr(true);
							setErrMsg(
								"Profile update failed, please try again",
							);
						}
					})();
				}}>
				<OutlinedInput
					defaultValue={authUser.name}
					placeholder="Name"
					fullWidth
					sx={{ mb: 2 }}
					inputRef={name}
				/>
				<OutlinedInput
					defaultValue={authUser.handle}
					placeholder="Handle"
					fullWidth
					sx={{ mb: 2 }}
					readOnly
				/>
				<OutlinedInput
					defaultValue={authUser.profile}
					placeholder="Profile"
					fullWidth
					sx={{ mb: 2 }}
					inputRef={profile}
				/>
				<OutlinedInput
					type="password"
					placeholder="Password (leave blank to unchange)"
					fullWidth
					sx={{ mb: 2 }}
					inputRef={password}
				/>
				<Button type="submit" variant="contained">
					Update
				</Button>
			</form>
		</Box>
	);
}
