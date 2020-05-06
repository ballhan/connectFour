import React from "react";

import "./InfoContainer.css";

const InfoContainer = ({ users }) => (
  <div className="container">
    {users ? (
      <div>
        <h2>
          {users.map(({ name, color, turn }) => (
            <div>
              <div key={(name, color, turn)}>
                {name}
                {color}
              </div>
            </div>
          ))}
        </h2>
      </div>
    ) : null}
  </div>
);

export default InfoContainer;
