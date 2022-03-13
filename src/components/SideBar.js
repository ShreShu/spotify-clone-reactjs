import React from "react";
import "./SideBar.css";
import SideBarOptions from "./SideBarOptions";
import HomeIcon from "@material-ui/icons/Home";
import Search from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { useDataLayerValue } from "../Context/DataLayer";

export const SideBar = () => {
  const [{ playlists }, dispatch] = useDataLayerValue();
  return (
    <div className="sidebar">
      <img
        className="sidebar_logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <SideBarOptions key="1" title="Home" Icon={HomeIcon} />
      <SideBarOptions key="2" title="Search" Icon={Search} />
      <SideBarOptions key="3" title="Library" Icon={LibraryMusicIcon} />
      <strong className="sidebar_title">PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map((playlist) => (
        <SideBarOptions key={playlist.id} title={playlist.name} />
      ))}
    </div>
  );
};
