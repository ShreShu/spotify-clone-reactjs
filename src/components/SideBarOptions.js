import React from "react";
import "./SideBarOption.css";

function SideBarOptions({ title, Icon }) {
  console.log("sidebar", title);
  return (
    <div className="sideBarOption">
      {Icon && <Icon className="SideBarOption__icon" />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  );
}

export default SideBarOptions;
