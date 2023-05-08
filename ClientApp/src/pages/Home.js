import React, {useState} from 'react';
import {Grid, Typography, Button, Icon, Toolbar} from "@material-ui/core";
import config from "../config.json";
// import Profile from "../molecules/Profile";
// import TopArtists from "../molecules/TopArtists";
import {Link} from 'react-router-dom';

export function Home(props) {
  return (
    <div id="home">
      <div id="top">
          <div className="welcome">
            <Typography variant="h1" align="center" className="logo" color="textPrimary" gutterBottom>
              {config.AppTitle}
            </Typography>
            <Typography variant="body1" gutterBottom align="center">
              A place you may check Spotify info in a cozy interface :)
            </Typography>
            {props.isAuthenticated ?
              <div>
                <Typography variant="body1" gutterBottom align="center">
                  You have successfully logged in, feel free to navigate:
                </Typography>
                <div className="page-buttons">
                  <Link to="/now-playing">
                    <Button variant="outlined">Now playing</Button>
                  </Link>
                  <Link to="/top-artists">
                    <Button variant="outlined">Top artists</Button>
                  </Link>
                  <Link to="/top-tracks">
                    <Button variant="outlined">Top tracks</Button>
                  </Link>
                </div>
              </div>
               :
              <div>
                <Typography variant="body1" gutterBottom align="center">
                  Just log in and give it a try!
                </Typography>
                <div className="login-button">
                  <Button href={props.loginUrl} variant="contained" color="secondary" className="login-button--button">
                    <div className="d-flex">
                      Login with Spotify <Icon fontSize="small">lock</Icon>
                    </div>
                  </Button>
                  <Typography variant="caption" display="block" align="center" className="login-button--privacy-reminder">
                    By logging in, you agree with {config.AppTitle}'s <Link to="/privacy"><Typography variant="caption" color="secondary">Privacy Notice</Typography></Link>.
                  </Typography>
                </div>
              </div>
            }
          </div>
      </div>
    </div>
  );
}
