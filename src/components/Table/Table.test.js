import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "./Table";

const elements = [
  { name: "A", lastName: "A", years: 10 },
  { name: "B", lastName: "B", years: 11 },
  { name: "C", lastName: "C", years: 12 },
  { name: "D", lastName: "D", years: 13 },
  { name: "E", lastName: "E", years: 14 },
];

const model = {
  columns: [
    {
      title: "Name",
      html: (e) => (
        <span>
          {e.name} {e.lastName}
        </span>
      ),
    },
    {
      title: "name",
      html: (e) => <span>{e.name}</span>,
    },
    {
      title: "Lastname",
      html: (e) => <span>{e.lastName}</span>,
    },
    {
      title: "years",
      html: (e) => <span>{e.years}</span>,
    },
  ],
};

test("renders the table component", () => {
  render(<Table elements={elements} model={model} />);
  expect(screen.getByTestId("genericTable")).toBeInTheDocument();
});
