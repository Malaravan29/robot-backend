import { Schema, model } from "mongoose";

const vectorSchema = new Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  z: { type: Number, required: true },
}, { _id: false });

const orientationSchema = new Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  z: { type: Number, required: true },
  w: { type: Number, required: true },
}, { _id: false });

const historySchema = new Schema({
  robotName: { type: String, required: true },
  date: { type: Date, default: Date.now },
  mapName: { type: String, required: true },
  image: { type: String, required: true },
  timeTaken: { type: Number, required: true },
  percentCompleted: { type: Number, required: true },
  status: { type: String, required: true },
  linearVelocities: [vectorSchema], // Linear velocities stored as a separate list
  angularVelocities: [vectorSchema], // Angular velocities stored as a separate list
  positions: [vectorSchema], // Positions stored as a separate list
  orientations: [orientationSchema], // Orientations stored as a separate list
});

const Manual = model("manual", historySchema);
export default Manual;