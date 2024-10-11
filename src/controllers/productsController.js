// src/controllers/productController.js

const Product = require('../models/Product'); // Asegúrate de que la ruta sea correcta

// Obtener todos los productos
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ visible: 1 }); // Solo obtener productos visibles
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los productos." });
    }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
    const { nombre, categoria, grupo_desc, tipo, precio, presentacion, cta_cont } = req.body;

    // Verificar que se proporcionen datos necesarios
    if (!nombre || !categoria) {
        return res.status(400).json({ message: "Nombre y categoría son requeridos." });
    }

    try {
        // Buscar el producto más alto en la misma categoría
        const highestProduct = await Product.findOne({ categoria }).sort({ codigo: -1 });

        // Determinar el nuevo código
        const newCode = highestProduct ? highestProduct.codigo + 10 : 10; // Si no existe, iniciar en 10

        // Crear un nuevo producto
        const newProduct = new Product({
            nombre,
            categoria,
            grupo_desc,
            tipo,
            precio,
            presentacion,
            cta_cont,
            codigo: newCode,
            visible: 1, // Establecer como visible por defecto
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el producto." });
    }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if (!product || product.visible === 0) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el producto." });
    }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        const { nombre, categoria, grupo_desc, tipo, precio, presentacion, cta_cont, codigo } = req.body;

        // Verificar si el nuevo código ya existe en la base de datos
        if (codigo) {
            const existingProduct = await Product.findOne({ codigo });
            if (existingProduct && existingProduct._id.toString() !== id) {
                return res.status(400).json({ message: "El código ya está en uso por otro producto." });
            }
        }

        // Actualiza solo los campos que se han proporcionado
        product.nombre = nombre || product.nombre;
        product.categoria = categoria || product.categoria;
        product.grupo_desc = grupo_desc || product.grupo_desc;
        product.tipo = tipo || product.tipo;
        product.precio = precio || product.precio;
        product.presentacion = presentacion || product.presentacion;
        product.cta_cont = cta_cont || product.cta_cont;
        product.codigo = codigo || product.codigo;

        await product.save();
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el producto." });
    }
};

// Eliminar un producto (ocultar)
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        // Cambiar el estado de 'visible'
        product.visible = 0;

        await product.save();
        res.status(200).json({ message: "Producto ocultado correctamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al ocultar el producto." });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};