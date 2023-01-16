import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Input, useTheme } from "@rneui/themed";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useNavigation, useRoute } from "@react-navigation/native";

export default function Edit({ update }) {
	const route = useRoute();
	const navigation = useNavigation();
	const { theme } = useTheme();

	const { subject, id } = route.params;
	const [input, setInput] = useState(subject);

	return (
		<View style={{ padding: 20 }}>
			<Input
				style={{ outlineWidth: 0 }}
				value={input}
				onChangeText={setInput}
				defaultValue={subject}
				rightIcon={
					<TouchableOpacity
						onPress={() => {
							update(id, input);
							navigation.navigate("List");
						}}>
						<Ionicons
							name="save"
							size={24}
							color={theme.colors.success}
						/>
					</TouchableOpacity>
				}
			/>
		</View>
	);
}
