const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const { Worker } = require('worker_threads');

const sequelize = require('./config/database');
require('./config/associations');

const authRoutes = require('./routes/authRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const otpRoutes = require('./routes/otpRoutes');
const userRoutes = require('./routes/userRoutes');
const locationRoutes = require('./routes/locationRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

const corsOptions = {
    origin: 'http://example.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

//app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/token', tokenRoutes);
app.use('/api/v1/otp', otpRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/location', locationRoutes);
app.use('/api/v1/order', orderRoutes);

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('locationUpdate', (data) => {
        io.emit('locationUpdate', data);
    });
});

sequelize.sync({ force: false, alter: true }).then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);

        const trendyolWorker = new Worker('./services/marketplace/trendyol/trendyolWorker.js');
        const getirWorker = new Worker('./services/marketplace/getir/getirWorker.js');

        trendyolWorker.on('error', (error) => {
            console.error('Trendyol Worker Error:', error);
        });

        getirWorker.on('error', (error) => {
            console.error('Getir Worker Error:', error);
        });

        process.on('SIGINT', () => {
            trendyolWorker.postMessage('stop');
            getirWorker.postMessage('stop');
            server.close(() => {
                console.log('Server shut down');
                process.exit(0);
            });
        });
    });
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});