const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const { Worker } = require('worker_threads');
require('dotenv').config();
const sequelize = require('./config/database');
require('./config/associations');

const authRoutes = require('./routes/auth');
const tokenRoutes = require('./routes/token');
const otpRoutes = require('./routes/otp');
const userRoutes = require('./routes/user');
const locationRoutes = require('./routes/location');
const orderRoutes = require('./routes/order');

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(express.json());
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

sequelize.sync({ force: true, alter: true }).then(() => {
    server.listen(process.env.PORT, () => {
        console.log('Server running on port 3000');

        const trendyolWorker = new Worker('./services/trendyol/trendyolWorker.js');
        const getirWorker = new Worker('./services/getir/getirWorker.js');

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