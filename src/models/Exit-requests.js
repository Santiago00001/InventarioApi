const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true, // Ejemplo: 'Compra Interna'
    },
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true, // Referencia al usuario que hizo la solicitud
    },
    agenciaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agencia',
        required: true, // Referencia a la agencia que hace la solicitud
    },
    estado_aprobacion: {
        coordinacion: {
            type: Boolean,
            required: true,
        },
        jefatura: {
            type: Boolean,
            required: true,
        },
        direccion: {
            type: Boolean,
            required: true,
        },
    },
    productos: [{
        productoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Producto',
            required: true, // Referencia al producto
        },
        cantidad: {
            type: Number,
            required: true, // Cantidad solicitada
        },
        total: {
            type: Number,
            required: true, // Total = cantidad * precio unitario (que viene del producto)
        },
    }],
}, {
    timestamps: true, // Para agregar createdAt y updatedAt
});

module.exports = mongoose.model('Solicitud', solicitudSchema);