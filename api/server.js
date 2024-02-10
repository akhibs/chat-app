const app = require("./app");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/chat").then(() => {
  console.log("DATABASE connected");
});

//=====================================================
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
