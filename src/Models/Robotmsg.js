import { Schema as MongooseSchema, model } from 'mongoose'; 

const robotmsgSchema = new MongooseSchema({ // Use a different variable name
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Robotmsg = model('Robotmsg', robotmsgSchema); // Pass the correctly named schema

export default Robotmsg;
