// src/controllers/userController.js

const User = require('../models/User'); // Asegúrate de que esta ruta sea correcta
const bcrypt = require('bcrypt'); // Make sure to import bcrypt at the top

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('agencia');
        const visibleUsers = users.filter(u => u.visible !== 0); // Solo obtener usuarios visibles
        res.status(200).json(visibleUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener usuarios." });
    }
};

const createUser = async (req, res) => {
    const { nombres, apellidos, cc, cargo, correo, agencia, rol, verificacion, status } = req.body;

    if (!nombres || !apellidos || !cc) {
        return res.status(400).json({ message: "Nombres, apellidos y CC son requeridos." });
    }

    try {
        // Contraseña por defecto
        const defaultPassword = "coopserp2024";
        const hashedPassword = await bcrypt.hash(defaultPassword, 10); // Hashea la contraseña por defecto

        const existingUser = await User.findOne({ cc });

        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe." });
        }

        // Obtener el último valor de "item" en la colección
        const lastUser = await User.findOne().sort({ item: -1 });
        const nextItem = lastUser ? lastUser.item + 1 : 1;

        // Crear un nuevo usuario con la contraseña hasheada
        const newUser = new User({
            item: nextItem,
            nombres,
            apellidos,
            cc,
            cargo,
            correo,
            agencia,
            rol,
            verificacion: verificacion || false,
            status: status || "activo",
            visible: 1,
            password: hashedPassword // Guardar la contraseña hasheada
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el usuario." });
    }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el usuario." });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const { nombres, apellidos, cc, cargo, correo, agencia, rol, verificacion, status } = req.body;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        if (cc) {
            const existingUser = await User.findOne({ cc, _id: { $ne: id } }); // Busca otro usuario con la misma cc pero diferente ID
            if (existingUser) {
                return res.status(400).json({ message: "El número de cédula ya está registrado en otro usuario." });
            }
        }

        // Actualizamos los campos del usuario
        user.nombres = nombres || user.nombres;
        user.apellidos = apellidos || user.apellidos;
        user.cc = cc || user.cc;
        user.cargo = cargo || user.cargo;
        user.correo = correo || user.correo;
        user.rol = rol || user.rol;
        user.verificacion = verificacion !== undefined ? verificacion : user.verificacion;
        user.status = status || user.status;

        // Actualizamos la agencia si es necesario
        if (agencia && agencia._id) {
            user.agencia = agencia._id; // Solo guardamos el ObjectId de la agencia
        }

        // Guardar los cambios
        await user.save();

        // Poblamos la agencia para devolver el objeto completo
        const updatedUser = await User.findById(id).populate('agencia');

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el usuario." });
    }
};

// Eliminar un usuario (ocultar)
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Cambiar el estado de 'visible'
        user.visible = 0;

        await user.save();
        res.status(200).json({ message: "Usuario ocultado correctamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el usuario." });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};