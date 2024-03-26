import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  profilePicture: String,
  token: String,
});
export default model("User", userSchema);
