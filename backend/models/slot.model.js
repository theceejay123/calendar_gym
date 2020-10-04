const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slotSchema = new Schema(
  {
    timeslot: { type: Date, required: true },
    name: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Slot = mongoose.model("Slot", slotSchema);

module.exports = Slot;
