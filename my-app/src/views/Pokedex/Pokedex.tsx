import React, { useState, useEffect } from "react";
import { constants } from "../../constants/constants";

const { PREVIOUS, NEXT } = constants;

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [cursor, setCursor] = useState({
    next: undefined,
    prev: undefined,
  });
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleClick = (type) => {
    switch (type) {
      case type === PREVIOUS:
        return onGetPokemonsData(cursor.previous);
      case type === NEXT:
        return onGetPokemonsData(cursor.next);
    }
  };

  useEffect(() => {
    onGetPokemonsData(undefined, false);
  }, []);

  const getPokemonsData = (cursor) => {
    //need:
    //count, previous, next, results --> cursor stores the link to previous and next
    return fetch(`https://pokeapi.co/api/v2/${cursor}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json, text/*",
      },
    }).then((response) => response.json());
  };

  const onGetPokemonsData = async (cursor, refresh) => {
    try {
      let poke = await getPokemonsData(cursor);
      if (refresh) {
        setPokemons(poke.data);
      } else {
        setPokemons((oldArray) => [...oldArray, ...poke.data]);
      }
      setCursor({
        next: poke.next,
        prev: poke.previous,
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
            <button onClick={handleClick(PREVIOUS)}>{PREVIOUS}</button>
            <button onClick={handleClick(NEXT)}>{NEXT}</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Pokedex;
