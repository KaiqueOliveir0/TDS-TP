import React from "react";
import Header from "./Header";
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import config from "../config.json";

Enzyme.configure({ adapter: new Adapter() })

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
