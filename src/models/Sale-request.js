const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
    proveedorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proveedor',
        required: true, // Referencia al proveedor
    },
    cantidad: {
        type: Number,
        required: true, // Cantidad solicitada al proveedor
    },
    precio: {
        type: Number,
        required: true, // Precio del producto con el proveedor
    },
    total: {
        type: Number,
        required: true, // Total = cantidad * precio
    }
});

const productoSchema = new mongoose.Schema({
    productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: true, // Referencia al producto
    },
    proveedores: [proveedorSchema], // Array de proveedores para ese producto
});

const solicitudSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true, // Ejemplo: 'Compra'
    },
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true, // Referencia al usuario que hizo la solicitud
    },
    agenciaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agencia',
        required: true, // Referencia a la agencia de la solicitud
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
    productos: [productoSchema], // Array de productos solicitados con proveedores
}, {
    timestamps: true, // Para agregar createdAt y updatedAt
});

module.exports = mongoose.model('Solicitud', solicitudSchema);