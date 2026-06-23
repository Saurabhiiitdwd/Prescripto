import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

const app=express();
const PORT= process.env.PORT || 4000
connectDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors())

//api endpoints
app.get('/', (req, res)=>{
  res.send('API Working')
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});