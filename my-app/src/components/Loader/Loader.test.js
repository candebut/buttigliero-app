import Loader from "./Loader";
import { shallow } from "enzyme";

describe("Loader should render", () => {
  it("should render correctly with children", () => {
    const component = shallow(<Loader>Test message for loading</Loader>);
    expect(component).toMatchSnapshot();
  });
});
