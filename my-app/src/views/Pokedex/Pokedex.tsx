import React, { useState, useEffect } from "react";
import { constants } from "../../constants/constants";
import { getPokemonList, getPokemonDescription } from "./pokedexService";
import { Button, Table } from "../../components";
import { TableModel } from "../../components/Table/Table";

const { PREVIOUS, NEXT, INITIAL_URL } = constants;

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [url, setURL] = useState({
    next: "",
    previous: "",
  });
  //const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);
  const [pokemonData, setPokemonData] = useState<
    Array<{
      name: string;
      id: number;
      abilities: PokemonAbilities[];
      height: number;
      species: {
        name: string;
      };
      sprites: {
        front_default: string;
      };
      type: PokemonTypes[];
    }>
  >([]);

  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState({ name: "", url: "" });

  type PokemonsTable = {
    name: string;
    url: string;
  };

  type PokemonAbilities = {
    ability: {
      name: string;
    };
  };

  type PokemonTypes = {
    type: {
      name: string;
      url: string;
    };
  };

  type PokemonData = {
    name: string;
    id: number;
    abilities: PokemonAbilities[];
    height: number;
    species: {
      name: string;
    };
    sprites: {
      front_default: string;
    };
    type: PokemonTypes[];
  };

  const elements: PokemonsTable[] = pokemons;
  // const pokemonDataElements: PokemonData[] = [ pokemonData ];
  //const pokemonDataElements: PokemonData[] = pokemonData;

  const model: TableModel<PokemonsTable> = {
    columns: [
      {
        title: "Name",
        html: (e: any) => (
          <span onClick={() => setSelectedPokemon(e)}>{e.name}</span>
        ),
      },
      // <img src="1.jpg"></img>,
    ],
  };

  const pokemonModel: TableModel<PokemonData> = {
    columns: [
      {
        title: "Name",
        html: (e: any) => <span>{e.name}</span>,
      },
      {
        title: "Abilities",
        html: (e: any) => (
          <span>{e.abilities.map((ability: any) => ability.ability.name)}</span>
        ),
      },
      {
        title: "Height",
        html: (e: any) => <span>{e.height}</span>,
      },
      {
        title: "Specie",
        html: (e: any) => <span>{e.species.name}</span>,
      },
      {
        title: "Type",
        html: (e: any) => (
          <span>{e.types.map((type: any) => type.type.name)}</span>
        ),
      },
    ],
  };

  const handleClick = (type: string) => {
    switch (type) {
      case PREVIOUS:
        return onGetPokemonsData(url.previous);
      case NEXT:
        return onGetPokemonsData(url.next);
    }
  };

  useEffect(() => {
    onGetPokemonsData(INITIAL_URL);
  }, []);

  useEffect(() => {
    if (selectedPokemon?.url) onGetPokemonDescription(selectedPokemon?.url);
  }, [selectedPokemon]);

  const onGetPokemonsData = async (url: string) => {
    try {
      let poke = await getPokemonList(url);
      setPokemons(poke.results);
      setURL({
        next: poke.next,
        previous: poke.previous,
      });
      setCount(poke.count);
    } catch (e) {
      console.log("could not fetch the data");
    } finally {
      setInitialLoading(false);
      setLoading(false);
    }
  };

  const onGetPokemonDescription = async (url: string) => {
    try {
      let pokeData = await getPokemonDescription(url);
      setPokemonData((current) => [pokeData, ...current]);
    } catch (e) {
      console.log("could not fetch the pokemon description");
    }
  };

  return (
    <div className="pokedex__wrapper">
      {initialLoading ? (
        "Loading..."
      ) : (
        <>
          {loading ? (
            "Loading pokemon..."
          ) : pokemonData ? (
            <div className="poke__card">
              <Table model={pokemonModel} elements={pokemonData} />
              {/* <p>{selectedPokemon.name}</p>
              <div className="poke__photo"></div>
              <div className="poke__data">
                {pokemonData?.abilities.map((ability, index) => {
                  console.log("ability: ", ability);
                  return <p key={`ability-${index}`}>{ability.ability.name}</p>;
                })}
              </div> */}
            </div>
          ) : null}

          <div className="poke__table">
            <Table model={model} elements={elements}></Table>
          </div>
          <div className="poke__buttons">
            <Button
              variant="primary"
              onClick={(e: any) => handleClick(PREVIOUS)}
              label={PREVIOUS}
            />

            <Button
              variant="secundary"
              onClick={(e: any) => handleClick(NEXT)}
              label={NEXT}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Pokedex;
