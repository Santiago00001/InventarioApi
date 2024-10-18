// src/controllers/agencyController.js

const Agency = require('../models/Agency'); // Asegúrate de que esta ruta sea correcta

const getAllAgencies = async (req, res) => {
    try {
        const agencys = await Agency.find(); // Obtener todas las agencias
        res.status(200).json(agencys); // Enviar todas las agencias en la respuesta
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener agencias." });
    }
};

// Crear una nueva agencia
const createAgency = async (req, res) => {
    const { nombre, cod, coordinador, director } = req.body;

    // Verificar que se proporcionen datos necesarios
    if (!nombre || !cod || !coordinador || !director) {
        return res.status(400).json({ message: "Nombre y dirección son requeridos." });
    }

    try {
        // Buscar si la agencia ya existe
        const existingAgency = await Agency.findOne({ cod }); // Suponiendo que el nombre es único

        if (existingAgency) {
            // Si ya existe, actualizar su visibilidad
            existingAgency.visible = 1; // Reactivar la agencia
            await existingAgency.save(); // Guardar cambios
            return res.status(200).json({ message: "Agencia existente activada nuevamente.", agency: existingAgency });
        }

        const lastAgency = await Agency.findOne().sort({ item: -1 });
        const nextItem = lastUser ? lastAgency.item + 1 : 1;

        // Crear una nueva agencia
        const newAgency = new Agency({
            item: nextItem,
            nombre,
            cod,
            coordinador,
            director,
            visible: 1 // Establecer como visible por defecto
        });

        await newAgency.save();
        res.status(201).json(newAgency);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la agencia." });
    }
};

// Obtener una agencia por ID
const getAgencyById = async (req, res) => {
    const { id } = req.params;

    try {
        const agency = await Agency.findById(id);

        if (!agency) {
            return res.status(404).json({ message: "Agencia no encontrada." });
        }

        res.status(200).json(agency);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la agencia." });
    }
};

// Actualizar una agencia
const updateAgency = async (req, res) => {
    const { id } = req.params;

    try {
        const agency = await Agency.findById(id);

        if (!agency) {
            return res.status(404).json({ message: "Agencia no encontrada." });
        }

        const { nombre, direccion, telefono, director } = req.body;

        // Actualiza solo los campos que se han proporcionado
        agency.nombre = nombre || agency.nombre;
        agency.direccion = direccion || agency.direccion;
        agency.telefono = telefono || agency.telefono;

        // Verifica si el director está presente en la solicitud
        if (director) {
            agency.director = director; // Actualiza el campo director con el nuevo ObjectId
        }

        await agency.save();
        res.status(200).json(agency);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la agencia." });
    }
};

// Eliminar una agencia (ocultar)
const deleteAgency = async (req, res) => {
    const { id } = req.params;

    try {
        const agency = await Agency.findById(id);

        if (!agency) {
            return res.status(404).json({ message: "Agencia no encontrada." });
        }

        // Cambiar el estado de 'visible'
        agency.visible = 0;

        await agency.save();
        res.status(200).json({ message: "Agencia ocultada correctamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar la agencia." });
    }
};

module.exports = {
    getAllAgencies,
    createAgency,
    getAgencyById,
    updateAgency,
    deleteAgency
};