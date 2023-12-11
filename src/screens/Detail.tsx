import { View, Text } from "native-base";
import { MainStackScreenProps } from "../navigators/types";
import { useQuery } from "@tanstack/react-query";
import { Pokemon, fetchFn } from "../utils/api";

export default function Detail({ route }: MainStackScreenProps<"Detail">) {
  const { name, url } = route.params;

  const { isLoading, error, data } = useQuery<Pokemon>({
    queryKey: ["pokemon", name],
    queryFn: () => fetchFn(url),
  });

  if(!data) return null;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 40 }}>{name}</Text>
    </View>
  );
}
