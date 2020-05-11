import React, { useState, useEffect } from "react";
import styles from "./Cell.module.css";

const Cell = ({
  color,
  columnIndex,
  play,
  player,
  firstPlayer,
  move,
  winner,
}) => {
  const [active, setActive] = useState();
  const [playerColor, setPlayerColor] = useState();

  useEffect(() => {
    if (player === firstPlayer && move === true) {
      setPlayerColor("blue");
      setActive(true);
    } else if (player === firstPlayer && move === false) {
      setPlayerColor("blue");
      setActive(false);
    } else if (player !== firstPlayer && move === false) {
      setPlayerColor("red");
      setActive(true);
    } else if (player !== firstPlayer && move === true) {
      setPlayerColor("red");
      setActive(false);
    }
  }, [move]);

  return (
    <td>
      <div
        className={styles.cell}
        onClick={(e) =>
          !active
            ? e.preventDefault()
            : play(e, columnIndex, move, playerColor, winner)
        }
      >
        <div className={styles.circle} style={{ backgroundColor: color }}></div>
      </div>
    </td>
  );
};

export default Cell;
