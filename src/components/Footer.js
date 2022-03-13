import React, { useEffect } from "react";
import "./Footer.css";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import { Grid, Slider } from "@material-ui/core";
import { useDataLayerValue } from "../Context/DataLayer";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
export const Footer = ({ spotify }) => {
  const [{ token, item, playing }, dispatch] = useDataLayerValue();
  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      console.log(r);

      dispatch({
        type: "SET_PLAYING",
        playing: r.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        playing: r.item,
      });
    });
  }, [spotify]);

  const skipNext = () => {
    spotify.skipToNext();

    spotify.getMyCurrentPlaybackState().then((r) => {
      console.log(r);

      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });

      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
    });
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();

    spotify.getMyCurrentPlaybackState().then((r) => {
      console.log(r);

      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });

      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
    });
  };

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };
  return (
    <div className="footer">
      <div className="footer_left">
        <img
          src={item?.album.images[0].url}
          alt=""
          className="footer_albumlogo"
        />
        {item ? (
          <div className="footer_songInfo">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          <div className="footer_songInfo">
            <h4>No Song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>
      <div className="footer_center">
        <ShuffleIcon className="footer_green" />
        <SkipPreviousIcon onClick={skipNext} className="footer_icon" />
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
            className="footer_green"
            fontSize="large"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            className="footer_green"
            fontSize="large"
          />
        )}
        <SkipNextIcon onClick={skipPrevious} className="footer_icon" />
        <RepeatIcon className="footer_green" />
      </div>
      <div className="footer_right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
