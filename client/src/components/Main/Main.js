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
  const [color, setColor] = useState("");
  const [roomFull, setRoomFull] = useState();
  const [users, setUsers] = useState();
  const [boardArray, setBoardArray] = useState();
  const [firstPlayer, setFirstPlayer] = useState("");
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
    socket.on("userData", ({ color }) => {
      setColor(color);
    });
  }, []);

  useEffect(() => {
    socket.on("roomData", ({ color, users }) => {
      setColor(color);
      setUsers(users);
      setRoomFull(users.length === 2);
    });
  }, []);

  useEffect(() => {
    socket.on("gameData", ({ board, firstPlayer }) => {
      setBoardArray(board);
      setFirstPlayer(firstPlayer);
    });
  }, []);

  const updateGame = (event, firstPlay) => {
    event.preventDefault();

    socket.emit("updateGame", firstPlay);

    socket.on("updatedGame", ({ firstPlay }) => {
      console.log("client", firstPlay);
    });
  };

  return (
    <div className={styles.container}>
      <InfoContainer room={room} users={users} />
      <Game
        name={name}
        color={color}
        roomFull={roomFull}
        users={users}
        boardArray={boardArray}
        firstPlayer={firstPlayer}
        updateGame={updateGame}
      />
    </div>
  );
};

export default Main;
