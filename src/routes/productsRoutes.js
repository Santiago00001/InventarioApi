const express = require('express');
const {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productsController');

const router = express.Router();

// Ruta para obtener todos los productos
router.get('/', getAllProducts);

// Ruta para crear un nuevo producto
router.post('/', createProduct);

// Ruta para obtener un producto por ID
router.get('/:id', getProductById);

// Ruta para actualizar un producto
router.put('/:id', updateProduct);

// Ruta para eliminar (ocultar) un producto
router.delete('/:id', deleteProduct);

module.exports = router;