import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongo_url = process.env.ATLAS_DBURL || 'mongodb://127.0.0.1:27017/usertest';
    await mongoose.connect(mongo_url);
    console.log('Database is Connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

export default connectDB;
