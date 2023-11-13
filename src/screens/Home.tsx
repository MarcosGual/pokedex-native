import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PokemonCard } from "../components/PokemonCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AllPokemon, getAllPokemon } from "../utils/api";

interface Pokemon {
  name: string;
  url: string;
}

export default function Home() {
  // const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
  //   useInfiniteQuery<AllPokemon>({
  //     queryKey: ["pokemons"],
  //     queryFn: getAllPokemon,
  //     getNextPageParam: (lastPage: any) => lastPage.next,
  //   });
  // console.log(data);
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [next, setNext] = useState<string>();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const getPokemon = async () => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await res.json();
      // console.log(data.results);
      if (data) {
        setPokemon(data.results);
        // console.log(data.next)
        setNext(data.next);
      } else {
        console.log("Datos no encontrados.");
      }
    } catch (error: any) {
      console.log("Error al conectar a la api de pokemon - " + error.message);
    }
  };

  const loadMore = async () => {
    if (isLoadingMore) return;

    if (next) {
      setIsLoadingMore(true);
      const res = await fetch(next);
      const data = await res.json();

      // console.log(data.results);
      setPokemon((prevPokemon) => [...prevPokemon, ...data.results]);
      setNext(data.next);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);

  if (isLoadingMore) return <ActivityIndicator />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={pokemon}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PokemonCard url={item.url} name={item.name} />
        )}
        onEndReached={loadMore}
        ListFooterComponent={() =>
          isLoadingMore ? <ActivityIndicator /> : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
