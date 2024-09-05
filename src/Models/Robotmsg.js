import { Schema as MongooseSchema, model } from 'mongoose'; 

const robotmsgSchema = new MongooseSchema({ 
  robotId: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  camera_image1: { type: String, required: true },
  camera_image2: { type: String, required: true },
  camera_image3: { type: String, required: true },
  camera_image4: { type: String, required: true },
  map_image: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Robotmsg = model('Robotmsg', robotmsgSchema); 

export default Robotmsg;
