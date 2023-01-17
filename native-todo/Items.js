import { View, TouchableOpacity } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { ListItem, Text, useTheme } from "@rneui/themed";

import { useNavigation } from "@react-navigation/native";

export default function Items({ items, setItems, toggleDone }) {
	const navigation = useNavigation();
	const { theme } = useTheme();

	return items.map(item => {
		return (
			<View key={item.id}>
				<ListItem>
					<TouchableOpacity onPress={() => toggleDone(item.id)}>
						{item.done ? (
							<Ionicons
								name="checkbox-outline"
								size={24}
								color={theme.colors.success}
							/>
						) : (
							<Ionicons
								name="square-outline"
								size={24}
								color={theme.colors.grey3}
							/>
						)}
					</TouchableOpacity>

					<ListItem.Content>
						<Text
							style={{
								marginLeft: 20,
								flex: 1,
								color: item.done
									? theme.colors.grey4
									: theme.colors.black,
							}}>
							{item.subject}
						</Text>
					</ListItem.Content>

					<TouchableOpacity
						onPress={() => {
							navigation.navigate("Edit", {
								subject: item.subject,
								id: item.id,
							});
						}}>
						<Ionicons
							name="pencil"
							size={24}
							color={theme.colors.grey3}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							setItems(items.filter(i => i.id !== item.id));
						}}>
						<Ionicons
							name="trash"
							size={24}
							color={theme.colors.error}
						/>
					</TouchableOpacity>
				</ListItem>
			</View>
		);
	});
}
