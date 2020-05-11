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
}) => {
  //set player to yourself
  const [player, setPlayer] = useState();
  const [board, setBoard] = useState();
  const [opponent, setOpponent] = useState("");
  const [firstPlay, setFirstPlay] = useState();
  const [move, setMove] = useState("");
  const [message, setMessage] = useState("");
  const [winner, setWinner] = useState("");

  useEffect(() => {
    setPlayer(name);
  }, [name]);

  useEffect(() => {
    setBoard(boardArray);
  }, [boardArray]);

  useEffect(() => {
    setFirstPlay(firstPlayer);
  }, [firstPlayer]);

  //if roomfull, setup opponent name, status change if roomFull change
  useEffect(() => {
    if (roomFull) {
      setOpponent(users.filter((user) => user.name !== name)[0].name);
    }
  }, [roomFull]);

  //if you are current play, you are able to make move
  useEffect(() => {
    if (player === firstPlay) {
      setMove(true);
    } else {
      setMove(false);
    }
  }, []);

  //message
  useEffect(() => {
    if (!roomFull) {
      setMessage(`Waiting for opponent to join`);
    } else if (move === true) {
      setMessage(`My turn`);
    } else {
      setMessage(`Waiting for opponent to move`);
    }
  }, [roomFull]);

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

  console.log(
    "me:",
    player,
    "roomfull:",
    roomFull,
    "opponent:",
    opponent,
    "firstplay:",
    firstPlay,
    "move",
    move,
    "board",
    board
  );

  const play = (c) => {
    if (winner !== "") {
      // Place piece on board
      var board = board;
      for (let r = 5; r >= 0; r--) {
        if (!board[r][c]) {
          board[r][c] = player;
          break;
        }
      }

      // sendData();

      // // Check status of board
      // let result = checkAll(board);
      // if (result === player) {
      //   setBoard(board);
      //   setGameOver(true);
      //   setMessage(`${player} WINS`);
      // } else if (result === opponent) {
      //   setBoard(board);
      //   setGameOver(true);
      //   setMessage(`${opponent} WINS`);
      // } else if (result === "draw") {
      //   setBoard(board);
      //   setGameOver(true);
      //   setMessage("Draw");
      // } else {
      //   setBoard(board);
      //   setCurrentPlayer(togglePlayer());
      // }
    } else {
      setMessage("Game over. Please start a new game.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.message}>{message}</div>
      <table>
        {/* <tbody className={styles.tableContainer}>
          {board.map((row, i) => (
            <Row key={i} row={row} move={move} />
          ))}
        </tbody> */}
      </table>

      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              updateGame(event, firstPlay);
            }}
          >
            update
          </Button>
        </div>
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
