// src/core/auth/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del header

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado.' });
    }

    try {
        // Verifica y decodifica el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Guarda el id del usuario en la solicitud
        next(); // Continua con el siguiente middleware o ruta
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Token no válido.' });
    }
};

module.exports = authMiddleware;