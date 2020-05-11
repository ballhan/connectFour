import React, { useState, useEffect } from "react";
import styles from "./Cell.module.css";

const Cell = ({ color, columnIndex, play, player, firstPlayer, move }) => {
  const [active, setActive] = useState();
  const [playerColor, setPlayerColor] = useState();

  useEffect(() => {
    if (player === firstPlayer && move === true) {
      setPlayerColor("blue");
      setActive(true);
    } else {
      setPlayerColor("red");
      setActive(false);
    }
  }, [move]);

  return (
    <td>
      <div
        className={styles.cell}
        onClick={(e) =>
          !active ? e.preventDefault() : play(e, columnIndex, move, playerColor)
        }
      >
        <div className={styles.circle} style={{ backgroundColor: color }}></div>
      </div>
    </td>
  );
};

export default Cell;
