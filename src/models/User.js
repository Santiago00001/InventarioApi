// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    item: {
        type: Number,
        required: true,
    },
    nombres: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },
    cc: {
        type: String,
        required: true,
    },
    cargo: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        enum: ['Admin', 'Agencia', 'Coordinacion', 'Jefatura', 'Almacenista'], // Enum para los roles
        default: 'User',
    },
    agencia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'agencys',
    },
    verificacion: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: 'activo',
    },
    password: { 
        type: String,
        required: false,
    },
    visible: {
        type: Number,
        default: 1,
    },
}, {
    timestamps: true,
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);