import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import { userRouter } from './routers/userRouter.js';
import { postRouter } from './routers/postRouter.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api', userRouter);
app.use('/api', postRouter);

// Хранилище для файлов и изображений
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (__, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
// ================================
app.use('/uploads', express.static('uploads'));
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('Database was connected successfully'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server is up on port - ', PORT);
});
