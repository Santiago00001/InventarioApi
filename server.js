require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/db');

const userRoutes = require('./src/routes/userRoutes');
const productsRoutes = require('./src/routes/productsRoutes');
const providersRoutes = require('./src/routes/providersRoutes');
const agencysRoutes = require('./src/routes/agencyRoutes');
const authRoutes = require('./src/core/auth/authRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');

// Crear la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/users', userRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/providers', providersRoutes);
app.use('/api/agencys', agencysRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API está en funcionamiento.');
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Algo salió mal en el servidor!',
        error: process.env.NODE_ENV === 'production' ? {} : err.stack
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});