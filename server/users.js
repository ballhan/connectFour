const users = [];
//array of roomObject to check if room is full
const rooms = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  var color;
  var turn;
  var roomObject = { roomName: room, roomUser: 1 };

  const roomFull = rooms.find(
    (room) => room.roomName === roomObject.roomName && room.roomUser == 2
  );

  //if room is not full find the index to change usernumber
  const roomIndex = rooms.findIndex(
    (room) => room.roomName === roomObject.roomName
  );

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (existingUser) {
    return { error: "Username is taken" };
  }

  if (roomFull) {
    return { error: "Room is full" };
  } else if (roomIndex !== -1) {
    color = "blue";
    turn = false;
    rooms[roomIndex].roomUser = 2;
  } else {
    color = "red";
    turn = true;
    rooms.push(roomObject);
  }

  const user = { id, name, room, color, turn };

  users.push(user);

  return { user };
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
    if (rooms[roomIndex].roomUser === 1) {
      return rooms.splice(roomIndex, 1)[0];
    } else {
      rooms[roomIndex].roomUser = 1;
      otherUserIndex = users.findIndex(
        (user) => user.room === room && user.id !== id
      );
      users[otherUserIndex].color = "red";
    }
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, removeRoom, getUser, getUsersInRoom };
