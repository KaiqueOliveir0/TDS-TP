import React, {useState} from 'react';
import {AppBar, Toolbar, Typography, Button, Icon} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import config from "./../config.json"
import {Link} from "react-router-dom";
import {Logout} from "../utils/auth";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);
  const f_Logout = () => {
    Logout();
    props.setAuthenticated(false);
  }
  
  const v_Pages = [
    {
      label: 'Home',
      href: '/',
      icon: 'home'
    },
    {
      label: 'Now Playing',
      href: '/now-playing',
      icon: 'play_arrow'
    },
    {
      label: 'Top Artists',
      href: '/top-artists',
      icon: 'portrait'
    },
    {
      label: 'Top Tracks',
      href: '/top-tracks',
      icon: 'music_note'
    },
  ]

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" className="side-menu-btn" color="inherit" aria-label="menu" onClick={() => setSideMenuOpen(true)}>
          <Icon>menu</Icon>
        </IconButton>
        <Typography variant="h6" component="span" className="app-title">
          {config.AppTitle}
        </Typography>
        <div className="pages">
          {
            v_Pages.map((item, index) =>
              <Link key={index} to={item.href}>
                <Button><Icon>{item.icon}</Icon>{item.label}</Button>
              </Link>
            )
          }
        </div>
        {/*<Link to="/dashboard">*/}
        {/*  <Button color="inherit">Dashboard</Button>*/}
        {/*</Link>*/}
        {
          props.isAuthenticated &&
          <Link className="login-logout-btn" to="/profile">
            <IconButton
              aria-label="Profile"
              aria-haspopup="true"
            >
              <Icon>account_circle</Icon>
            </IconButton>
          </Link>
        }
      </Toolbar>
      <Drawer PaperProps={{className: "side-menu"}} anchor="left" open={isSideMenuOpen} onClose={() => setSideMenuOpen(false)}>
        <div className="side-menu--app-title">
          <IconButton edge="start" color="inherit" aria-label="close" onClick={() => setSideMenuOpen(false)}>
            <Icon>arrow_back</Icon>
          </IconButton>
          <Typography variant="h6" component="span">
            {config.AppTitle}
          </Typography>
        </div>
        <Divider />
        <List onClick={() => setSideMenuOpen(false)}>
          {
            v_Pages.map((item, index) =>
              <Link key={index} to={item.href}>
                <ListItem button>
                  <ListItemIcon><Icon>{item.icon}</Icon></ListItemIcon>
                  <ListItemText primaryTypographyProps={{color: "textPrimary"}} primary={item.label} />
                </ListItem>
              </Link>
            )
          }
        </List>
      </Drawer>
    </AppBar>
  );
}

