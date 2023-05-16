import React, { useState, useEffect } from "react";
import { constants } from "../../constants/constants";
import { getPokemonList, getPokemonDescription } from "./pokedexService";

const { PREVIOUS, NEXT, INITIAL_URL } = constants;

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [url, setURL] = useState({
    next: "",
    previous: "",
  });
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

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

  const onGetPokemonsData = async (url: string) => {
    try {
      let poke = await getPokemonList(url);
      console.log("poke: ", poke);
      setPokemons(poke);
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

  return (
    <div className="pokedex__wrapper">
      {initialLoading ? (
        "Loading..."
      ) : (
        <>
          {loading ? (
            "Loading pokemon..."
          ) : selectedPokemon ? (
            <div className="poke__card">
              <div className="poke__photo"></div>
              <div className="poke__data"></div>
            </div>
          ) : null}

          <div className="poke__table">
            {/* when clicking in element, setSelectedPokemon 
            setLoading to true until the pokemon info is loaded
            */}
          </div>
          <div className="poke__buttons">
            <button onClick={(e: any) => handleClick(PREVIOUS)}>
              {PREVIOUS}
            </button>
            <button onClick={(e: any) => handleClick(NEXT)}>{NEXT}</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Pokedex;
