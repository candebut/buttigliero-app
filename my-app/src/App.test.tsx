import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "./App";

test("renders the landing page", () => {
  render(<App />);
  expect(screen.getByTestId("pokedex-component")).toBeInTheDocument();
});
