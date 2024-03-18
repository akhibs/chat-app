const app = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect(
    `${
      process.env.MODE === "DEVELOPMENT" ? "mongodb://localhost:27017/chat" : ""
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
