import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query/build/legacy/useQuery";
import {Box, Heading, Image, Text, HStack, Stack, Pressable, Center} from "native-base"

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

export function PokemonCard({ url, name }: PokemonCardProps) {
  const [pokemon, setPokemon] = useState<Pokemon>();
  //   const {isLoading, error, data} = useQuery(['pokemon', name], ()=>fetch);

  const getPokemon = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      setPokemon(data);
    } catch (error: any) {
      console.log("Error al obtener datos del pokemon - ", error.message);
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);

  if (!pokemon) return null;
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: pokemon.sprites.other["official-artwork"].front_default,
        }}
        style={styles.image}
      />
      <Text style={styles.name}>{pokemon.name}</Text>
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