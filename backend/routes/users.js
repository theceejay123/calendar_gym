const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post(async (req, res) => {
  const newUser = new User(req.body);

  try {
    await newUser.save();
    res.status(201).send({ newUser });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.route("/login").post();

module.exports = router;
