import { useEffect, useState } from "react";
import "./App.css";
import { Login } from "./components/Login";
import { Player } from "./components/Player";
import { getTokenFromUrl } from "./components/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./Context/DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  //state can be refered as short term memory ,if we refresh the page data will be gone
  // const [token, setToken] = useState(null);

  const [{ user, token }, dispatch] = useDataLayerValue();

  //Run code based on a given condition and it always runs a function
  useEffect(() => {
    const hash = getTokenFromUrl();
    //as the name may clash with state ,we can use _token instead of token
    const _token = hash.access_token;
    window.location.hash = ""; //remove access token from url

    if (_token) {
      //setToken(_token);
      //setting the token
      //instead of setting token for here APp.js only using state, we
      //dispatched it to context API,stored there and now we can use it globally
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.setAccessToken(_token);

      //getting user
      spotify
        .getMe()
        .then((user) => {
          dispatch({
            type: "SET_USER",
            user: user,
          });
        })
        .catch((error) => {
          console.log(error);
        });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLIST",
          playlists: playlists,
        });
      });

      spotify.getPlaylist("37i9dQZF1DWY1kDGbdPb81").then((response) => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        });
      });
    }
  }, []);

  console.log("user->", user);
  console.log("token->", token);
  return (
    <div className="App">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
