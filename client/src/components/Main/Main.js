import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import InfoContainer from "../InfoContainer/InfoContainer";
import Game from "../Game/Game";

import styles from "./Main.module.css";

let socket;

const Main = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [move, setMove] = useState();
  const [roomFull, setRoomFull] = useState();
  const [users, setUsers] = useState();
  const [boardArray, setBoardArray] = useState();
  const [firstPlayer, setFirstPlayer] = useState("");
  const [winner, setWinner] = useState("");
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("roomData", ({ users }) => {
      setUsers(users);
      setRoomFull(users.length === 2);
    });
  }, []);

  useEffect(() => {
    socket.on("gameData", ({ board, firstPlayer, move }) => {
      setBoardArray(board);
      setFirstPlayer(firstPlayer);
      setMove(move);
    });
  }, []);

  const updateGame = (event, columnIndex, move, color, board) => {
    event.preventDefault();

    socket.emit("updateGame", columnIndex, move, color, board);
  };

  const restart = (event) => {
    event.preventDefault();
  };

  const leave = () => {
    socket.emit("leaveRoom");
  };

  useEffect(() => {
    socket.on("updatedGame", ({ board, move, winner }) => {
      setBoardArray(board);
      setMove(move);
      setWinner(winner);
    });
  }, []);

  return (
    <div className={styles.container}>
      <InfoContainer room={room} users={users} />
      <Game
        name={name}
        roomFull={roomFull}
        users={users}
        boardArray={boardArray}
        firstPlayer={firstPlayer}
        updateGame={updateGame}
        restart={restart}
        leave={leave}
        move={move}
        winner={winner}
      />
    </div>
  );
};

export default Main;
