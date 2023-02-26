import { Button } from "@mui/material";
import { toggleFollow } from "./apiCalls";
import { useAuth } from "./AuthProvider";

export default function FollowButton({ user }) {
	const { authUser, setAuthUser } = useAuth();

	return authUser.following &&
		authUser.following.find(uid => uid === user._id) ? (
		<Button
			size="small" edge="end" variant="outlined" sx={{ borderRadius: 5 }}
			onClick={() => {
				(async () => {
					let result = await toggleFollow(user._id);
					authUser.following = result.following;
					setAuthUser({ ...authUser });
				})();
			}}>
			Followed
		</Button>
	) : (
		<Button
			size="small" edge="end" variant="contained"
			sx={{ borderRadius: 5 }}
			onClick={() => {
				(async () => {
					let result = await toggleFollow(user._id);
					authUser.following = result.following;
					setAuthUser({ ...authUser });
				})();
			}}>
			Follow
		</Button>
	);
}
