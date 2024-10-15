const express = require('express');
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    updateUserStatus,
    deleteUser,
} = require('../controllers/userController');

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', getAllUsers);

// Ruta para crear un nuevo usuario
router.post('/', createUser);

// Ruta para obtener un usuario por ID
router.get('/:id', getUserById);

// Ruta para actualizar un usuario
router.put('/:id', updateUser);
router.put('/:id/status', updateUserStatus);

// Ruta para eliminar un usuario
router.delete('/:id', deleteUser);

module.exports = router;