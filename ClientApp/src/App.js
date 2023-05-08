import React, {useState} from 'react';
import { Layout } from './Layout';
import { Home } from './pages/Home';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // useLocation,
} from "react-router-dom";
import ReactGA from 'react-ga';

import './custom.css'
import {GetAuthData, IsAuthValid} from "./utils/auth";
import {Check} from "./molecules/Check";
import RouteChangeTracker from "./RouteChangeTracker";
import {ThemeProvider} from "@material-ui/styles";
import {Privacy} from "./pages/Privacy";
import config from "./config.json";
import Header from "./molecules/Header";
import {NowPlaying} from "./pages/NowPlaying";
import {TopArtists} from "./pages/TopArtists";
import {Profile} from "./pages/Profile";
import {TopTracks} from "./pages/TopTracks";

ReactGA.initialize("G-YCQQ2234W1");

export default function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isChecking, setChecking] = useState(true);
  const v_LoginUrl =
    "https://accounts.spotify.com/authorize?show_dialog=true" + 
    "&client_id=" + config.Spotify.ClientId +
    "&response_type=code" +
    "&redirect_uri=" + config.Spotify.RedirectUri +
    "&scope=" + config.Spotify.Scopes
  ;
  
  return(
    <Layout isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} isChecking={isChecking} loginUrl={v_LoginUrl}>
      <Switch>
        <Route path='/' exact>
          <Home isAuthenticated={isAuthenticated} loginUrl={v_LoginUrl}/>
        </Route>
        <Route path='/now-playing'>
          <NowPlaying isAuthenticated={isAuthenticated} loginUrl={v_LoginUrl} />
        </Route>
        <Route path='/top-artists'>
          <TopArtists isAuthenticated={isAuthenticated} loginUrl={v_LoginUrl} />
        </Route>
        <Route path='/top-tracks'>
          <TopTracks isAuthenticated={isAuthenticated} loginUrl={v_LoginUrl} />
        </Route>
        <Route path='/profile'>
          <Profile isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <Route path='/privacy'>
          <Privacy/>
        </Route>
      </Switch>
      <RouteChangeTracker />
      <Check setAuthenticated={setAuthenticated} isChecking={isChecking} setChecking={setChecking} loginUrl={v_LoginUrl} />
    </Layout>
  );
}
