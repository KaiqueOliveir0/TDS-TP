import React, {useEffect, useState} from 'react';
import {Button, Card, CardContent, Fade, Icon, IconButton, CircularProgress, Typography} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {GetAuthData, GetPreviousPathname, GetToken, IsAuthValid, Logout, RefreshToken} from "../utils/auth"
import config from "../config.json";

export function Check(props) {
  const v_UrlParams = Object.fromEntries(new URLSearchParams(window.location.search));
  const v_Code = v_UrlParams['code'];
  const v_Error = v_UrlParams['error']; //?error=access_denied
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [checking, setChecking] = useState(true);
  const v_History = useHistory();
  
  const f_CloseErrorCard = () => {
    v_History.replace('/');
    setError(false)
  }

  useEffect(() => {
    // console.log('error message: ' + v_Error)
    const v_AuthData = GetAuthData();
    const v_PreviousPathname = GetPreviousPathname();
    if (v_Code) {
      try {
        Logout();
        GetToken(v_Code, 
          () => {
            setChecking(false);
            props.setAuthenticated(true);
            if (v_PreviousPathname)
              v_History.replace(v_PreviousPathname);
            else
              v_History.replace('/');
          },
          () => {
            setChecking(false);
            props.setAuthenticated(false);
          });
      } catch (e) {
        console.log(e);
        setError(true);
        props.setAuthenticated(false);
      }
    } else if (v_Error) {
      setError(true);
      setChecking(false);
      props.setAuthenticated(false);
      if (v_Error == "access_denied") {
        setMessage('You did not grant permissions to your account.');
      }
      else {
        setMessage('An error occoured while trying to log in.');
      }
    }
    else if (v_AuthData) {
      if (IsAuthValid(v_AuthData)) {
        setChecking(false);
        props.setAuthenticated(true);
      } 
      else {
        try {
          RefreshToken();
        } catch(e) {
          Logout();
          setError(true);
          props.setAuthenticated(false);
        }
      }
    } else {
      setChecking(false);
      props.setAuthenticated(false);
    }
  }, []);

  return (
    <Fade in={checking || error} timeout={1000}>
      <div id="check_screen">
        <Card className="check-card">
          <CardContent className="check-card__content">
            <div>
              {
                checking ?
                  <div className="d-flex align-items-center">
                    Checking account...
                    <CircularProgress color="secondary" />
                  </div> 
                  : error ?
                  <div className="error-card">
                    <div className="error-card--close-button">
                      <IconButton aria-label="close" onClick={() => f_CloseErrorCard()}>
                        <Icon color="default">close</Icon>
                      </IconButton>
                    </div>
                    <div className="error-card--message">
                      <Typography variant="body1" align="center">
                        <Icon>error</Icon> {message} Do you wish to try again?
                      </Typography>
                    </div>
                    <div className="login-button">
                      <Button href={props.loginUrl} variant="contained" color="secondary" className="login-button--button">
                        <div className="d-flex">
                          Login with Spotify <Icon fontSize="small">lock</Icon>
                        </div>
                      </Button>
                      <Typography variant="caption" display="block" align="center" className="login-button--privacy-reminder">
                        By logging in, you agree with {config.AppTitle}'s <Link to="/privacy" target="_blank"><Typography variant="caption" color="secondary">Privacy Notice</Typography></Link>.
                      </Typography>
                    </div>
                  </div>
                   : 
                  ''
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </Fade>
  );
}
