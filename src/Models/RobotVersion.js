import { Schema as MongooseSchema, model } from 'mongoose'; 

// Define the robot schema
const robotSchema = new MongooseSchema({
  emailId: {
    type: String,
    required: true,
    unique: true
  },
  version: {
    type: String,
    required: true,
  },
  manualMapping: {
    type: String,
    enum: ['enabled', 'disabled'],
    default: 'disabled',
  },
  objectDisinfection: {
    type: String,
    enum: ['enabled', 'disabled'],
    default: 'disabled',
  }
}, { timestamps: true });

// Create the model
const RobotVersion = model('RobotVersion', robotSchema);

export default RobotVersion;