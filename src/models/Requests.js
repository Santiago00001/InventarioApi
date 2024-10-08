const mongoose = require('mongoose');

const RequestsSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true, // 'Compra Externa' o 'Compra Interna'
    },
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true, // Referencia al usuario que hace la solicitud
    },
    agenciaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agencia',
        required: true, // Referencia a la agencia que solicita
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
            required: true, // Referencia al producto que se solicita
        },
        cantidad: {
            type: Number,
            required: true, // Cantidad solicitada del producto
        },
        total: {
            type: Number,
            required: true, // Total (puede ser cantidad * precio unitario o un total definido)
        },
        proveedorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Proveedor', // Este campo puede ser opcional para las solicitudes internas
        },
        tipo_proveedor: {
            type: String, // 'Externo' o 'Interno', dependiendo del tipo de solicitud
        },
    }],
}, {
    timestamps: true, // Para agregar createdAt y updatedAt
});

module.exports = mongoose.model('SolicitudGeneral', RequestsSchema);