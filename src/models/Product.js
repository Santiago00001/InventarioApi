// src/models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    cta_cont: {
        type: String,
        required: false,
    },
    codigo: {
        type: String,
        required: true,
        unique: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    grupo_desc: {
        type: String,
        required: false,
    },
    tipo: {
        type: String,
        required: false,
    },
    precio: {
        type: Number,
        required: true,
    },
    presentacion: {
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

// Exportar el modelo
module.exports = mongoose.model('Product', productSchema);