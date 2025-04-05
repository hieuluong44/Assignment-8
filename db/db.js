import pkg from 'pg';  
import dotenv from 'dotenv'; 
dotenv.config(); // Load variables from .env file

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST, 
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,    
  user: process.env.DB_USER,           
  password: process.env.DB_PASSWORD,  
});

// Kiểm tra kết nối
pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Error connecting to PostgreSQL', err));

export default pool;
