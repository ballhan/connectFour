//require initBoard to initBoard in roomObject
const { initBoard } = require("./game");

//array of user object
const users = [];
//array of room Object, containing roomname, roomuser, board, firstplayer
const rooms = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  var color;

  var board = initBoard();

  //init roomobject to update room status
  const roomObject = {
    roomName: room,
    roomUser: 1,
    board: board,
    firstPlayer: "",
  };

  //check if user exist
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (existingUser) {
    return { error: "Username is taken" };
  }

  //check if room exist and is full
  const roomFull = rooms.find(
    (room) => room.roomName === roomObject.roomName && room.roomUser == 2
  );

  if (roomFull) {
    return { error: "Room is full" };
  }

  //check if room already existed
  const roomIndex = rooms.findIndex(
    (room) => room.roomName === roomObject.roomName
  );

  //if room exist, user is second player, increase room user count, else create set up first player color, first player, create room
  if (roomIndex !== -1) {
    color = "blue";
    rooms[roomIndex].roomUser = 2;
  } else {
    color = "red";
    roomObject.firstPlayer = name;
    rooms.push(roomObject);
  }

  const user = { id, name, room, color };

  users.push(user);

  return { user, roomObject };
};

const removeUser = (id) => {
  const userIndex = users.findIndex((user) => user.id === id);

  //remove user from users
  if (userIndex !== -1) {
    return users.splice(userIndex, 1)[0];
  }
};

const removeRoom = (id, room) => {
  //remove user's room from rooms
  const roomIndex = rooms.findIndex((r) => r.roomName === room);
  var otherUserIndex;

  if (roomIndex !== -1) {
    //if no other user is left
    if (rooms[roomIndex].roomUser === 1) {
      return rooms.splice(roomIndex, 1)[0];
    } else {
      //update roomUser, color, firstPlayer
      rooms[roomIndex].roomUser = 1;

      otherUserIndex = users.findIndex(
        (user) => user.room === room && user.id !== id
      );
      users[otherUserIndex].color = "red";
      rooms[roomIndex].firstPlayer = users[otherUserIndex].name;
    }
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, removeRoom, getUser, getUsersInRoom };
