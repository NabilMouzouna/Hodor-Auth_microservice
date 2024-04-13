import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: String,
  token: String
}, { timestamps: true }); 

export default model("User", userSchema);
