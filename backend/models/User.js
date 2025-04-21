import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: { 
    type: String, 
    unique: true, 
    required: true,
    lowercase: true 
  },
  password: {
    type: String,
    required: function () {
      return !this.isGoogleUser;
    }
  },
  image: String,
  isGoogleUser: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
