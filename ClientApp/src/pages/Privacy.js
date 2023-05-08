import React, {useState} from 'react';
import {Typography, Button, Link} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import config from "../config.json";
import {useHistory} from "react-router-dom";

export function Privacy() {
  const v_History = useHistory();
  
  return (
    <div id="privacy" className="background">
      <Container>
        <div className="content">
          <Typography variant="h3" component="h1" className="logo" color="textPrimary" gutterBottom>
            Privacy notice
          </Typography>
          <Typography variant="h4" component="h2" className="logo" color="textPrimary">
            Your data
          </Typography>
          <Typography variant="body1" gutterBottom>
            {config.AppTitle} do not stores any personal data of its users. It's mostly a front-end application and your data goes straight to and from Spotify. However, anonymous demographic and usage statistics are collected by Google Analytics service, please check <Link color="secondary" href="https://policies.google.com/privacy">Google Privacy Policy</Link>. 
          </Typography>
          <Typography variant="h4" component="h2" className="logo" color="textPrimary">
            That's it
          </Typography>
          <Typography variant="body1" gutterBottom>
            I'm not a lawyer, sorry to disappointing you if you were expecting a huge formal document. At least there are no small texts.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Enjoy it.
          </Typography>
          
          {/*<Typography variant="h4" component="h2" className="logo" color="textPrimary">*/}
          {/*  Google Analytics*/}
          {/*</Typography>*/}
          {/*<Typography variant="body1" gutterBottom>*/}
          {/*  <Link color="secondary" href="https://policies.google.com/privacy">Google Privacy Policy</Link>*/}
          {/*</Typography>*/}
          {/*<Typography variant="h4" component="h2" className="logo" color="textPrimary">*/}
          {/*  Children's privacy*/}
          {/*</Typography>*/}
          {/*<Typography variant="body1" gutterBottom>*/}
          {/*  {config.AppTitle} do not aim services directly at children under the age of 13. */}
          {/*</Typography>*/}
          <div className="back-button">
            <Button variant="contained" color="primary" onClick={() => v_History.goBack()}>
              Back
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
