import {Button, Card, CardActions, CardContent, CardMedia, Grid, Grow, Typography} from "@material-ui/core";
import {CopyToClipboard} from "react-copy-to-clipboard";
import React from "react";

export function TrackCard(props) {
  return (
    <div className="track-card-container">
      <Grid container>
        {props.index != null &&
        <Grid container item xs={12} md={4} justify="center">
          <Typography variant="h1" component="h2" className="position">{props.index + 1}º</Typography>
        </Grid>
        }
        <Grid container item xs={12} md={props.index != null ? 8 : null} className="track-card-container__grid">
          <Card className="track-card">
            <div className="track-card--top">
              <CardMedia
                className="track-image"
                image={props.track?.album?.images ? props.track.album.images[1]?.url : null}
                title={"Profile picture of " + props.track?.name}
              />
              <div className="track-card--top-text">
                <Typography gutterBottom variant="h5" component="h2">
                  {props.track?.name}
                </Typography>
                {/*{*/}
                {/*  !!props.track.album?.album_type &&*/}
                {/*  <Typography variant="subtitle1" className="album-type">*/}
                {/*    {props.track.album.album_type}*/}
                {/*  </Typography>*/}
                {/*}*/}
                <Typography gutterBottom variant="subtitle1">
                  {props.track?.album?.name}{props.track?.track_number ? ' - Track ' + props.track.track_number : ''}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  {props.track?.artists ? props.track.artists.map((artist, index, artists) => artist.name + (index == artists.length - 1 ? '' : ', ')) : ''}
                </Typography>
              </div>
            </div>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                Release
                date: {props.track?.album?.release_date ? new Date(props.track.album.release_date).toLocaleDateString() : 'Unknow'}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.track?.explicit && 'Explicit'}
              </Typography>
            </CardContent>
            {
              props.track?.external_urls && props.track.external_urls['spotify'] &&
              <CardActions>
                {/*<Button size="small" color="textPrimary">*/}
                {/*  Share*/}
                {/*</Button>*/}
                <CopyToClipboard text={props.track.external_urls['spotify']}>
                  <Button size="small" onClick={() => props.setCopiedLink(props.index ?? true)}>
                    Copy Spotify link
                  </Button>
                </CopyToClipboard>
                <Grow in={props.linkCopied}>
                  <Typography variant="caption" color="secondary" component="p">
                    Copied!
                  </Typography>
                </Grow>
              </CardActions>
            }
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}