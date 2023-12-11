import {
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@tanstack/react-query/";
import { fetchFn, fetchPokemon } from "../utils/api";
import { useNavigation } from "@react-navigation/native";
import { Pokemon } from "../utils/api";
import { MainStackScreenProps } from "../navigators/types";
import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  Pressable,
  Center,
  AspectRatio,
  Spinner,
  Stack,
  Skeleton,
} from "native-base";
import { formatNumber, getColorType } from "../utils/helper";

interface PokemonCardProps {
  url: string;
  name: string;
}

export function PokemonCard({ url, name }: PokemonCardProps) {

  const { isLoading, error, data } = useQuery<Pokemon>({
    queryKey: ["pokemon", name],
    queryFn: () => fetchPokemon(name),
  });

  const navigation =
    useNavigation<MainStackScreenProps<"Home">["navigation"]>();

  if (!data || error) {
    if (error) console.log(error.message);
    return null;
  }

  if (isLoading) return (
    <Stack
      flex={1}
      space={2}
      borderRadius={10}
      m='1.5'
      p='4'>
      <Skeleton h='30' />
      <Skeleton.Text px='4' />
    </Stack>
  );

  if (!data || error) return null;

  return (
    <Pressable
      onPress={() => navigation.navigate("Detail", { name })}
      flex={1}
      m="1.5"
      p="4"
      // backgroundColor="#7e909a"
      backgroundColor={getColorType(data.types[0].type.name) + '.500'}
      borderRadius={10}
    >
      <Center>
        <AspectRatio ratio={1} width="80%">
          <Image
            source={{
              uri: data.sprites.other["official-artwork"].front_default,
            }}
            alt="image"
          />
        </AspectRatio>
      </Center>
      <HStack justifyContent="space-between" mb={2}>
        <Heading textTransform="capitalize" color="white" size="small">
          {data.name}
        </Heading>
        <Text color="white">#{formatNumber(data.id)}</Text>
      </HStack>
      <HStack>
        {data.types.map((type) => (
          <Box
            key={type.type.name}
            px={2}
            mr={1}
            // backgroundColor="#dbae58"
            backgroundColor={getColorType(type.type.name) + '.400'}
            borderRadius={10}
            _text={{ color: "white", fontSize: "xs" }}
          >
            {type.type.name}
          </Box>
        ))}
      </HStack>
    </Pressable>
  );
}
