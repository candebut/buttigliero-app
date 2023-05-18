import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Pokedex from "./Pokedex";

test("renders the elements", () => {
  render(<Pokedex />);
  expect(screen.getByTestId("pokedex-component")).toBeInTheDocument();
});

test("renders the async loader", async () => {
  render(<Pokedex />);
  expect(screen.getByTestId("loader")).toBeInTheDocument();
});
