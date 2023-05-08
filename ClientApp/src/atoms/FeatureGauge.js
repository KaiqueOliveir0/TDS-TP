import React from 'react';
import {Box, CircularProgress, Typography, Grid} from "@material-ui/core";

export default function FeatureGauge(props) {
  return (
      <Grid item xs={6} md={4} className="feature-gauge">
        <div className="d-flex justify-content-center">
          <Box position="relative" display="inline-flex">
            <CircularProgress className="feature-gauge__circle--background" variant="determinate" value={100} thickness={5} size="6rem" />
            <CircularProgress 
              style={{
                'color': props.color
              }} 
              variant="determinate" 
              value={props.absoluteValue ? 100 : props.value} 
              size="6rem" 
              thickness={5}
            />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography className="feature-gauge__percentage" variant="caption" component="div" color="textSecondary">
                {props.absoluteValue ? props.nonNumeric ? props.value : props.value?.toFixed(2) : (Math.round(props.value) + '%')}
              </Typography>
            </Box>
          </Box>
        </div>
        <Typography className="feature-gauge__label" variant="caption" component="div" color="textSecondary">{props.label}</Typography>
      </Grid>
  );
}