const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');





const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

/* Health check route */
app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Resume AI API is running' });
});

/* register routes */
const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');

app.use('/api/interview', interviewRouter);
app.use('/api/auth', authRouter);


module.exports = app;