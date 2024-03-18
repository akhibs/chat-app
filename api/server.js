const app = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect(
    `${
      process.env.MODE === "DEVELOPMENT" ? "mongodb://localhost:27017/chat" : "mongodb+srv://akhibs:08164637953@chat-app.kkmy0yz.mongodb.net/?retryWrites=true&w=majority&appName=chat-app"
    }`
  )
  .then(() => {
    console.log("DATABASE connected");
  });

//=====================================================
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`api  is running on port ${port}`);
});
