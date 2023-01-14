import { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";

import { NavigationContainer, useNavigation, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function NavigatedApp() {
	return (
		<NavigationContainer>
			<App />
		</NavigationContainer>
	);
}

function List({ items, setItems }) {
	const navigation = useNavigation();
	const [input, setInput] = useState("");

	return (
		<View style={{ padding: 20, width: 500 }}>
			<TextInput onChangeText={setInput} value={input} />
			<Button
				title="Add"
				onPress={() => {
					setItems([
						{ id: items.length + 1, subject: input, done: false },
						...items,
					]);

					setInput("");
				}}
			/>

			{items
				.filter(item => !item.done)
				.map(item => {
					return (
						<View
							key={item.id}
							style={{
								borderBottomWidth: 1,
								padding: 10,
								flexDirection: "row",
								alignItems: "center",
							}}>
							<Button
								title="Del"
								onPress={() => {
									setItems(
										items.filter(i => i.id !== item.id),
									);
								}}
							/>

							<Button
								title="Done"
								onPress={() => {
									setItems(
										items.map(i => {
											if(i.id === item.id) i.done = true;
											return i;
										})
									);
								}}
							/>

							<Button title="Edit" onPress={() => {
								navigation.navigate("Edit", {
									subject: item.subject,
									id: item.id,
								})
							}} />

							<Text style={{ marginLeft: 20 }}>
								{item.subject}
							</Text>
						</View>
					);
				})}

			<View style={{ paddingTop: 20, marginTop: 20, borderTopWidth: 2 }}>
				{items
					.filter(item => item.done)
					.map(item => {
						return (
							<View
								key={item.id}
								style={{
									borderBottomWidth: 1,
									padding: 10,
									flexDirection: "row",
									alignItems: "center",
								}}>
								<Button
									title="Del"
									onPress={() => {
										setItems(
											items.filter(i => i.id !== item.id),
										);
									}}
								/>

								<Button
									title="Undo"
									onPress={() => {
										setItems(
											items.map(i => {
												if (i.id === item.id)
													i.done = false;
												return i;
											}),
										);
									}}
								/>

								<Text style={{ marginLeft: 20 }}>
									{item.subject}
								</Text>
							</View>
						);
					})}
			</View>
		</View>
	);
}

function Edit({ update }) {
	const route = useRoute();
	const navigation = useNavigation();

	const { subject, id } = route.params;
	const [ input, setInput ] = useState(subject);

	return (
		<View style={{ padding: 20, width: 500 }}>
			<TextInput value={input} onChangeText={setInput} defaultValue={subject} />
			<Button title="Update" onPress={() => {
				update(id, input);
				navigation.navigate("List");
			}} />
		</View>
	);
}

function App() {
	const [items, setItems] = useState([
		{ id: 1, subject: "Egg", done: false },
		{ id: 2, subject: "Apple", done: true },
		{ id: 3, subject: "Bread", done: false },
	]);

	const update = (id, subject) => {
		setItems(items.map(item => {
			if(item.id === id) item.subject = subject;
			return item;
		}));
	}

	return (
		<Stack.Navigator>
			<Stack.Screen name="List">
				{() => <List items={items} setItems={setItems} />}
			</Stack.Screen>
			<Stack.Screen name="Edit">
				{ () => <Edit update={update} /> }
			</Stack.Screen>
		</Stack.Navigator>
	);
}
