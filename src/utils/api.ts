export interface Pokemon {
  id: number;
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
  }[];
  species: {
    url: string
  }
}

export interface Species {
  flavor_text_entries: {
    flavor_text: string;
  }
}

export interface AllPokemon {
  count: number;
  next: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  };
}
[];

export async function fetchFn(endpoint: string) {
  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log("error al realizar fetch - ", error.message);
  }
}

export async function getAllPokemon({ pageParam }: { pageParam?: string }) {
  const res = await fetch(
    pageParam ? pageParam : "https://pokeapi.co/api/v2/pokemon"
  );

  if (!res.ok) {
    console.log("Falla al obtener los pokemon", res);
  }

  const data = await res.json();
  return data;
}
