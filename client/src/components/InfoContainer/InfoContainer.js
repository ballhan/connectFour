import React from "react";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import "./InfoContainer.css";

const InfoContainer = ({ users }) => (
  <div>
    {users ? (
      <div className="userContainer">
        {users.map(({ name, color, turn }) => (
          <div key={(name, color, turn)} className="infoContainer">
            <div>{name}</div>
            <div>
              <Brightness1Icon
                className="colorIcon"
                style={{ color: color }}
              ></Brightness1Icon>
            </div>
          </div>
        ))}
      </div>
    ) : null}
  </div>
);

export default InfoContainer;
