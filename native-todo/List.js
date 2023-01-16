import { useState } from "react";
import { View, TouchableOpacity } from "react-native";

import { Input, useTheme } from "@rneui/themed";

import Ionicons from "@expo/vector-icons/Ionicons";

import Items from "./Items";

export default function List({ items, setItems }) {
	const [input, setInput] = useState("");
	const { theme } = useTheme();

	return (
		<View style={{ padding: 20 }}>
			<View
				style={{
					flexDirection: "row",
					paddingVertical: 10,
					marginBottom: 20,
				}}>
				<Input
					onChangeText={setInput}
					value={input}
					style={{ outlineWidth: 0 }}
					rightIcon={<TouchableOpacity
					onPress={() => {
						setItems([
							{
								id: items.length + 1,
								subject: input,
								done: false,
							},
							...items,
						]);

						setInput("");
					}}>
					<Ionicons name="add" size={24} color={theme.colors.success} />
				</TouchableOpacity>}
				/>

			</View>

			<Items
				items={items.filter(item => !item.done)}
				setItems={setItems}
			/>

			<View style={{ marginTop: 20 }}>
				<Items
					items={items.filter(item => item.done)}
					setItems={setItems}
				/>
			</View>
		</View>
	);
}
