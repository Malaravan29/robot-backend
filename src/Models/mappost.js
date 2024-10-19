import { Schema, model } from "mongoose";

const dataSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  
  emailId:{type:String ,required:true},
  robotId:{type:String,required:true},
  map_image: { type: Buffer, required: true },
  map_name: { type: String, required: true },

  date: { type: Date, default: Date.now },
},{
  timestamps: true,
});

const noMode = model("map_data_add", dataSchema);
export default noMode;