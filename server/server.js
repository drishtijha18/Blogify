import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

await connectDB()

// Middlewares
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://your-app.vercel.app', // Replace with your actual Vercel URL after deployment
    process.env.CLIENT_URL // Optional: Add CLIENT_URL env variable in Render
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));
app.use(express.json())

// Routes
app.get('/', (req, res) => res.send("API is Working"))
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})

export default app;