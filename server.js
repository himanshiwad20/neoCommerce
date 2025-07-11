import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import cors from 'cors'

//configure env 
dotenv.config();

//database config
connectDB();

//REST object
const app = express()

//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//REST api
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Ecommerce app</h1>'
    )
})

//PORT
const PORT = process.env.PORT || 8080;

//run listen 
app.listen(PORT, () => {
    console.log(`server running on Mode: ${process.env.DEV_MODE} on Port ${PORT}`.bgCyan.white);
});