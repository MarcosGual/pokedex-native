export interface Pokemon {
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
  try {
    const res = await fetch(pageParam || "https://pokeapi.co/api/v2/pokemon");
    return res.json();
  } catch (error: any) {
    console.log("Error al obtener datos del pokemon - ", error.message);
  }
}
