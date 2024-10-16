import mongoose from "mongoose";//mdoe automatic disinfection mapping
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
const automatedDisinfectantDataSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    mode: { type: String, required: true },
    feedback: {type: String,required: true,},
    position: [vectorSchema],
    orientation: [orientationSchema],
    map_image: {type: Buffer,required: true,},
    object_image_name: {type: String,required: true,},
    object_feedback: {type: String, required: true,},
    timeTaken: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const AutomatedDisinfectantData = mongoose.model(
  "mode_Disinfection_mapping",
  automatedDisinfectantDataSchema
);

export default AutomatedDisinfectantData;