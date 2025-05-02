const app = require('./app');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary');
const PORT = process.env.PORT || 3099;
const { getData } = require('../backend/middlewares/validator/errorHandler');

// UncaughtException Error
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});

const configData = getData()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME || configData.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY || configData.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET || configData.CLOUDINARY_API_SECRET,
});

const server = app.listen(PORT, () => {
    console.log(`Server running`)
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
});
