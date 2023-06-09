import { useState, useEffect } from "react";
import {
  CONSTANTS,
  FETCH_MESSAGES,
  POKEMON_LABELS,
} from "../../constants/constants";
import { getPokemonList, getPokemonDescription } from "./pokedexService";
import { Button, Table, Loader } from "../../components";
import { TableModel } from "../../components/Table/Table";
import "./pokedex.scss";

const { PREVIOUS, NEXT, INITIAL_URL, NAME, LOADING, IMAGE } = CONSTANTS;
const { ABILITIES, HEIGHT, SPECIE, TYPE } = POKEMON_LABELS;
const { GENERAL_MESSAGE } = FETCH_MESSAGES;

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [url, setURL] = useState({
    next: "",
    previous: "",
  });
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
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState({ name: "", url: "" });
  const [error, setError] = useState(false);

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
  const model: TableModel<PokemonsTable> = {
    columns: [
      {
        title: NAME,
        html: (e: any) => (
          <span onClick={() => setSelectedPokemon(e)}>{e.name}</span>
        ),
      },
    ],
  };

  const pokemonModel: TableModel<PokemonData> = {
    columns: [
      {
        title: NAME,
        html: (e: any) => <span>{e.name}</span>,
      },
      {
        title: ABILITIES,
        html: (e: any) => (
          <span>
            {e.abilities.map((ability: any) => ability.ability.name + " ")}
          </span>
        ),
      },
      {
        title: HEIGHT,
        html: (e: any) => <span>{e.height}</span>,
      },
      {
        title: SPECIE,
        html: (e: any) => <span>{e.species.name}</span>,
      },
      {
        title: TYPE,
        html: (e: any) => (
          <span>{e.types.map((type: any) => type.type.name + " ")}</span>
        ),
      },
      {
        title: IMAGE,
        html: (e: any) => (
          <span>{<img src={e.sprites.front_default} alt="MDN"></img>}</span>
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
    } catch (e) {
      setError(true);
    } finally {
      setInitialLoading(false);
    }
  };

  const onGetPokemonDescription = async (url: string) => {
    try {
      let pokeData = await getPokemonDescription(url);
      setPokemonData((current) => [pokeData, ...current]);
    } catch (e) {
      setError(true);
    }
  };

  return (
    <div className="pokedex__wrapper" data-testid="pokedex-component">
      {initialLoading ? (
        <Loader data-testid="loader" data-cy="loader">
          {LOADING}
        </Loader>
      ) : error ? (
        <p data-testid="error-message">{GENERAL_MESSAGE}</p>
      ) : (
        <>
          {pokemonData && selectedPokemon.name ? (
            <div className="poke__card" data-testid="pokemons-list">
              <Table model={pokemonModel} elements={pokemonData} />
            </div>
          ) : null}

          <div className="poke__table" data-testid="pokemon-list-table">
            <Table model={model} elements={elements}></Table>
          </div>
          <div className="poke__buttons" data-testid="pokemon-buttons">
            {url.previous && (
              <Button
                variant="secundary"
                onClick={() => handleClick(PREVIOUS)}
                label={PREVIOUS}
              />
            )}

            {url.next && (
              <Button
                variant="primary"
                onClick={() => handleClick(NEXT)}
                label={NEXT}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Pokedex;
