// src/routes/agencyRoutes.js

const express = require('express');
const {
    getAllAgencies,
    createAgency,
    getAgencyById,
    updateAgency,
    deleteAgency
} = require('../controllers/agencyController');

const router = express.Router();

// Ruta para obtener todas las agencias
router.get('/', getAllAgencies);

// Ruta para crear una nueva agencia
router.post('/', createAgency);

// Ruta para obtener una agencia por ID
router.get('/:id', getAgencyById);

// Ruta para actualizar una agencia
router.put('/:id', updateAgency);

// Ruta para eliminar (ocultar) una agencia
router.delete('/:id', deleteAgency);

module.exports = router;