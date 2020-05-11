const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const {
  addUser,
  removeUser,
  removeRoom,
  getUser,
  getUsersInRoom,
} = require("./users");

const { checkWin, togglePlayer } = require("./game");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user, roomObject } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit("gameData", {
      room: user.room,
      users: getUsersInRoom(user.room),
      board: roomObject.board,
      currentPlayer: roomObject.currentPlayer,
    });

    callback();
  });

  socket.on(
    "sendData",
    (board, currentPlayer, player, opponent, winner, callback) => {
      var board = board;
      var currentPlayer = togglePlayer(currentPlayer, player, opponent);
      var winner = checkWin(board);

      io.to(user.room).emit("sendData", {
        board: board,
        currentPlayer: currentPlayer,
        winner: winner,
      });

      callback();
    }
  );

  socket.on("disconnect", () => {
    const room = getUser(socket.id).room;
    //remove room first then user
    removeRoom(socket.id, room);
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on ${PORT}`));
