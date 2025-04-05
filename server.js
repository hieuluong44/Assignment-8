import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoutes from "./routers/userRoutes.js";
import borrowRoutes from "./routers/borrowingRoutes.js";
import bookRoutes from './routers/bookRoutes.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', borrowRoutes);
app.use('/api', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
