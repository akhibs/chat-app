const app = require("./app");
const { createServer } = require("http");

const { Server } = require("socket.io");

const appServer = createServer(app);

//=================SOCKET=======================
const io = new Server(appServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const usersOnline = [];
let userUsername;

io.on("connection", (socket) => {
  socket.on("userDetails", (username) => {
    userUsername = username;
    if (!usersOnline.includes(username) && username.length > 0) {
      usersOnline.push(username);
    }
    socket.emit("usersOnline", usersOnline);
  });

  socket.on("userOffline", (username) => {
    if (usersOnline.includes(username)) {
      usersOnline.splice(usersOnline.indexOf(username), 1);
    }
  });

  socket.on("newMessage", (message) => {
    socket.broadcast.emit(`${message.to}`, message);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

//=====================================================
const port = process.env.PORT || 3002;
appServer.listen(port, () => {
  console.log(`socket running on port ${port}`);
  console.log("//////////////////////\n/////////////////////");
});

module.exports = io;
