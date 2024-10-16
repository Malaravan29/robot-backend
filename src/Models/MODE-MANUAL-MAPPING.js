import { Schema, model } from "mongoose";//mode manual mapping
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

const historySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  mode: { type: String, required: true },
  map_image: { type: Buffer, required: true },
  map_name: { type: String, required: true },
  timeTaken: { type: String, required: true },
  percentageCompleted: { type: Number, required: true },
  status: { type: String, required: true },
  linear_velocity: [vectorSchema],
  angular_velocity: [vectorSchema],
  position: [vectorSchema],
  orientation: [orientationSchema],
  date: { type: Date, default: Date.now },
},{
  timestamps: true,
});

const History = model("mode_manual_mapping", historySchema);
export default History;