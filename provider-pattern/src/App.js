import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export default function App() {
	const { theme, setTheme } = useContext(ThemeContext);

	return (
		<div
			style={{
				height: 600,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: theme === "dark" ? "black" : "white",
			}}>
				<button onClick={() => {
					setTheme(theme === "dark" ? "light" : "dark");
				}}>Switch Theme</button>
			</div>
	);
}
