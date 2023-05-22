import React from "react";
import Header from "./Header";
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import config from "../config.json";

Enzyme.configure({ adapter: new Adapter() })

it('Header component renders correctly', async () => {
  shallow(<Header isAuthenticated={true} loginUrl={''} setAuthenticated={() => {}} />)
})

it('there is menu', async () => {
  const wrapper = shallow(<Header isAuthenticated={true} loginUrl={''} setAuthenticated={() => {}} />)
  const menu = wrapper.find('.side-menu-btn')
  expect(menu).toHaveLength(1)
});

it('there is title', async () => {
  const wrapper = shallow(<Header isAuthenticated={true} loginUrl={''} setAuthenticated={() => {}} />)
  const paragraph = wrapper.find('.app-title')
  expect(paragraph).toHaveLength(1)
});

it('title is equal to config', async () => {
  const title = config.AppTitle
  const wrapper = shallow(<Header isAuthenticated={true} loginUrl={''} setAuthenticated={() => {}} />)
  const paragraph = wrapper.find('.app-title')
  expect(paragraph.text()).toEqual(title)
});

it('renders side menu button', () => {
  const wrapper = shallow(<Header isAuthenticated={true} loginUrl={''} setAuthenticated={() => {}} />);
  const sideMenuButton = wrapper.find('.side-menu-btn');
  expect(sideMenuButton).toHaveLength(1);
});


it('renders profile button when isAuthenticated is true', () => {
  const wrapper = shallow(<Header isAuthenticated={true} loginUrl={''} setAuthenticated={() => {}} />);
  const profileButton = wrapper.find('.login-logout-btn');
  expect(profileButton).toHaveLength(1);
});

it('does not render profile button when isAuthenticated is false', () => {
  const wrapper = shallow(<Header isAuthenticated={false} loginUrl={''} setAuthenticated={() => {}} />);
  const profileButton = wrapper.find('.login-logout-btn');
  expect(profileButton).toHaveLength(0);
});

it('redirects to the profile page when the profile button is clicked', () => {
  const wrapper = shallow(<Header isAuthenticated={true} loginUrl={''} setAuthenticated={() => {}} />);
  const profileButton = wrapper.find('.login-logout-btn');
  profileButton.simulate('click');
  const link = wrapper.find('Link[to="/profile"]');
  expect(link).toHaveLength(1);
});
