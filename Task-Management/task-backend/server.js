const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const config = require('./config/config.js');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        logging: console.log, // Enable SQL logging for debugging
    }
);

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

sequelize
    .authenticate()
    .then(() => {
        console.log('Database connected successfully');
        return sequelize.sync({ alter: true }); // Sync models with database
    })
    .then(() => {
        console.log('Database synced');
        app.listen(5000, () => {
            console.log('Server running on port 5000');
        });
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });

module.exports = { sequelize };
