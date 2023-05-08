import React, {useState} from 'react';
import {Button, Card, CardContent, Grid, Icon, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import config from "../config.json";
import {Link} from 'react-router-dom';
import {RefreshToken, Token} from "../utils/auth";
import axios from "axios";
import {msToMmSsString} from "../utils/msToMmSsString";
import {TrackFeatures} from "../molecules/TrackFeatures";
import {useInterval} from 'react-interval-hook';
import {TrackCard} from "../atoms/TrackCard";
import PlayingStatus from "../molecules/PlayingStatus";
import Paper from "@material-ui/core/Paper";

export function NowPlaying(props) {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLinkCopied, setLinkCopied] = useState(false);
  const [songData, setSongData] = useState(null);
  const [message, setMessage] = useState(null);
  const v_Token = Token();

  const f_Request = () => {
    axios
      .get('https://api.spotify.com/v1/me/player', {
      // .get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          'Authorization': 'Bearer ' + v_Token
        },
        params: {
          // time_range: 'medium_term',
        }
      })
      .then(p_Response => {
        if (p_Response != null) {
          const v_Data = p_Response.data;
          if (v_Data) {
            if (v_Data.currently_playing_type === "track") {
              f_UpdateProgress(v_Data.item.duration_ms, v_Data.progress_ms);
              setIsPlaying(v_Data.is_playing);
              setMessage(null);
              if (!songData || (songData && songData.id !== v_Data.item.id)) {
                // const v_Artists = v_Data.item.artists.map(artist => {
                //   return {
                //     "external_urls": artist.external_urls,
                //     "href": artist.href,
                //     "id": artist.id,
                //     "name": artist.name,
                //     "type": artist.type,
                //     "uri": artist.uri
                //   }
                // })
                setSongData(v_Data.item);
              }
            } else {
              setSongData(null);
              setMessage("You're playing something but it's not a song. If you want to see features data, please play a song.");
            }
          } else if (p_Response.status === 204) {
            setSongData(null);
            setMessage('Ok, ready to go! Just play a song with your Spotify in any device and wait a few seconds.');
          }
        }
      })
      .catch((p_E) => {
        if (p_E.response.status == 401) {
          RefreshToken();
        }
        console.log(p_E);
        setSongData(null);
        if (p_E.message === "Network Error") setMessage("Looks like you're offline. Could you please check your internet connection?");
        setError(true);
      })
      .finally(() => {
        setLoading(false)
      });
  }

  const f_UpdateProgress = (p_Duration, p_Progress) => {
    const v_Time = msToMmSsString(p_Progress)
    const v_Progress = {
      time: v_Time,
      ms: p_Progress,
      percentage: Math.floor((p_Progress / p_Duration) * 100)
    }

    setProgress(v_Progress);
  }

  const { start, stop, isActive } = useInterval(
    () => {
      f_Request();
    },
    4000,
    {
      autoStart: false,
      immediate: true,
      // selfCorrecting: true
    }
  );

  if (props.isAuthenticated) start();
  else stop();

  const f_Message = (p_Message) => {
    return (
      <Paper className="message">
        <Icon className="message__icon">info</Icon>
        <Typography variant="body1">{p_Message}</Typography>
      </Paper>
    );
  };

  return (
    <Container>
      <Grid container id="now_playing">
        <Grid item xs={12} md={6}>
          <div className="resume-and-controls">
            <Typography variant="h1" color="textPrimary" className="title" gutterBottom>
              Now playing
            </Typography>
            {
              !songData &&
              <Typography variant="body1" gutterBottom className="description">
                {config.AppTitle} grabs the song you're currently listening to and show Spotify info about it.
              </Typography>
            }
            {
              props.isAuthenticated ? 
                (message ? f_Message(message) :
                  <div>
                    <TrackCard track={songData} index={null} linkCopied={isLinkCopied} setCopiedLink={setLinkCopied} />
                    <PlayingStatus progress={progress} isPlaying={isPlaying} />
                  </div>
                ) :

                <Card className="who-are-you-card">
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      Who are you?
                    </Typography>
                    <Typography variant="body2" component="p">
                      You need to be logged in for this to work
                    </Typography>
                    <div className="login-button">
                      <Button href={props.loginUrl} variant="contained" color="secondary" className="login-button--button">
                        <div className="d-flex">
                          Login with Spotify <Icon fontSize="small">lock</Icon>
                        </div>
                      </Button>
                      <Typography variant="caption" display="block" align="center" className="login-button--privacy-reminder">
                        By logging in, you agree with {config.AppTitle}'s <Link to="/privacy"><Typography
                        variant="caption" color="secondary">Privacy Notice</Typography></Link>.
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
            }
          </div>
        </Grid>
        <Grid container item xs={12} md={6} justify="center" alignItems="center">
          {
            props.isAuthenticated ?
              <TrackFeatures id={songData?.id} /> :
              <TrackFeatures id={songData?.id} demo />
          }
        </Grid>
      </Grid>
    </Container>
  );
}
