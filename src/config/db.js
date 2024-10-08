require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Conexión a la base de datos usando la URI de MongoDB
    const conn = await mongoose.connect(process.env.MONGO_DB_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Salir de la aplicación en caso de fallo
  }
};

module.exports = connectDB;