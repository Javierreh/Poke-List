export interface Pokemon {
  id: number;
  name: string;
  weight: number;
  type1: string;
  type2: string;
  sprite: string;
}

export interface PokemonFilter {
  name: string;
  weight: number;
  type: string;
}
