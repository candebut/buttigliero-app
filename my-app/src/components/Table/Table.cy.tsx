import React from "react";
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
      html: (e: any) => (
        <span>
          {e.name} {e.lastName}
        </span>
      ),
    },
    {
      title: "name",
      html: (e: any) => <span>{e.name}</span>,
    },
    {
      title: "Lastname",
      html: (e: any) => <span>{e.lastName}</span>,
    },
    {
      title: "years",
      html: (e: any) => <span>{e.years}</span>,
    },
  ],
};

describe("<Table />", () => {
  it("renders", () => {
    cy.mount(<Table elements={elements} model={model} />);
  });
});
