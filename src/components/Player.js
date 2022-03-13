import React from "react";
import { Body } from "./Body";
import { SideBar } from "./SideBar";
import "./Player.css";
import { Footer } from "./Footer";
export const Player = ({ spotify }) => {
  return (
    <div className="player">
      <div className="player_body">
        {/* sidebar */}
        <SideBar />
        {/* body */}
        <Body spotify={spotify} />
      </div>

      {/* footer */}
      <Footer spotify={spotify} />
    </div>
  );
};
