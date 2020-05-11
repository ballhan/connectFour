import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Row from "../Row/Row";

import styles from "./Game.module.css";

const Game = ({
  name,
  roomFull,
  users,
  boardArray,
  firstPlayer,
  updateGame,
  restart,
  leave,
  move,
  winner,
}) => {
  //set player to yourself
  const [player, setPlayer] = useState();
  const [board, setBoard] = useState();
  const [firstPlay, setFirstPlay] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setPlayer(name);
  }, [name]);

  useEffect(() => {
    setBoard(boardArray);
  }, [boardArray]);

  useEffect(() => {
    setFirstPlay(firstPlayer);
  }, [firstPlayer]);

  //message
  useEffect(() => {
    if (!roomFull) {
      setMessage(`Waiting for opponent to join`);
    } else if (winner === "red" || winner === "blue") {
      setMessage(`Game over, ${winner} Wins`);
    } else if (
      (player === firstPlay && move === true) ||
      (player !== firstPlay && move === false)
    ) {
      setMessage(`You turn`);
    } else {
      setMessage(`Waiting for opponent's move`);
    }
  }, [player, firstPlay, move, roomFull, winner]);

  const play = (e, columnIndex, move, color, winner) => {
    if (winner === "blue" || winner === "red") {
      return;
    } else {
      updateGame(e, columnIndex, move, color, board);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.message}>{message}</div>
      <table className={styles.table}>
        <tbody className={styles.tableContainer}>
          {board
            ? board.map((row, i) => (
                <Row
                  key={i}
                  row={row}
                  play={play}
                  player={player}
                  firstPlayer={firstPlay}
                  move={move}
                  winner={winner}
                />
              ))
            : null}
        </tbody>
      </table>

      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              restart(e);
            }}
          >
            Restart
          </Button>
        </div>
        <div className={styles.button}>
          <Link to={`/`} className={styles.buttonText}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                leave();
              }}
            >
              Leave
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Game;
