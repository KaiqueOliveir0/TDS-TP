import axios from "axios";
import {useHistory} from "react-router-dom";
import config from "../config.json";


export const GetToken = (p_Code, p_OnSucess, p_OnFail) => {
  axios.get('/auth/get-token?code=' + p_Code)
    .then(p_Response => {
      let v_ValidUntil = new Date();
      v_ValidUntil.setSeconds(v_ValidUntil.getSeconds() + p_Response.data['expires_in']);
      const v_SpotifyAuth = {
        access_token: p_Response.data['access_token'],
        refresh_token: p_Response.data['refresh_token'],
        valid_until: v_ValidUntil.getTime()
      }

      localStorage.setItem('spotify_auth', JSON.stringify(v_SpotifyAuth));
      if (p_OnSucess) p_OnSucess();
    })
    .catch(() =>
      p_OnFail && p_OnFail()
    );
}

export const RefreshToken = () => {
  Logout();
  // const v_History = useHistory();
  const v_PreviousPathname = window.location.pathname;
  localStorage.setItem('previous_pathname', v_PreviousPathname);
  const v_RefreshUrl =
    "https://accounts.spotify.com/authorize?show_dialog=false" +
    "&client_id=" + config.Spotify.ClientId +
    "&response_type=code" +
    "&redirect_uri=" + config.Spotify.RedirectUri +
    "&scope=" + config.Spotify.Scopes
  ;

  window.location.replace(v_RefreshUrl);
  
  // axios.get('/auth/refresh-token?code=' + p_Code)
  //   .then(p_Response => {
  //     let v_ValidUntil = new Date();
  //     v_ValidUntil.setSeconds(v_ValidUntil.getSeconds() + p_Response.data['expires_in']);
  //     const v_SpotifyAuth = {
  //       access_token: p_Response.data['access_token'],
  //       refresh_token: p_Response.data['refresh_token'],
  //       valid_until: v_ValidUntil.getTime()
  //     }
  //
  //     localStorage.setItem('spotify_auth', JSON.stringify(v_SpotifyAuth));
  //     if (p_OnSucess) p_OnSucess();
  //   })
  //   .catch(() => 
  //     p_OnFail && p_OnFail()
  //   );
}

export const Logout = () => {
  localStorage.removeItem('spotify_auth');
}

export const GetAuthData = () => {
  const v_AuthData = localStorage.getItem('spotify_auth');
  if (v_AuthData) return JSON.parse(v_AuthData);
  else return null;
}

export const GetPreviousPathname = () => {
  const v_PreviousPathname = localStorage.getItem('previous_pathname');
  localStorage.removeItem('previous_pathname');
  if (v_PreviousPathname) return v_PreviousPathname;
  else return null;
}

export const IsAuthValid = (p_AuthData) => {
  const v_ValidUntil = new Date(p_AuthData['valid_until']);
  return v_ValidUntil >= new Date();
}

export const Token = () => {
  let v_AuthData = GetAuthData();
  return v_AuthData ? v_AuthData.access_token : null;
}