// describe('Button: callbacks', () => {
//     it('Test onClick event', () => {
//         const mockCallBack = jest.fn();

//         const button = mount(<Button onClick={mockCallBack}>Click me!</Button>);
//         button.find('button').simulate('click');
//         expect(mockCallBack.mock.calls.length).toEqual(1);
//     });
// });

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

test("renders the button", async () => {
  render(<Button />);
  expect(screen.getByTestId("button-component")).toBeInTheDocument();
});
