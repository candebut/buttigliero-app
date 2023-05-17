export const getPokemonList = async (url: string) =>
  await fetch(`${url}`).then((res) => res.json());

export const getPokemonDescription = async (url: string) =>
  await fetch(`${url}`).then((res) => res.json());

// return pokemon.flavor_text_entries[0].flavor_text.replace(/[\n\f]/g, " ");
