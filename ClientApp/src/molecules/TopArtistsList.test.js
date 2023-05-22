import React from "react";
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { TopArtistsList } from "./TopArtistsList";


Enzyme.configure({ adapter: new Adapter() });

it('TopArtistsList component renders correctly', () => {
  shallow(<TopArtistsList />);
});

it('render the TopArtistsList', async () => {
    const wrapper = shallow(<TopArtistsList />);
    expect(wrapper.find('.top-artists-list')).toHaveLength(1);
});

it('renders loading state when loading is true', () => {
    const wrapper = shallow(<TopArtistsList isAuthenticated={true} period="short_term" />);
    wrapper.setState({ loading: true });
    expect(wrapper.find('CircularProgress')).toHaveLength(1);
  });

  
  it('renders preview when not authenticated', () => {
    const wrapper = shallow(<TopArtistsList isAuthenticated={false} period="short_term" />);
    expect(wrapper.find('.preview')).toHaveLength(1);
  });

  it('renders artist cards when authenticated and not loading', () => {
    const wrapper = shallow(<TopArtistsList isAuthenticated={true} period="short_term" />);
    wrapper.setState({ loading: false, items: [{ name: 'Artist 1' }, { name: 'Artist 2' }] });
    expect(wrapper.find('.artist-card')).toHaveLength(2);
  });
  
  it('renders end of list message when no more items to load', () => {
    const wrapper = shallow(<TopArtistsList isAuthenticated={true} period="short_term" />);
    wrapper.setState({ loading: false, hasMore: false });
    expect(wrapper.find('.end-of-list')).toHaveLength(1);
  });
  
  it('triggers loadMore function when scrolling to load more items', () => {
    const wrapper = shallow(<TopArtistsList isAuthenticated={true} period="short_term" />);
    wrapper.setState({ loading: false, hasMore: true });
    const infiniteScroll = wrapper.find('InfiniteScroll');
    expect(infiniteScroll.prop('loadMore')).toBe(wrapper.instance().f_LoadMore);
  });

  
  it('copies Spotify link when "Copy Spotify link" button is clicked', () => {
    const wrapper = shallow(<TopArtistsList isAuthenticated={true} period="short_term" />);
    const copyButton = wrapper.find('CopyToClipboard');
    copyButton.simulate('copy');
    expect(wrapper.state('copiedLinkIndex')).toBe(0);
  });
  
  it('displays "Copied!" message when Spotify link is copied', () => {
    const wrapper = shallow(<TopArtistsList isAuthenticated={true} period="short_term" />);
    wrapper.setState({ copiedLinkIndex: 0 });
    expect(wrapper.find('Grow')).toHaveLength(1);
    expect(wrapper.find('Typography').last().text()).toBe('Copied!');
  });
  
  it('displays the correct number of artist cards when items are loaded', () => {
    const wrapper = shallow(<TopArtistsList isAuthenticated={true} period="short_term" />);
    wrapper.setState({ loading: false, items: [{ name: 'Artist 1' }, { name: 'Artist 2' }, { name: 'Artist 3' }] });
    expect(wrapper.find('.artist-card')).toHaveLength(3);
  });
  

  it('renders the loading skeleton when loading is true', () => {
    const wrapper = shallow(<TopArtistsList isAuthenticated={true} period="short_term" />);
    wrapper.setState({ loading: true });
    expect(wrapper.exists('Skeleton')).toBe(true);
  });
  
  it('renders the "Login with Spotify" button when not authenticated', () => {
    const wrapper = shallow(<TopArtistsList isAuthenticated={false} period="short_term" />);
    expect(wrapper.find('Button').text()).toContain('Login with Spotify');
  });