const mongoose = require('mongoose');

const agenciaSchema = new mongoose.Schema({
    item: {
        type: Number,
        required: false,
    },
    cod: {
        type: Number,
        required: true,
    },
    coordinador: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    director: {
        type: mongoose.Schema.Types.Mixed, // Permite ObjectId o string
        ref: 'User', // Si es un ObjectId, referencia el modelo User
        default: 'Sin Director', // Si no tiene director, usar el string por defecto
    },
}, {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('agencys', agenciaSchema);