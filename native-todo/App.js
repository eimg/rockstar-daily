import { useState } from "react";
import { View, Text } from "react-native";

export default function App() {
	const [items, setItems] = useState([
		{ id: 1, subject: "Egg", done: false },
		{ id: 2, subject: "Apple", done: true },
		{ id: 3, subject: "Bread", done: false },
	]);

	return (
		<View style={{ padding: 20, width: 500 }}>
			{items.map(item => {
				return (
					<View style={{ borderBottomWidth: 1, padding: 10 }}>
						<Text>{item.subject}</Text>
					</View>
				)
			})}
		</View>
	)
}
