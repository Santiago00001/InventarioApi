const express = require('express');
const {
    getAllProviders,
    createProvider,
    getProviderById,
    updateProvider,
    deleteProvider
} = require('../controllers/providersController'); // Asegúrate de que este controlador exista y esté implementado

const router = express.Router();

// Ruta para obtener todos los proveedores
router.get('/', getAllProviders);

// Ruta para crear un nuevo proveedor
router.post('/', createProvider);

// Ruta para obtener un proveedor por ID
router.get('/:id', getProviderById);

// Ruta para actualizar un proveedor
router.put('/:id', updateProvider);

// Ruta para eliminar un proveedor
router.delete('/:id', deleteProvider);

module.exports = router;
