import { useEffect, useState } from "react";
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

const api = "http://localhost:8000";

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

	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		(async () => {
			const res = await fetch(`${api}/tasks`);
			const tasks = await res.json();

			setItems(tasks);
			setIsLoading(false);
		})();
	}, []);

	const toggleDone = id => {
		setItems(
			items.map(item => {
				if (item.id === id) item.done = !item.done;
				return item;
			}),
		);
	};

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
				{() => {
					return isLoading ? (
						<View>
							<Text>Loading...</Text>
						</View>
					) : (
						<View>
							<List
								items={items}
								setItems={setItems}
								toggleDone={toggleDone}
							/>
							<View
								style={{
									margin: 30,
									flexDirection: "row",
									justifyContent: "flex-end",
								}}>
								{items.filter(item => !item.done).length && (
									<Button
										color="secondary"
										type="clear"
										style={{ marginRight: 20 }}
										titleStyle={{
											color: theme.colors.success,
										}}
										onPress={() => {
											setItems(
												items.map(item => {
													item.done = true;
													return item;
												}),
											);
										}}>
										<Ionicons
											name="checkmark-done"
											color={theme.colors.success}
											size={24}
											style={{ marginRight: 10 }}
										/>
										Mark all done
									</Button>
								)}

								{items.filter(item => item.done).length && (
									<Button
										type="outline"
										buttonStyle={{
											borderColor: theme.colors.error,
										}}
										titleStyle={{
											color: theme.colors.error,
										}}
										onPress={() => {
											setItems(
												items.filter(
													item => !item.done,
												),
											);
										}}>
										<Ionicons
											name="trash-bin"
											color={theme.colors.error}
											size={24}
											style={{ marginRight: 10 }}
										/>
										Clear
									</Button>
								)}
							</View>
						</View>
					);
				}}
			</Stack.Screen>
			<Stack.Screen name="Edit">
				{() => <Edit update={update} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
}
