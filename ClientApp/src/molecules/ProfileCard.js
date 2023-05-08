import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import {Logout, Token} from '../utils/auth'
import {Avatar, Icon} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {red} from "@material-ui/core/colors"
import { createMuiTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';

export default function ProfileCard(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(null);
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
        // setTimeout(() => {
        //   setLoading(false);
        // }, 3000);
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
        loading ?
          <Paper className="profile-card">
            <Skeleton variant="circle" animation="wave" className="profile-image profile-image--skeleton" />
            <Avatar alt="Profile picture" className="profile-image" src={undefined}/>
            {/*<Typography align="center" variant="h3">{response.display_name}</Typography>*/}
            <Grid container>
              <Grid container item xs={12} justify="center">
                <Skeleton variant="text" animation="wave" height={60} width="50%" />
              </Grid>
              <Grid container item xs={12} md={6} alignItems="center" direction="column" className="feature-profile-data">
                <Typography variant="h6" align="center">Followers</Typography>
                <Skeleton variant="text" animation="wave" height={30} width={50} />
              </Grid>
              <Grid container item xs={12} md={6} alignItems="center" direction="column" className="feature-profile-data">
                <Typography variant="h6" align="center">Subscription type</Typography>
                <Skeleton variant="text" animation="wave" height={30} width="30%" />
              </Grid>
              <Grid container item xs={12} md={6} alignItems="center" direction="column" className="feature-profile-data">
                <Typography variant="h6" align="center">Country</Typography>
                <Skeleton variant="text" animation="wave" height={30} width={25} />
              </Grid>
              <Grid container item xs={12} md={6} alignItems="center" direction="column" className="feature-profile-data">
                <Typography variant="h6" align="center">Url</Typography>
                <Skeleton variant="text" animation="wave" height={30} width="100%" />
              </Grid>
            </Grid>
            <Button className="logout-btn" color="error.main" variant="contained" startIcon={<Icon>meeting_room</Icon>}>Logout</Button>
          </Paper> :
          error ? 'ERROR' : 
            <Paper className="profile-card">
              <Avatar alt="Profile picture" className="profile-image" src={response.images[0]?.url}/>
              <Typography align="center" variant="h3">{response.display_name}</Typography>
              <Grid container>
                <Grid item xs={12} md={6} className="feature-profile-data">
                  <Typography variant="h6" align="center">Followers</Typography>
                  <Typography variant="body1" align="center">{response.followers.total}</Typography>
                </Grid>
                <Grid item xs={12} md={6} className="feature-profile-data">
                  <Typography variant="h6" align="center">Subscription type</Typography>
                  <Typography className="capitalize" variant="body1" align="center">{response.product}</Typography>
                </Grid>
                <Grid item xs={12} md={6} className="feature-profile-data">
                  <Typography variant="h6" align="center">Country</Typography>
                  <Typography variant="body1" align="center">{response.country}</Typography>
                </Grid>
                <Grid item xs={12} md={6} className="feature-profile-data">
                  <Typography variant="h6" align="center">Url</Typography>
                  <Typography variant="body1" align="center" className="profile-url">{response.external_urls?.spotify}</Typography>
                </Grid>
              </Grid>
              <ColorButton disabled={loading} className="logout-btn" color="error.main" variant="contained" startIcon={<Icon>meeting_room</Icon>} onClick={() => f_LogOut()}>Logout</ColorButton>
            </Paper>
      }
    </div>
  );
}