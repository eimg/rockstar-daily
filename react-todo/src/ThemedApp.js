import { createContext, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

export const ModeContext = createContext();

export default function ThemedApp({ children }) {
	const [mode, setMode] = useState("dark");
	const changeMode = () => {
		setMode(mode === "dark" ? "light" : "dark");
	};

	const theme = createTheme({
		palette: {
			mode,
			...(mode === "dark"
				? {
						text: { fade: "#888", light: "#fff" },
				  }
				: {
						text: { fade: "#888", light: "#000" },
				  }),
		},
	});

	return (
		<ModeContext.Provider value={changeMode}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ModeContext.Provider>
	);
}
