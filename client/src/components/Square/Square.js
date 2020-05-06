import React from "react";
import Brightness1Icon from "@material-ui/icons/Brightness1";

import styles from "./Square.module.css";

class Square extends React.Component {
  render() {
    return (
      <div className={styles.square}>
        <Brightness1Icon className={styles.colorIcon}></Brightness1Icon>
      </div>
    );
  }
}

export default Square;
