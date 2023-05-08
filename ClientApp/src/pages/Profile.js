import React, {useState, useEffect} from 'react';
import {Typography, Button, Grid} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import config from "../config.json";
import {Link, useHistory} from 'react-router-dom';
import ProfileCard from "../molecules/ProfileCard";

export function Profile(props) {
  const v_History = useHistory();
  
  useEffect(() => {
    if(!props.isAuthenticated) v_History.replace('/');
  }, [props.isAuthenticated])
  
  return (
    <div id="profile">
      <Container>
        <Grid container justify="center">
          <Grid item xs={12} md={8}>
            <ProfileCard setAuthenticated={props.setAuthenticated} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
