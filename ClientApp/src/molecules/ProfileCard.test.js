import React from "react";
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProfileCard from "./ProfileCard";

Enzyme.configure({ adapter: new Adapter() })

it('ProfileCard component renders correctly', async () => {
  shallow(<ProfileCard setAuthenticated={() => {}} />)
})

it('profile image renders', async () => {
  const wrapper = shallow(<ProfileCard setAuthenticated={() => {}} />)
  const selector = wrapper.find('.profile-image')
  expect(selector).toHaveLength(1)
})

it('there are 4 profile data columns', async () => {
  const wrapper = shallow(<ProfileCard setAuthenticated={() => {}} />)
  const selector = wrapper.find('#profile_data')
  const childrenCount = selector.props().children.length
  expect(childrenCount).toEqual(4)
})

it('each profile data columns must be styled with class \'feature-profile-data\'', async () => {
  const wrapper = shallow(<ProfileCard setAuthenticated={() => {}} />)
  const profileDataSelector = wrapper.find('#profile_data')
  const childrenCount = profileDataSelector.props().children.length
  const classSelector = wrapper.find('.feature-profile-data')
  const howManyTimesIsClassApplied = classSelector.length
  expect(howManyTimesIsClassApplied).toEqual(childrenCount)
})

it('followers column renders', async () => {
  const wrapper = shallow(<ProfileCard setAuthenticated={() => {}} />)
  const selector = wrapper.find('#followers_column')
  expect(selector).toHaveLength(1)
})

it('subscription type column renders', async () => {
  const wrapper = shallow(<ProfileCard setAuthenticated={() => {}} />)
  const selector = wrapper.find('#subscription_type_column')
  expect(selector).toHaveLength(1)
})

it('country column renders', async () => {
  const wrapper = shallow(<ProfileCard setAuthenticated={() => {}} />)
  const selector = wrapper.find('#country_column')
  expect(selector).toHaveLength(1)
})

it('url column renders', async () => {
  const wrapper = shallow(<ProfileCard setAuthenticated={() => {}} />)
  const selector = wrapper.find('#url_column')
  expect(selector).toHaveLength(1)
})

it('logout button renders', async () => {
  const wrapper = shallow(<ProfileCard setAuthenticated={() => {}} />)
  const selector = wrapper.find('#logout_btn')
  expect(selector).toHaveLength(1)
})

it('logout button must have icon', async () => {
  const wrapper = shallow(<ProfileCard setAuthenticated={() => {}} />)
  const selector = wrapper.find('#logout_btn')
  const iconProp = selector.prop('startIcon')
  expect(iconProp).toBeDefined()
})

it('logout button must have text content', async () => {
  const wrapper = shallow(<ProfileCard setAuthenticated={() => {}} />)
  const selector = wrapper.find('#logout_btn')
  const textLength = selector.text().length
  expect(textLength).toBeGreaterThan(0)
})

it('profile display name button renders', async () => {
  const wrapper = shallow(<ProfileCard setAuthenticated={() => {}} />)
  const selector = wrapper.find('#profile_display_name')
  expect(selector).toHaveLength(1)
})
