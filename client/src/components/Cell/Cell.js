import React from "react";
import styles from "./Cell.module.css";

const Cell = ({ value, columnIndex, play, move }) => {
  return (
    <td>
      <div
        className={styles.cell}
        onClick={(e) => (!move ? e.preventDefault() : play(columnIndex))}
      >
        <div className={value === 1 ? styles.red : styles.white}></div>
      </div>
    </td>
  );
};

export default Cell;
