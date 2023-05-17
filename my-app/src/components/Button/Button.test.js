
import Button from './Button';
import { shallow, mount } from 'enzyme';

describe('Button: snapshot tests', () => {
    it('should render correctly in primary variant', () => {
        const component = shallow(<Button variant="primary">Test</Button>);
        expect(component).toMatchSnapshot();
    });

    it('should render correctly in secundary variant', () => {
        const component = shallow(<Button variant="secundary">Test</Button>);
        expect(component).toMatchSnapshot();
    });

});

describe('Button: callbacks', () => {
    it('Test onClick event', () => {
        const mockCallBack = jest.fn();

        const button = mount(<Button onClick={mockCallBack}>Click me!</Button>);
        button.find('button').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
});
