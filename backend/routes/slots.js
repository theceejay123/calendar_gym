const router = require("express").Router();
let Slot = require("../models/slot.model");

router.route("/").get((req, res) => {
  Slot.find()
    .then((calendars) => res.json(calendars))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const timeslot = Date.parse(req.body.timeslot);

  const newCalendar = new Slot({
    timeslot,
    name,
    description,
  });

  newCalendar
    .save()
    .then(() => res.json("Slot has beed added."))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").delete((req, res) => {
  Slot.findByIdAndDelete(req.params.id)
    .then(() => res.json("Slot has been deleted."))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
