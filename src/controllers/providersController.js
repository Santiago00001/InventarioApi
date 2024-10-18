// src/controllers/providerController.js

const Provider = require('../models/Provider'); // Asegúrate de que esta ruta sea correcta

// Obtener todos los proveedores
const getAllProviders = async (req, res) => {
    try {
        const providers = await Provider.find()
        const visibleProviders = providers.filter(p => p.visible !== 0); // Solo obtener proveedores visibles
        res.status(200).json(visibleProviders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener proveedores." });
    }
};

// Crear un nuevo proveedor
const createProvider = async (req, res) => {
    const { nombre, ciudad, direccion, telefono, director, correo } = req.body;

    // Verificar que se proporcionen datos necesarios
    if (!nombre || !ciudad || !direccion || !correo) {
        return res.status(400).json({ message: "Nombre, ciudad, dirección y correo son requeridos." });
    }

    try {
        // Buscar si el proveedor ya existe basado en su correo
        const existingProvider = await Provider.findOne({ correo });

        if (existingProvider) {
            // Si ya existe, actualizar su visibilidad
            existingProvider.visible = 1; // Reactivar el proveedor
            await existingProvider.save(); // Guardar cambios
            return res.status(200).json({ message: "Proveedor existente activado nuevamente.", provider: existingProvider });
        }

        const lastProvider = await Provider.findOne().sort({ item: -1 });
        const nextItem = lastUser ? lastProvider.item + 1 : 1;

        // Crear un nuevo proveedor
        const newProvider = new Provider({
            item: nextItem,
            nit,
            razon_social,
            direccion,
            ciudad,
            tel,
            cel,
            correo,
            contacto,
            act_eco,
            fecha_inag,
            cod_ins,
            cod_ins_fecha,
            ver_ins,
            cod_dat,
            cod_dat_fecha,
            ver_dat,
            visible: 1 // Establecer como visible por defecto
        });

        await newProvider.save();
        res.status(201).json(newProvider);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el proveedor." });
    }
};

// Obtener un proveedor por ID
const getProviderById = async (req, res) => {
    const { id } = req.params;

    try {
        const provider = await Provider.findById(id); // Busca por ID

        if (!provider) {
            return res.status(404).json({ message: "Proveedor no encontrado." });
        }

        res.status(200).json(provider);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el proveedor." });
    }
};

// Actualizar un proveedor
const updateProvider = async (req, res) => {
    const { id } = req.params;
    try {
        const provider = await Provider.findById(id);

        if (!provider) {
            return res.status(404).json({ message: "Proveedor no encontrado." });
        }

        const { nit, razon_social, direccion, ciudad, tel, cel, correo, contacto, act_eco, fecha_inag, cod_ins, cod_ins_fecha, ver_ins, cod_dat, cod_dat_fecha, ver_dat, visible } = req.body;

        // Actualiza solo los campos que se han proporcionado
        provider.nit = nit || provider.nit;
        provider.razon_social = razon_social || provider.razon_social;
        provider.direccion = direccion || provider.direccion;
        provider.ciudad = ciudad || provider.ciudad;
        provider.tel = tel || provider.tel;
        provider.cel = cel || provider.cel;
        provider.correo = correo || provider.correo;
        provider.contacto = contacto || provider.contacto;
        provider.act_eco = act_eco || provider.act_eco;
        provider.fecha_inag = fecha_inag || provider.fecha_inag;
        provider.cod_ins = cod_ins || provider.cod_ins;
        provider.cod_ins_fecha = cod_ins_fecha || provider.cod_ins_fecha;
        provider.ver_ins = ver_ins !== undefined ? ver_ins : provider.ver_ins;
        provider.cod_dat = cod_dat || provider.cod_dat;
        provider.cod_dat_fecha = cod_dat_fecha || provider.cod_dat_fecha;
        provider.ver_dat = ver_dat !== undefined ? ver_dat : provider.ver_dat;
        provider.visible = visible || provider.visible;

        await provider.save();
        res.status(200).json(provider);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el proveedor." });
    }
};

// Eliminar un proveedor (ocultar)
const deleteProvider = async (req, res) => {
    const { id } = req.params;

    try {
        const provider = await Provider.findById(id);

        if (!provider) {
            return res.status(404).json({ message: "Proveedor no encontrado." });
        }

        // Cambiar el estado de 'visible'
        provider.visible = 0;

        await provider.save();
        res.status(200).json({ message: "Proveedor ocultado correctamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el proveedor." });
    }
};

module.exports = {
    getAllProviders,
    createProvider,
    getProviderById,
    updateProvider,
    deleteProvider
};