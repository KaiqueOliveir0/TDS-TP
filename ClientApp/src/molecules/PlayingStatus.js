import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import {Token} from '../utils/auth'
import LinearProgress from "@material-ui/core/LinearProgress";
import {msToMmSsString} from "../utils/msToMmSsString";
import {Grid} from "@material-ui/core";

export default function PlayingStatus(props) {

  return (
    <div>
      {
        props.loading ?
          <div>
            LOADING
          </div> :
          <Card className="playing-status">
            {/*<CardMedia*/}
            {/*  className="playing-status playing-status__cover"*/}
            {/*  image={props.songData.coverUrl}*/}
            {/*  title="Live from space album cover"*/}
            {/*/>*/}
            <div className="playing-status playing-status__details">
              <CardContent className="playing-status__content">
                {/*<Typography component="h5" variant="h5">*/}
                {/*  {props.songData.name}*/}
                {/*</Typography>*/}
                {/*<Typography variant="subtitle1" color="textSecondary">*/}
                {/*  {props.songData.album}*/}
                {/*</Typography>*/}
                <LinearProgress variant="determinate" value={props.progress?.percentage} className="playing-status__progress-bar" color="secondary" />
              </CardContent>
              <div className="playing-status__status">
                {
                  props.isPlaying ?
                    <div className="playing-status__status--item">
                      <Icon>play_circle_filled</Icon>
                      <Typography>Playing</Typography>
                    </div> :
                    <div className="playing-status__status--item">
                      <Icon>pause_circle_filled</Icon>
                      <Typography>Paused</Typography>
                    </div>
                }
              </div>
            </div>
          </Card>
      }
    </div>
  );
}