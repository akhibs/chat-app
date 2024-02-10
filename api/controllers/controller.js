const Model = require("./../models/model");

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  const sameUser = await Model.find({ username: username });

  let status;

  if (sameUser.length === 0) {
    status = "okay";
    const newUser = new Model({ username: username, password: password });
    await newUser.save();
  } else {
    status = "sameUser";
  }

  res.status(200).json({
    status,
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await Model.find({
    $and: [{ username: username }, { password: password }],
  });
  let status;
  if (user.length > 0) {
    status = "correct";
  } else {
    status = "incorrectUser";
  }

  res.status(200).json({
    status,
  });
};
