// src/core/auth/authController.js
const User = require('../../models/User'); // Asegúrate de que esta ruta sea correcta
const jwt = require('jsonwebtoken');

// Función para iniciar sesión
const login = async (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({ message: 'Faltan credenciales.' });
    }

    try {
        // Busca el usuario por nombre de usuario
        const user = await User.findOne({ correo });
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado.' });
        }

        // Verifica la contraseña (suponiendo que usas bcrypt para hashear las contraseñas)
        const isMatch = await user.comparePassword(password); // Define este método en tu modelo User
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta.' });
        }

        // Genera un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

        // Envía el token como respuesta
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

module.exports = { login };