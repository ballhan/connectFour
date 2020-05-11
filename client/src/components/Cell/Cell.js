import React from "react";
import styles from "./Cell.module.css";

const Cell = ({ color, columnIndex, play, move }) => {
  const fillColor = (color) => {
    if (color === null) {
      return "styles.white";
    } else if (color === "red") {
      return "styles.red";
    } else return "styles.blue";
    console.log("color, ", color);
  };

  return (
    <td>
      <div
        className={styles.cell}
        onClick={(e) => (!move ? e.preventDefault() : play(columnIndex))}
      >
        <div className={styles.white}></div>
      </div>
    </td>
  );
};

export default Cell;
