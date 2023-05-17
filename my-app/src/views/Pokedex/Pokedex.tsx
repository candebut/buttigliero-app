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
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  console.log("selectedPokemon: ", selectedPokemon);

  type MyElement = {
    name: string;
    url: string;
  };

  const elements: MyElement[] = pokemons;

  const model: TableModel<MyElement> = {
    columns: [
      {
        title: "Name",
        html: (e: any) => (
          <span onClick={() => setSelectedPokemon(e)}>{e.name}</span>
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

  const onGetPokemonsData = async (url: string) => {
    try {
      let poke = await getPokemonList(url);
      console.log("poke: ", poke);
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
            <Table model={model} elements={elements}></Table>
            {/* <Table headers={["name", "id"]} data={pokemons}></Table> */}
            {/* when clicking in element, setSelectedPokemon 
            setLoading to true until the pokemon info is loaded
            */}
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
