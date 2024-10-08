const mongoose = require('mongoose');

const agenciaSchema = new mongoose.Schema({
    item: {
        type: Number,
        required: true,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('agencys', agenciaSchema);