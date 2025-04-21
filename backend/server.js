//This code is working directly from running this file

import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;
const JWT_SECRET = "mySecretKey123";                                                  // in prod, use env var
let mongo_url = process.env.ATLAS_DBURL || 'mongodb://127.0.0.1:27017/usertest';

app.use(cors());
app.use(express.json());


// DB connection
main().then(() => console.log("Database is Connected")).catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongo_url);
}


// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model('User', userSchema);



// Routes
app.get('/', (req, res) => res.send('Hello World!'));

// Signup Route
// app.post('/api/signup', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'Email already in use' });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: 'User created successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.post('/api/signup', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: 'Email already in use' });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     // ✅ Generate JWT token
//     const token = jwt.sign(
//       { id: newUser._id, name: newUser.name, email: newUser.email },
//       'yourSecretKey', // 🔐 Replace with your environment secret!
//       { expiresIn: '1h' }
//     );

//     // ✅ Send back token and user info
//     res.status(201).json({
//       message: 'User created successfully',
//       token,
//       user: {
//         name: newUser.name,
//         email: newUser.email,
//       },
//     });
//   } catch (err) {
//     console.error('Signup error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // ✅ Generate JWT
    // const token = jwt.sign({ id: newUser._id }, 'your_jwt_secret', { expiresIn: '1d' });
    const token = jwt.sign({ id: newUser._id, name: newUser.name }, JWT_SECRET, { expiresIn: '1d' });


    // ✅ Return token + user info
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Signin Route with JWT
app.post('/api/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Create JWT token
    const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ success: true, token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected Route Example
app.get('/api/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome back, ${req.user.name}!` });
});

// JWT Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token missing' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

app.listen(port, () => console.log(`Server running on port ${port}`));
