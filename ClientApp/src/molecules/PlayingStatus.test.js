import React from "react";
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PlayingStatus from "./PlayingStatus";

Enzyme.configure({ adapter: new Adapter() })

it('ProfileCard component renders correctly', async () => {
  shallow(<PlayingStatus setAuthenticated={() => {}} />)
})

it('renders loading message when loading is true', () => {
  const wrapper =  shallow(<PlayingStatus loading={true} setAuthenticated={() => {}} />)
  expect(wrapper.text()).toContain('LOADING')
});

it('renders progress bar when loading is false', () => {
    const wrapper =  shallow(<PlayingStatus loading={false} setAuthenticated={() => {}} />)
    expect(wrapper.find('.playing-status__progress-bar')).toHaveLength(1);
});
  

it('renders play status when isPlaying is true', () => {
  const wrapper =  shallow(<PlayingStatus isPlaying={true} setAuthenticated={() => {}} />)
  expect(wrapper.find('.playing-status__status--item')).toHaveLength(1);
});

it('renders play status text when isPlaying is true', () => {
    const wrapper =  shallow(<PlayingStatus isPlaying={true} setAuthenticated={() => {}} />)
    expect(wrapper.find('.playing-status__status--item').text()).toContain('Playing');
  });

it('renders pause status when isPlaying is false', () => {
  const wrapper =  shallow(<PlayingStatus isPlaying={false}  setAuthenticated={() => {}}/>)
  expect(wrapper.find('.playing-status__status--item')).toHaveLength(1)
});

it('renders pause status text when isPlaying is false', () => {
    const wrapper =  shallow(<PlayingStatus isPlaying={false}  setAuthenticated={() => {}}/>)
    expect(wrapper.find('.playing-status__status--item').text()).toContain('Paused')
});

it('renders progress bar with correct value', () => {
    const progress = { percentage: 50 };
    const wrapper = shallow(<PlayingStatus loading={false} progress={progress} setAuthenticated={() => {}} />);
    expect(wrapper.find('.playing-status__progress-bar').props().value).toEqual(50);
});
  
it('does not render progress bar when loading is true', () => {
    const wrapper = shallow(<PlayingStatus loading={true} setAuthenticated={() => {}} />);
    expect(wrapper.find('.playing-status__progress-bar')).toHaveLength(0);
});
  
it('does not render play status when loading is true', () => {
    const wrapper = shallow(<PlayingStatus loading={true} isPlaying={true} setAuthenticated={() => {}} />);
    expect(wrapper.find('.playing-status__status--item')).toHaveLength(0);
});