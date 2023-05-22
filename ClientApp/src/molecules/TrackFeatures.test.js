import React from "react";
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { TrackFeatures } from "./TrackFeatures";


Enzyme.configure({ adapter: new Adapter() });

it('TrackFeatures component renders correctly', () => {
  shallow(<TrackFeatures />);
});

it('render the TrackFeatures', async () => {
    const wrapper = shallow(<TrackFeatures />);
    expect(wrapper.find('.track-features')).toHaveLength(1);
});

it('TrackFeatures component with a demo prop', async () => {
    const wrapper = shallow(<TrackFeatures demo />);
    expect(wrapper.find('.track-features--gauges')).toHaveLength(1);
});

it('TrackFeatures component with no demo prop', async () => {
    const wrapper = shallow(<TrackFeatures />);
    expect(wrapper.find('.track-features--gauges')).toHaveLength(0);
});

it('TrackFeatures component with a features prop', async () => {
    const wrapper = shallow(<TrackFeatures features={[{ label: 'Acousticness', value: 0.5, color: 'red' }]} />);
    expect(wrapper).toHaveLength(1);
});

it('TrackFeatures component with null tempo prop', async () => {
    const wrapper = shallow(<TrackFeatures tempo={null} />);
    expect(wrapper.find('.track-features--gauges')).toHaveLength(0);
});

it('TrackFeatures component with negative tempo prop', async () => {
    const wrapper = shallow(<TrackFeatures tempo={-1} />);
    expect(wrapper.find('.track-features--gauges')).toHaveLength(0);
});

it('TrackFeatures component with  an empty features prop, and a valid tempo prop', async () => {
    const wrapper = shallow(<TrackFeatures features={[]} tempo={120} />);
    expect(wrapper).toHaveLength(1);
});

it('TrackFeatures component with features prop, and an empty tempo prop', async () => {
    const wrapper = shallow(<TrackFeatures features={[{ label: 'Acousticness', value: 0.5, color: 'red' }]} tempo={-1} />);
    expect(wrapper.find('.track-features--gauges')).toHaveLength(0);
});

it('TrackFeatures component with null data prop', async () => {
    const wrapper = shallow(<TrackFeatures data={null}  tempo={-1}/>);
    expect(wrapper.find('.track-features--gauges')).toHaveLength(0);
});

it('TrackFeatures component with negative data prop and valid tempo prop', async () => {
    const wrapper = shallow(<TrackFeatures features={[{ label: 'Acousticness', value: -1, color: 'red' }]}  tempo={120}/>);
    expect(wrapper.find('.track-features--gauges')).toHaveLength(0);
});

it('TrackFeatures component with just data prop', async () => {
    const wrapper = shallow(<TrackFeatures features={[{ label: 'Acousticness', value: 1, color: 'red' }]}/>);
    expect(wrapper.find('.track-features--gauges')).toHaveLength(0);
});


