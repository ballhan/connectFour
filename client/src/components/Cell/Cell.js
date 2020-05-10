import React from "react";
import styles from "./Cell.module.css";

const Cell = ({ value, columnIndex, play }) => {
  return (
    <td>
      <div
        className={styles.cell}
        onClick={() => {
          play(columnIndex);
        }}
      >
        <div className={value == 1 ? styles.red : styles.white}></div>
      </div>
    </td>
  );
};

export default Cell;
