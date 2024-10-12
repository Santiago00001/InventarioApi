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
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('agencys', agenciaSchema);