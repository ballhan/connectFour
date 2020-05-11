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
  const [roomFull, setRoomFull] = useState();
  const [users, setUsers] = useState();
  const [boardArray, setBoardArray] = useState();
  const [currentPlayer, setCurrentPlayer] = useState("");
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
    socket.on("gameData", ({ users, board, currentPlayer }) => {
      setUsers(users);
      setRoomFull(users.length === 2);
      setBoardArray(board);
      setCurrentPlayer(currentPlayer);
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
        currentPlayer={currentPlayer}
      />
    </div>
  );
};

export default Main;
