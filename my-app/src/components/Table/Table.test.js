import Table from "./Table";
import { shallow } from "enzyme";

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

describe("Table rendering with props", () => {
  it("should render correctly with the data", () => {
    const component = shallow(<Table elements={elements} model={model} />);
    expect(component).toMatchSnapshot();
  });
});
