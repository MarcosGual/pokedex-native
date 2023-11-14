import { View, Text } from "native-base";
import { MainStackScreenProps } from "../navigators/types";

export default function Detail({ route }: MainStackScreenProps<"Detail">) {
  const { name } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30 }}>{name}</Text>
    </View>
  );
}
