import React, {useEffect, useState} from 'react';
import {Grid, Paper, Typography, Button, Icon} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import TopArtistsList from "../molecules/TopArtistsList";
import Chip from "@material-ui/core/Chip";

export function TopArtists(props) {
  const [period, setPeriod] = useState(1);
  const [isListEnabled, setListEnable] = useState(true);
  const v_PeriodDictionary = {
    0: {
      timeRange: 'long_term',
      label: 'All time'
    },
    1: {
      timeRange: 'medium_term',
      label: 'Six months'
    },
    2: {
      timeRange: 'short_term',
      label: 'Four weeks'
    },
  }
  
  const f_PeriodChange = (p_NewValue) => {
    setListEnable(false)
    setPeriod(p_NewValue)
  }
  
  useEffect(() => {
    if(!isListEnabled) setListEnable(true);
  }, [isListEnabled])
  
  return (
    <Container>
      <Grid container id="top_artists">
        <Grid item xs={12} md={5} className="">
          <div className="resume-and-controls">
            <Typography variant="h1" color="textPrimary" align="center" gutterBottom>
              Top Artists
            </Typography>
            <Typography variant="body1" className="description" color="textPrimary" gutterBottom>
              The list with your most listened artists
            </Typography>
            {
              props.isAuthenticated &&
              <div className="period">
                <Typography variant="body2" color="textPrimary" className="period--title">
                  Period
                </Typography>
                <div>
                  {
                    Object.keys(v_PeriodDictionary).map((item, index) =>
                      <Chip
                        className="period--chip"
                        clickable
                        color={period !== index ? undefined : "secondary"}
                        disabled={!props.isAuthenticated}
                        icon={period !== index ? <Icon fontSize="small">hourglass_empty_rounded</Icon> : <Icon fontSize="small">hourglass_full_rounded</Icon>}
                        key={index}
                        label={v_PeriodDictionary[item].label}
                        onClick={() => f_PeriodChange(index)}
                        variant="outlined"
                      />
                    )
                  }
                </div>
              </div>
            }
          </div>
        </Grid>
        <Grid container item xs={12} md={7} justify="center">
          { isListEnabled &&
            <div className="top-artists-list">
              <TopArtistsList period={v_PeriodDictionary[period]['timeRange']} isAuthenticated={props.isAuthenticated} loginUrl={props.loginUrl}/>
            </div>
          }
        </Grid>
      </Grid>
    </Container>
  );
}
