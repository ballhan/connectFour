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
    } else if (
      (player === firstPlay && move === true) ||
      (player !== firstPlay && move === false)
    ) {
      setMessage(`My turn`);
    } else {
      setMessage(`Waiting for opponent to move`);
    }
  }, [player, firstPlay, move, roomFull]);

  const initBoard = () => {
    var boardArray = [];
    for (let r = 0; r < 6; r++) {
      let row = [];
      for (let c = 0; c < 7; c++) {
        row.push(null);
      }
      boardArray.push(row);
    }
    return boardArray;
  };

  const play = (e, columnIndex, move, color, winner) => {
    if (winner === "blue" || winner === "red") {
      setMessage(`Game over, ${winner} win`);
    } else {
      updateGame(e, columnIndex, move, color, board);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.message}>{message}</div>
      <table>
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
            onClick={() => {
              setBoard(initBoard());
            }}
          >
            Restart
          </Button>
        </div>
        <div className={styles.button}>
          <Link to={`/`} className={styles.buttonText}>
            <Button variant="contained" color="secondary">
              Leave
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Game;
