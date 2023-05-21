import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import {Logout, Token} from '../utils/auth'
import {Avatar, Icon} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {red} from "@material-ui/core/colors"
import { withStyles } from '@material-ui/core/styles';

export default function ProfileCard(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState({});
  const v_Token = Token();
  
  const f_LogOut = () => {
    setLoading(true);
    setTimeout(() => {
      props.setAuthenticated(false);
      Logout();
    }, 500);
  }
  
  useEffect(() => {
    axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': 'Bearer ' + v_Token
      }
    })
      .then(p_Response => {
        setResponse(p_Response.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: red[700],
      '&:hover': {
        backgroundColor: red[800],
      },
    },
  }))(Button);
  
  return (
    <div>
      {
      error ? 'ERROR' : 
        <Paper className="profile-card">
          <Avatar alt="Profile picture" className="profile-image" src={loading ? undefined : response.images[0]?.url}/>
          <Typography align="center" variant="h3">{response.display_name}</Typography>
          <Grid container>
            <Grid item xs={12} md={6} className="feature-profile-data">
              <Typography variant="h6" align="center">Seguidores</Typography>
              <Typography variant="body1" align="center">{response.followers?.total}</Typography>
            </Grid>
            <Grid item xs={12} md={6} className="feature-profile-data">
              <Typography variant="h6" align="center">Tipo de assinatura</Typography>
              <Typography className="capitalize" variant="body1" align="center">{response.product}</Typography>
            </Grid>
            <Grid item xs={12} md={6} className="feature-profile-data">
              <Typography variant="h6" align="center">País</Typography>
              <Typography variant="body1" align="center">{response.country}</Typography>
            </Grid>
            <Grid item xs={12} md={6} className="feature-profile-data">
              <Typography variant="h6" align="center">URL do perfil</Typography>
              <Typography variant="body1" align="center" className="profile-url">{response.external_urls?.spotify}</Typography>
            </Grid>
          </Grid>
          <ColorButton disabled={loading} className="logout-btn" color="error.main" variant="contained" startIcon={<Icon>meeting_room</Icon>} onClick={() => f_LogOut()}>Sair</ColorButton>
        </Paper>
      }
    </div>
  );
}