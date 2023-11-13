import { View, Image, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query/";
import { fetchFn } from "../utils/api";
// import {
//   Box,
//   Heading,
//   Image,
//   Text,
//   HStack,
//   Stack,
//   Pressable,
//   Center,
// } from "native-base";

interface PokemonCardProps {
  url: string;
  name: string;
}

interface Pokemon {
  name: string;
  order: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
    };
  };
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

  if (!data || error) {
    if (error) console.log(error.message);
    return null;
  }

  if (isLoading) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: data.sprites.other["official-artwork"].front_default,
        }}
        style={styles.image}
      />
      <Text style={styles.name}>{data.name}</Text>
    </View>
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
