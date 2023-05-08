import React, {useEffect, useState} from 'react';

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Chip,
  Fade,
  Grid,
  Grow,
  CircularProgress,
  Icon
} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller'
import {Token} from '../utils/auth'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import config from "../config.json";
import {Link} from "react-router-dom";
import {TrackCard} from "../atoms/TrackCard";

export default function TopTracksList(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [copiedLinkIndex, setCopiedLinkIndex] = useState(null);
  const [isFirstLoad, setFirstLoad] = useState(true);
  const v_Token = Token();
  
  const v_Limit = isFirstLoad ? 5 : 15
  const f_LoadMore = (p_Page) => {
    axios.get('https://api.spotify.com/v1/me/top/tracks', {
      headers: {
        'Authorization': 'Bearer ' + v_Token
      },
      params: {
        time_range: props.period,
        limit: v_Limit,
        offset: (p_Page - 1) * v_Limit
      }
    })
      .then(p_Response => {
        const v_HasMore = (items.length + p_Response.data.items.length) < p_Response.data.total
        setHasMore(v_HasMore)
        setItems([...items, ...p_Response.data.items])
        if (isFirstLoad) setFirstLoad(false)
        // setResponse(p_Response.data);
      })
      .catch(() => {
        setError(true);
      });
  }
  
  const v_Loading =
    // <div className="track-card-container">
    //   <Grid container>
    //     <Grid container item xs={12} md={4} justify="center">
    //       {/*<Typography variant="h1" component="h2" className="position">#º</Typography>*/}
    //       <CircularProgress color="textPrimary" className="position" size="5rem"/>
    //     </Grid>
    //     <Grid container item xs={12} md={8} justify="center">
    //       <Card className="track-card">
    //         <Skeleton variant="rect" animation="wave" height={320} width="100%" />
    //         <CardContent>
    //           <Skeleton variant="text" animation="wave" height={40} width="50%" />
    //           <Skeleton variant="text" animation="wave" height={40} width="100%" />
    //           <Skeleton variant="text" animation="wave" height={40} width="100%" />
    //         </CardContent>
    //         <CardActions>
    //           {/*<Button size="small" color="textPrimary" disabled>*/}
    //           {/*  Share*/}
    //           {/*</Button>*/}
    //           <Button size="small" color="textPrimary" disabled>
    //             Copy Spotify link
    //           </Button>
    //         </CardActions>
    //       </Card>
    //     </Grid>
    //   </Grid>
    // </div>
    <div className="track-card-container">
      <Grid container>
        <Grid container item xs={12} md={4} justify="center">
          <CircularProgress color="textPrimary" className="position" size="5rem"/>
          {/*<Typography variant="h1" component="h2" className="position">{index + 1}º</Typography>*/}
        </Grid>
        <Grid container item xs={12} md={8} justify="center">
          <Card className="track-card">
            <div className="track-card--top">
              {/*<CardMedia*/}
              {/*  className="track-image"*/}
              {/*  image={track.album?.images ? track.album?.images[0].url : null}*/}
              {/*  title={"Profile picture of " + track.name}*/}
              {/*/>*/}
              <Skeleton className="track-image" variant="rect" animation="wave" />
              <div className="track-card--top-text">
                {/*<Typography gutterBottom variant="h5" component="h2">*/}
                {/*  {track.name}*/}
                {/*</Typography>*/}
                {/*<Typography gutterBottom variant="subtitle1">*/}
                {/*  {track.album?.name}{track.track_number ? ' - Track ' + track.track_number : ''}*/}
                {/*</Typography>*/}
                {/*<Typography gutterBottom variant="subtitle2">*/}
                {/*  {track.artists ? track.artists.map((artist, index, artists) => artist.name + (index == artists.length - 1 ? '' : ', ')) : ''}*/}
                {/*</Typography>*/}
                <Skeleton variant="text" animation="wave" height={40} width="50%" />
                <Skeleton variant="text" animation="wave" height={30} width="100%" />
                <Skeleton variant="text" animation="wave" height={30} width="45%" />
              </div>
            </div>
            <CardContent>
              <Skeleton variant="text" animation="wave" height={30} width="30%" />
            </CardContent>
            <CardActions>
              <Skeleton variant="text" animation="wave" height={30} width="35%" />
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>;
  ;
  
  const f_ItemCard = (track, index) =>
    <TrackCard key={index} track={track} index={index} linkCopied={index == copiedLinkIndex} setCopiedLink={setCopiedLinkIndex}/>;
    // <div key={index} className="track-card-container">
    //   <Grid container>
    //     <Grid container item xs={12} md={4} justify="center">
    //       <Typography variant="h1" component="h2" className="position">{index + 1}º</Typography>
    //     </Grid>
    //     <Grid container item xs={12} md={8} justify="center">
    //       <Fade in={true}>
    //         <Card className="track-card">
    //           <div className="track-card--top">
    //             <CardMedia
    //               className="track-image"
    //               image={track.album?.images ? track.album.images[1]?.url : null}
    //               title={"Profile picture of " + track.name}
    //             />
    //             <div className="track-card--top-text">
    //               <Typography gutterBottom variant="h5" component="h2">
    //                 {track.name}
    //               </Typography>
    //               <Typography gutterBottom variant="subtitle1">
    //                 {track.album?.name}{track.track_number ? ' - Track ' + track.track_number : ''} 
    //               </Typography>
    //               <Typography gutterBottom variant="subtitle2">
    //                 {track.artists ? track.artists.map((artist, index, artists) => artist.name + (index == artists.length - 1 ? '' : ', ')) : ''}
    //               </Typography>
    //             </div>
    //           </div>
    //           <CardContent>
    //             <Typography variant="body2" color="textSecondary" component="p">
    //               Release date: {track.album?.release_date ? new Date(track.album.release_date).toLocaleDateString() : 'Unknow'}
    //             </Typography>
    //             <Typography variant="body2" color="textSecondary" component="p">
    //               {track.explicit && 'Explicit'}
    //             </Typography>
    //           </CardContent>
    //           {
    //             track.external_urls && track.external_urls['spotify'] &&
    //             <CardActions>
    //               {/*<Button size="small" color="textPrimary">*/}
    //               {/*  Share*/}
    //               {/*</Button>*/}
    //               <CopyToClipboard text={track.external_urls['spotify']}>
    //                 <Button size="small" onClick={() => setCopiedLinkIndex(index)}>
    //                   Copy Spotify link
    //                 </Button>
    //               </CopyToClipboard>
    //               <Grow in={copiedLinkIndex == index}>
    //                 <Typography variant="caption" color="secondary" component="p">
    //                   Copied!
    //                 </Typography>
    //               </Grow>
    //             </CardActions>
    //           }
    //         </Card>
    //       </Fade>
    //     </Grid>
    //   </Grid>
    // </div>;

  return (
    props.isAuthenticated ? 
    <InfiniteScroll
      pageStart={0}
      loadMore={f_LoadMore}
      hasMore={hasMore}
      loader={v_Loading}
    >
      {/*{v_Loading}*/}
      {
        items.map((track, index) =>
          f_ItemCard(track, index)
        )
      }
      { !hasMore &&
        <div className="end-of-list">
          <Icon fontSize="large" color="secondary">check</Icon>
          <Typography gutterBottom>End of list</Typography>
        </div>
      }
    </InfiniteScroll> :
      <div className="preview">
        <div className="preview--list">
          {
            [
              {
                album: {images: ['', {url: '/img/vinyl.webp'}]},
                name: 'Lorem ipsum dolor sit amet',
                genres: ['nothing', 'to', 'see', 'here']
              },
              {
                album: {images: ['', {url: '/img/vinyl.webp'}]},
                name: 'Ameno',
                genres: ['dori me', 'dimere', 'latire', 'latiremo']
              },
              {
                album: {images: ['', {url: '/img/vinyl.webp'}]},
                name: 'Ameno',
                genres: ['nothing', 'to', 'see', 'here']
              },
              {
                album: {images: ['', {url: '/img/vinyl.webp'}]},
                name: 'Ameno',
                genres: ['dori me', 'dimere', 'latire', 'latiremo']
              },
            ].map((track, index) => f_ItemCard(track, index))
          }
        </div>
        <div className="preview--lead">
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Who are you?
              </Typography>
              <Typography variant="body2" component="p">
                Log in to check your list
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
            </CardContent>
          </Card>
        </div>
      </div>
  );
}