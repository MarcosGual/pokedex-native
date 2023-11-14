import { useEffect, useState } from "react";
import { Center, Spinner, FlatList } from "native-base";
import { PokemonCard } from "../components/PokemonCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AllPokemon, getAllPokemon } from "../utils/api";

interface Pokemon {
  name: string;
  url: string;
}

export default function Home() {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<AllPokemon>({
      queryKey: ["pokemons"],
      queryFn: getAllPokemon,
      getNextPageParam: (lastPage: any) => lastPage.next,
    });

  const loadMore=()=>{
    if(hasNextPage){
      fetchNextPage();
    }
  }

  if (isLoading)
    return (
      <Center flex={1}>
        <Spinner size="lg" color="black" />
      </Center>
    );

  if (!data) return null;

  return (
    <FlatList
      data={data.pages.flatMap((page) => page.results)}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => <PokemonCard url={item.url} name={item.name} />}
      onEndReached={loadMore}
      numColumns={2}
      contentInsetAdjustmentBehavior="automatic"
      ListFooterComponent={() =>
        isLoading ? <Spinner mt="4" size="lg" color="black" /> : null
      }
      _contentContainerStyle={{ p: 2, bg: "white" }}
    />
  );
}
