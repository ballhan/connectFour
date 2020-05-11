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

const { initBoard, updateBoard, updateMove, checkWin } = require("./game");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user, roomObject } = addUser({ id: socket.id, name, room });
    const board = initBoard();

    if (error) return callback(error);

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    io.to(user.room).emit("gameData", {
      board: board,
      firstPlayer: roomObject.firstPlayer,
      move: true,
    });

    callback();
  });

  socket.on("updateGame", (columnIndex, move, color, board) => {
    console.log(columnIndex, move, color, board);
    const user = getUser(socket.id);
    var updatedBoard = updateBoard(board, columnIndex, color);
    var updatedMove = updateMove(move);
    var winner = checkWin(board);

    io.to(user.room).emit("updatedGame", {
      board: updatedBoard,
      move: updatedMove,
      winner: winner,
    });
  });

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
