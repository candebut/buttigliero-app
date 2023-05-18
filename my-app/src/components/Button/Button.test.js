import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

test("renders the button", () => {
  render(<Button />);
  expect(screen.getByTestId("button-component")).toBeInTheDocument();
});
