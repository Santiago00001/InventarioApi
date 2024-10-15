// src/models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    item: {
        type: Number,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    cta_cont: {
        type: Number,
        required: false,
    },
    codigo: {
        type: Number,
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
        required: false,
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