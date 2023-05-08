import React from 'react';
import Typography from "@material-ui/core/Typography";
import config from "./../config.json"
import {Link} from "react-router-dom";

export default function Footer(props) {
  return (
    <footer>
      <Typography>
        © {new Date().getFullYear()} {config.AppTitle}
      </Typography>
      <Typography className="bullet-symbol">•</Typography>
      <Link to="/privacy"><Typography color="textPrimary">Privacy Notice</Typography></Link>
      <Typography className="bullet-symbol">•</Typography>
      <Link to="/about"><Typography color="textPrimary">About</Typography></Link>
    </footer>
  );
}