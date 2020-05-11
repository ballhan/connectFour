import React, { useState, useEffect } from "react";
import styles from "./Cell.module.css";

const Cell = ({ color, columnIndex, play, player, firstPlayer, move }) => {
  const [active, setActive] = useState();

  useEffect(() => {
    if (player === firstPlayer && move === true) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [move]);

  return (
    <td>
      <div
        className={styles.cell}
        onClick={(e) => (!active ? e.preventDefault() : play(columnIndex))}
      >
        <div className={`styles.${color}`}></div>
      </div>
    </td>
  );
};

export default Cell;
