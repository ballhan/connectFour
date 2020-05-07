//array of user object
const users = [];
//array of room Object, Purpose: to check if room is full
const rooms = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  var color;
  var status;

  //init roomobject to update room status
  var roomObject = { roomName: room, roomUser: 1 };

  //check if user exist
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (existingUser) {
    return { error: "Username is taken" };
  }

  //check if room is full
  const roomFull = rooms.find(
    (room) => room.roomName === roomObject.roomName && room.roomUser == 2
  );

  if (roomFull) {
    return { error: "Room is full" };
  }

  //if room is not full, check if room already existed
  const roomIndex = rooms.findIndex(
    (room) => room.roomName === roomObject.roomName
  );

  //if room exist, update first player, second player, room user count, else create set up first player, create room
  if (roomIndex !== -1) {
    var firstPlayer = users.filter((user) => user.room === room)[0];
    firstPlayer.status = "Move";

    color = "blue";
    status = "Wait";

    rooms[roomIndex].roomUser = 2;
  } else {
    color = "red";
    status = "Waiting for second player to join";
    rooms.push(roomObject);
  }

  const user = { id, name, room, color, status };

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
    //if no other user is left
    if (rooms[roomIndex].roomUser === 1) {
      return rooms.splice(roomIndex, 1)[0];
    } else {
      rooms[roomIndex].roomUser = 1;
      otherUserIndex = users.findIndex(
        (user) => user.room === room && user.id !== id
      );
      users[otherUserIndex].color = "red";
      users[otherUserIndex].status = "Waiting for other player to join";
    }
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, removeRoom, getUser, getUsersInRoom };
