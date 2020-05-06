import React from "react";
import Brightness1Icon from "@material-ui/icons/Brightness1";

import "./Square.css";

class Square extends React.Component {
  render() {
    return (
      <div className="square">
        <Brightness1Icon className="colorIcon"></Brightness1Icon>
      </div>
    );
  }
}

export default Square;
