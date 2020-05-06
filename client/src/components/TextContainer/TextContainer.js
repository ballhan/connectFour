import React from "react";

import "./TextContainer.css";

const TextContainer = ({ users }) => (
  <div className="textContainer">
    {users ? (
      <div className="userContainer">
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

export default TextContainer;
