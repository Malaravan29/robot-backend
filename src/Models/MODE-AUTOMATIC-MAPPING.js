import mongoose from "mongoose";
//mode automatic mapping
const Schema = mongoose.Schema;
const vectorSchema = new Schema(
  {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    z: { type: Number, required: true },
  },
  { _id: false }
);

const orientationSchema = new Schema(
  {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    z: { type: Number, required: true },
    w: { type: Number, required: true },
  },
  { _id: false }
);

const startMappingDataSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    mode: { type: String, required: true },
    linear_velocity: [vectorSchema],
    angular_velocity: [vectorSchema],
    current_position: [vectorSchema],
    current_orientation: [orientationSchema],
    map_image: { type: Buffer, required: true },
    map_name: { type: String, required: true },
    completion_command: { type: String, required: true },
    feedback: { type: String, required: true },
    timeTaken: { type: String, required: true },
    percentageCompleted: { type: Number, required: true },
    status: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const StartMappingData = mongoose.model(
  "mode_automatic_mapping",
  startMappingDataSchema
);
export default StartMappingData;