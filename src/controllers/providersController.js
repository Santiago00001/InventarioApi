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

        // Crear un nuevo proveedor
        const newProvider = new Provider({
            nombre,
            ciudad,
            direccion,
            telefono,
            director,
            correo,
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

        const { nombre, ciudad, direccion, telefono, director, correo } = req.body;

        // Actualiza solo los campos que se han proporcionado
        provider.nombre = nombre || provider.nombre;
        provider.ciudad = ciudad || provider.ciudad;
        provider.direccion = direccion || provider.direccion;
        provider.telefono = telefono || provider.telefono;
        provider.director = director || provider.director;
        provider.correo = correo || provider.correo;

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