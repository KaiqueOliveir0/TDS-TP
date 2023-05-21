import React, {useEffect, useState, useRef} from 'react'
import axios from "axios";
import {Token} from "../utils/auth";
import {Typography} from "@material-ui/core";
// import Chart from "chart.js"
import CircularProgress from "@material-ui/core/CircularProgress";
import FeatureGauge from "../atoms/FeatureGauge"
import {red, purple, amber, cyan, deepOrange, indigo, brown, teal, pink} from '@material-ui/core/colors'
import Grid from "@material-ui/core/Grid";
import pitchClassToTotal from '../utils/pitchClassToTonal'
import {useInterval} from "react-interval-hook";

function randomData() {
  const acousticness = Math.random();
  const liveness = Math.random();
  const danceability = Math.random();
  const energy = Math.random();
  const instrumentalness = Math.random();
  const speechiness = Math.random();
  const valence = Math.random();
  const v_Data = {
    features: [
      {
        label: 'Acousticness',
        value: acousticness * 100,
        color: amber[getColorTone(acousticness)]
      },
      {
        label: 'Liveness',
        value: liveness * 100,
        color: deepOrange[getColorTone(liveness)]
      },
      {
        label: 'Danceability',
        value: danceability * 100,
        color: purple[getColorTone(danceability)]
      },
      {
        label: 'Energy',
        value: energy * 100,
        color: cyan[getColorTone(energy)]
      },
      {
        label: 'Instrumentalness',
        value: instrumentalness * 100,
        color: teal[getColorTone(instrumentalness)]
      },
      {
        label: 'Speechiness',
        value: speechiness * 100,
        color: red[getColorTone(speechiness)]
      },
      {
        label: 'Valence',
        value: valence * 100,
        color: indigo[getColorTone(valence)]
      }],
    key: Math.floor(Math.random() * 11 + 1),
    tempo: Math.random() * 100 + 60,
  }
  
  return v_Data;
}

const getColorTone = (p_Value) => {
  return Math.trunc((800 - p_Value * 500) * 0.01) * 100;
}

export function TrackFeatures(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const v_Token = Token();
  
  const { start, stop, isActive } = useInterval(
    () => {
      setData(randomData());
    },
    4000,
    {
      autoStart: false,
      immediate: true,
      // selfCorrecting: true
    }
  );
  
  if (props.demo) start();
  else stop();

  const f_UpdateChart = (p_Data) => {
    // if (chartInstance) {
      const v_Data = {
        features: [
        {
          label: 'Acousticness',
          value: p_Data.acousticness * 100,
          color: amber[getColorTone(p_Data.acousticness)]
        },
        {
          label: 'Liveness',
          value: p_Data.liveness * 100,
          color: deepOrange[getColorTone(p_Data.liveness)]
        },
        {
          label: 'Danceability',
          value: p_Data.danceability * 100,
          color: purple[getColorTone(p_Data.danceability)]
        },
        {
          label: 'Energy',
          value: p_Data.energy * 100,
          color: cyan[getColorTone(p_Data.energy)]
        },
        {
          label: 'Instrumentalness',
          value: p_Data.instrumentalness * 100,
          color: teal[getColorTone(p_Data.instrumentalness)]
        },
        {
          label: 'Speechiness',
          value: p_Data.speechiness * 100,
          color: red[getColorTone(p_Data.speechiness)]
        },
        {
          label: 'Valence',
          value: p_Data.valence * 100,
          color: indigo[getColorTone(p_Data.valence)]
        }],
        key: p_Data.key,
        tempo: p_Data.tempo,
      };
      
      setData(v_Data);

      // chartInstance.data.datasets[0].data = v_Data;
      // chartInstance.update();
    // }
  }

  const f_Request = (p_Id) => {
    axios
      .get('https://api.spotify.com/v1/audio-features/' + p_Id, {
        headers: {
          'Authorization': 'Bearer ' + v_Token
        },
      })
      .then(p_Response => {
        if (p_Response != null) {
          const v_Data = p_Response.data;
          if (v_Data) {
            f_UpdateChart(v_Data)
          }
        }
      })
      .catch((p_E) => {
        console.log(p_E);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (props.id) {
      f_Request(props.id);
    } 
    else if (props.demo) {
      setData(randomData());
    }
    else {
      setData(null)
    }
  }, [props.id, props.demo])

  // useEffect(() => {
  //   if (chartContainer && chartContainer.current) {
  //     const newChartInstance = new Chart(chartContainer.current, chartConfig);
  //     setChartInstance(newChartInstance);
  //   }
  // }, [chartContainer]);

  return (
  <div className="track-features">
    {data && data.tempo >= 0 && data.features.every(item => item.value >= 0) ? (
      <Grid container className="track-features track-features--gauges track-features__grid" spacing={8}>
        {data.features.filter(item => item.value >= 0).map((item, index) => (
          <FeatureGauge key={index} label={item.label} value={item.value} color={item.color} />
        ))}
        <FeatureGauge key={100} label="Key" value={pitchClassToTotal[data.key] ?? 'N/A'} color={pink[500]} absoluteValue nonNumeric />
        <FeatureGauge key={101} label="BPM" value={data.tempo} color={pink[500]} absoluteValue />
      </Grid>
    ) : null}
    {/*<Typography variant="body1">BPM: {data?.tempo}</Typography>*/}
  </div>
);

}

