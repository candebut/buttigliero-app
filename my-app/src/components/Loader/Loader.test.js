import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loader from "./Loader";

test("renders the loader component", () => {
  render(<Loader />);
  expect(screen.getByTestId("loader")).toBeInTheDocument();
});
