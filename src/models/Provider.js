const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    nit: {
        type: String,
        required: true,
    },
    razon_social: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    ciudad: {
        type: String,
        required: true,
    },
    tel: {
        type: String,
        required: false,
    },
    cel: {
        type: String,
        required: false,
    },
    correo: {
        type: String,
        required: true,
        unique: true,
    },
    contacto: {
        type: String,
        required: true,
        unique: true,
    },
    act_eco: {
        type: String,
        required: true,
        unique: true,
    },
    fecha_inag: {
        type: Date,
        required: true,
    },
    cod_ins: {
        type: String,
        required: true,
        unique: true,
    },
    cod_ins_fecha: {
        type: Date, // Fecha de creación o emisión del cod_ins
        required: true,
        default: Date.now, // Por defecto se toma la fecha actual
    },
    ver_ins: {
        type: Boolean,
        default: false,
    },
    cod_dat: {
        type: String,
        required: true,
        unique: true,
    },
    cod_dat_fecha: {
        type: Date, // Fecha de creación o emisión del cod_dat
        required: true,
        default: Date.now,
    },
    ver_dat: {
        type: Boolean,
        default: false,
    },
    visible: {
        type: Number,
        default: 1,
    },
}, {
    timestamps: true, // Agrega createdAt y updatedAt
});

const Provider = mongoose.model('providers', providerSchema);

module.exports = Provider;