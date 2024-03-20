const express = require("express");
const controller = require("./controllers/controller");

const router = express.Router();

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.get("/active", controller.active);

router.all("*", (req, res) => {
  res.send("404 Page not Found");
});

module.exports = router;
