import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import {
	ThemeProvider,
	Button,
	createTheme,
	Badge,
	Text,
	useTheme,
	useThemeMode,
} from "@rneui/themed";

import Ionicons from "@expo/vector-icons/Ionicons";

import List from "./List";
import Edit from "./Edit";

import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const rneTheme = createTheme({
	mode: "dark",
});

export default function NavigatedApp() {
	const [navMode, setNavMode] = useState("dark");

	return (
		<NavigationContainer
			theme={navMode === "dark" ? DarkTheme : DefaultTheme}>
			<ThemeProvider theme={rneTheme}>
				<App setNavMode={setNavMode} />
			</ThemeProvider>
		</NavigationContainer>
	);
}

function App({ setNavMode }) {
	const { theme } = useTheme();
	const { mode, setMode } = useThemeMode();

	const [items, setItems] = useState([
		{ id: 1, subject: "Egg", done: false },
		{ id: 2, subject: "Apple", done: true },
		{ id: 3, subject: "Bread", done: false },
	]);

	const update = (id, subject) => {
		setItems(
			items.map(item => {
				if (item.id === id) item.subject = subject;
				return item;
			}),
		);
	};

	return (
		<Stack.Navigator>
			<Stack.Screen
				name="List"
				options={{
					headerTitle: () => (
						<View style={{ flexDirection: "row" }}>
							<Text
								style={{
									fontSize: 16,
									fontWeight: "Bold",
									marginRight: 10,
								}}>
								Todo List
							</Text>
							<Badge
								value={items.filter(i => !i.done).length}
								status="error"
							/>
						</View>
					),
					headerRight: () => (
						<View style={{ marginRight: 30 }}>
							<TouchableOpacity
								onPress={() => {
									setMode(mode === "dark" ? "light" : "dark");
									setNavMode(
										mode === "dark" ? "light" : "dark",
									);
								}}>
								{mode === "dark" ? (
									<Ionicons
										name="sunny"
										size={24}
										color={theme.colors.black}
									/>
								) : (
									<Ionicons
										name="moon"
										size={24}
										color={theme.colors.black}
									/>
								)}
							</TouchableOpacity>
						</View>
					),
				}}>
				{() => <List items={items} setItems={setItems} />}
			</Stack.Screen>
			<Stack.Screen name="Edit">
				{() => <Edit update={update} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
}
