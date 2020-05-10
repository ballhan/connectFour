import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Row from "../Row/Row";

import styles from "./Game.module.css";
import io from "socket.io-client";

let socket;

const Game = ({ name, roomFull, users }) => {
  //init board
  var boardArray = [];
  for (let r = 0; r < 6; r++) {
    let row = [];
    for (let c = 0; c < 7; c++) {
      row.push(null);
    }
    boardArray.push(row);
  }

  const [board, setBoard] = useState(boardArray);

  //set player to yourself
  const [player, setPlayer] = useState(name);
  const [opponent, setOpponent] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [move, setMove] = useState("");
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

  //if roomfull, setup opponent name, status change if roomFull change
  useEffect(() => {
    if (roomFull) {
      setOpponent(users.filter((user) => user.name !== name)[0].name);
    }
  }, [roomFull]);

  //if room is not full, set currentplay to yourself, you are the first to join
  useEffect(() => {
    if (!roomFull) {
      setCurrentPlayer(player);
    } else {
      setCurrentPlayer(opponent);
    }
  }, [roomFull]);

  //if you are current play, you are able to make move
  useEffect(() => {
    if (player === currentPlayer) {
      setMove(true);
    } else {
      setMove(false);
    }
  }, [currentPlayer]);

  //message
  useEffect(() => {
    if (!roomFull) {
      setMessage(`Waiting for opponent to join`);
    } else if (currentPlayer === player) {
      setMessage(`My turn`);
    } else {
      setMessage(`Waiting for opponent to move`);
    }
  }, [roomFull]);

  console.log(
    "me:",
    player,
    "roomfull:",
    roomFull,
    "opponent:",
    opponent,
    "currentplay:",
    currentPlayer,
    "move",
    move
  );

  const play = (c) => {
    if (gameOver) {
      // Place piece on board
      var board = boardArray;
      for (let r = 5; r >= 0; r--) {
        if (!board[r][c]) {
          board[r][c] = currentPlayer;
          break;
        }
      }

      // Check status of board
      let result = checkAll(board);
      if (result === player) {
        setBoard(board);
        setGameOver(true);
        setMessage(`${player} WINS`);
      } else if (result === opponent) {
        setBoard(board);
        setGameOver(true);
        setMessage(`${opponent} WINS`);
      } else if (result === "draw") {
        setBoard(board);
        setGameOver(true);
        setMessage("Draw");
      } else {
        setBoard(board);
        setCurrentPlayer(togglePlayer());
      }
    } else {
      setMessage("Game over. Please start a new game.");
    }
  };

  const togglePlayer = () => {
    return currentPlayer === player ? opponent : player;
  };

  const checkVertical = (board) => {
    // Check only if row is 3 or greater
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c] &&
            board[r][c] === board[r - 2][c] &&
            board[r][c] === board[r - 3][c]
          ) {
            return board[r][c];
          }
        }
      }
    }
  };

  const checkHorizontal = (board) => {
    // Check only if column is 3 or less
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r][c + 1] &&
            board[r][c] === board[r][c + 2] &&
            board[r][c] === board[r][c + 3]
          ) {
            return board[r][c];
          }
        }
      }
    }
  };

  const checkDiagonalRight = (board) => {
    // Check only if row is 3 or greater AND column is 3 or less
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c + 1] &&
            board[r][c] === board[r - 2][c + 2] &&
            board[r][c] === board[r - 3][c + 3]
          ) {
            return board[r][c];
          }
        }
      }
    }
  };

  const checkDiagonalLeft = (board) => {
    // Check only if row is 3 or greater AND column is 3 or greater
    for (let r = 3; r < 6; r++) {
      for (let c = 3; c < 7; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c - 1] &&
            board[r][c] === board[r - 2][c - 2] &&
            board[r][c] === board[r - 3][c - 3]
          ) {
            return board[r][c];
          }
        }
      }
    }
  };

  const checkDraw = (board) => {
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        if (board[r][c] === null) {
          return null;
        }
      }
    }
    return "draw";
  };

  const checkAll = (board) => {
    return (
      checkVertical(board) ||
      checkDiagonalRight(board) ||
      checkDiagonalLeft(board) ||
      checkHorizontal(board) ||
      checkDraw(board)
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.message}>{message}</div>
      <table>
        <tbody className={styles.tableContainer}>
          {board.map((row, i) => (
            <Row key={i} row={row} move={move} />
          ))}
        </tbody>
      </table>

      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <Button variant="contained" color="primary" onClick={() => {}}>
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
