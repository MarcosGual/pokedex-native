import {
  View,
  // Image,
  // Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query/";
import { fetchFn } from "../utils/api";
import { useNavigation } from "@react-navigation/native";
import { Pokemon } from "../utils/api";
import { MainStackScreenProps } from "../navigators/types";
import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  Stack,
  Pressable,
  Center,
  AspectRatio,
} from "native-base";

interface PokemonCardProps {
  url: string;
  name: string;
}

// export function PokemonCard({ url, name }: PokemonCardProps) {
//   const [pokemon, setPokemon] = useState<Pokemon>();

//   const getPokemon = async () => {
//     try {
//       const res = await fetch(url);
//       const data = await res.json();

//       setPokemon(data);
//     } catch (error: any) {
//       console.log("Error al obtener datos del pokemon - ", error.message);
//     }
//   };

//   useEffect(() => {
//     getPokemon();
//   }, []);

//   if (!pokemon) return null;
//   return (
//     <View style={styles.container}>
//       <Image
//         source={{
//           uri: pokemon.sprites.other["official-artwork"].front_default,
//         }}
//         style={styles.image}
//       />
//       <Text style={styles.name}>{pokemon.name}</Text>
//     </View>
//   );
// }

export function PokemonCard({ url, name }: PokemonCardProps) {
  const getPokemon = async () => {
    try {
      //   const res = await fetch(url);
      //   const data = await res.json();
      //   return data;
      //   return fetchFn(url); //nueva función fetch desde utils
    } catch (error: any) {
      console.log("Error al obtener datos del pokemon - ", error.message);
    }
  };

  // const [pokemon, setPokemon] = useState<Pokemon>();
  const { isLoading, error, data } = useQuery<Pokemon>({
    queryKey: ["pokemon", name],
    queryFn: () => fetchFn(url),
  });

  const navigation =
    useNavigation<MainStackScreenProps<"Home">["navigation"]>();

  if (!data || error) {
    if (error) console.log(error.message);
    return null;
  }

  if (isLoading) return <ActivityIndicator />;

  return (
    <Pressable
      // style={styles.container}
      onPress={() => navigation.navigate("Detail", { name })}
      flex={1}
      m="1.5"
      p="4"
      backgroundColor="#7e909a"
      borderRadius={10}
    >
      <Center>
        <AspectRatio ratio={1} width="80%">
          <Image
            source={{
              uri: data.sprites.other["official-artwork"].front_default,
            }}
            alt="image"
            // style={styles.image}
          />
        </AspectRatio>
      </Center>
      <HStack justifyContent="space-between" mb={2}>
        <Heading textTransform="capitalize" color="white" size="small">
          {data.name}
        </Heading>
        <Text color="white">#{data.order}</Text>
      </HStack>
      <HStack>
        {data.types.map((type) => (
          <Box
            key={type.type.name}
            px={2}
            mr={1}
            backgroundColor="#dbae58"
            borderRadius={10}
            _text={{ color: "white", fontSize: "xs" }}
          >
            {type.type.name}
          </Box>
        ))}
      </HStack>
      {/* <Text style={styles.name}> */}
      {/* <Text>{data.name}</Text> */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 32,
  },
  name: {
    fontWeight: "bold",
    fontSize: 32,
  },
});
