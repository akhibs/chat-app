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

io.on("connection", async (socket) => {
  await socket.on("userDetails", async (username) => {
    userUsername = username;
    if (!usersOnline.includes(username) && username.length > 0) {
      usersOnline.push(username);

      console.log(usersOnline);
    }
    await socket.emit("usersOnline", usersOnline);
  });

  await socket.on("userOffline", async (username) => {
    if (usersOnline.includes(username)) {
      usersOnline.splice(usersOnline.indexOf(username), 1);
    }
    console.log(usersOnline);
  });

  await socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

//=====================================================
const port = process.env.PORT || 3002;
appServer.listen(port, () => {
  console.log(`socket running on port ${port}`);
  console.log("/////////////////////\n/////////////////////");
});

module.exports = io;
