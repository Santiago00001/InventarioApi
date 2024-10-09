// src/core/auth/authRoutes.js
const express = require('express');
const { login } = require('./authController'); // Asegúrate de que este import sea correcto
const router = express.Router();

router.post('/login', login); // Ruta para el login

module.exports = router;
