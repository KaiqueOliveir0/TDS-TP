import React from "react";
import Footer from "./Footer";
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() })

it('Footer component renders correctly', async () => {
    shallow(<Footer setAuthenticated={() => {}} />)
})

it('renders current year and app title', () => {
  const wrapper = shallow(<Footer />);
  const currentYear = new Date().getFullYear();
  const appTitle = require('./../config.json').AppTitle;
  
  expect(wrapper.find(Typography).at(0).text()).toContain(`© ${currentYear} ${appTitle}`);
});
  
it('renders privacy notice link', () => {
  const wrapper = shallow(<Footer />);
  const privacyLink = wrapper.find(Link).at(0);
  expect(privacyLink.prop('to')).toEqual('/privacy');
});

it('privacy notice link color is textPrimary', () => {
    const wrapper = shallow(<Footer />);
    const privacyLink = wrapper.find(Link).at(0);
    expect(privacyLink.find(Typography).prop('color')).toEqual('textPrimary');
});

it('privacy notice text renders', () => {
    const wrapper = shallow(<Footer />);
    const privacyLink = wrapper.find(Link).at(0);
    expect(privacyLink.find(Typography).text()).toEqual('Privacy Notice');
});
  
it('renders about link', () => {
  const wrapper = shallow(<Footer />);
  const aboutLink = wrapper.find(Link).at(1);
  expect(aboutLink.prop('to')).toEqual('/about');  
});

it('about link color is textPrimary', () => {
    const wrapper = shallow(<Footer />);
    const aboutLink = wrapper.find(Link).at(1);
    expect(aboutLink.find(Typography).prop('color')).toEqual('textPrimary');
});

it('about text renders', () => {
    const wrapper = shallow(<Footer />);
    const aboutLink = wrapper.find(Link).at(1);
    expect(aboutLink.find(Typography).text()).toEqual('About');
});