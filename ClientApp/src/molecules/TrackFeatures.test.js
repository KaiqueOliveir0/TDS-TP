import React from "react";
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { TrackFeatures } from "./TrackFeatures";


Enzyme.configure({ adapter: new Adapter() });

it('TrackFeatures component renders correctly', () => {
  shallow(<TrackFeatures />);
});

it('should render the TrackFeatures component with no props', async () => {
    const wrapper = shallow(<TrackFeatures />);
    expect(wrapper.find('.track-features--gauges')).toHaveLength(0);
});

it('should render the TrackFeatures component with a demo prop', async () => {
    const wrapper = shallow(<TrackFeatures demo />);
    expect(wrapper.find('.track-features--gauges')).toHaveLength(1);
});

it('should render the TrackFeatures component with a features prop', async () => {
    const wrapper = shallow(<TrackFeatures features={[{ label: 'Acousticness', value: 0.5, color: 'red' }]} />);
    expect(wrapper).toHaveLength(1);
});

it('should render the TrackFeatures component with  an empty features prop, and a valid tempo prop', async () => {
    const wrapper = shallow(<TrackFeatures features={[]} tempo={120} />);
    expect(wrapper).toHaveLength(1);
});

it('should render the TrackFeatures component with features prop, and an empty tempo prop', async () => {
    const wrapper = shallow(<TrackFeatures features={[{ label: 'Acousticness', value: 0.5, color: 'red' }]} tempo={null} />);
    expect(wrapper).toHaveLength(1);
});