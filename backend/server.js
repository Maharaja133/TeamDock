const express       = require('express');
const dotenv        = require('dotenv');
const mongoose      = require('mongoose');
const cookieParser  = require('cookie-parser');
const cors          = require('cors');
const path          = require('path');
const multer        = require('multer');

const authRoutes     = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const taskRoutes     = require('./routes/taskRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173',
  process.env.CLIENT_URL || ''
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      return allowedOrigins.includes(origin)
        ? cb(null, true)
        : cb(new Error('Not allowed by CORS'));
    },
    credentials: true
  })
);

app.get('/', (req, res) => res.send('API is running...'));

app.use('/api/auth',      authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/tasks',     taskRoutes);
app.use('/api/settings',  settingsRoutes);
app.use('/api/uploads',   express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.use((err, req, res, next) => {
  console.error('Global Error:', err.message);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: 'File upload error', error: err.message });
  }
  res.status(500).json({ message: 'Server error', error: err.message });
});
