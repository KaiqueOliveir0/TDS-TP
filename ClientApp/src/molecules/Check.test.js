import React from "react";
import Check from "./Check";
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

it('Check component renders correctly', async () => {
    mount(<Check />)
})

it('renders checking state', () => {
    const wrapper = shallow(<Check />);
    wrapper.setState({ checking: true });
    expect(wrapper.find(CircularProgress)).toHaveLength(1);
});

it('triggers close error card function', () => {
    const wrapper = shallow(<Check />);
    wrapper.setState({ error: true });
    wrapper.find(IconButton).simulate('click');
    expect(wrapper.state().error).toEqual(false);
});

it('renders error card', () => {
    const wrapper = shallow(<Check />);
    wrapper.setState({ error: true, message: 'You did not grant permissions to your account.' });
    expect(wrapper.find('.error-card')).toHaveLength(1);
 });

it('error card has icon', () => {
    const wrapper = shallow(<Check />);
    wrapper.setState({ error: true, message: 'You did not grant permissions to your account.' });
    expect(wrapper.find(Icon)).toHaveLength(1);
});

it('error card displays message', () => {
    const wrapper = shallow(<Check />);
    wrapper.setState({ error: true, message: 'You did not grant permissions to your account.' });
    expect(wrapper.find(Typography).text()).toContain('You did not grant permissions to your account.');
});
  
it('renders login button', () => {
    const wrapper = shallow(<Check />);
    expect(wrapper.find('.login-button')).toHaveLength(1);
});

it('login button displays text', () => {
    const wrapper = shallow(<Check />);
    expect(wrapper.find('.login-button').text()).toContain('Login with Spotify');
});

it('login button displays icon', () => {
    const wrapper = shallow(<Check />);
    expect(wrapper.find(Icon)).toHaveLength(1);
});

it('displays Privacy Notice warning', () => {
    const wrapper = shallow(<Check />);
    expect(wrapper.find(Typography).text()).toContain('By logging in, you agree with config.AppTitle\'s Privacy Notice.');
});



    
    