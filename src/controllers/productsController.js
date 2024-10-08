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
    const { nombre, categoria, grupo_desc, tipo, precio, presentacion, proveedor1, proveedor2, proveedor3, cta_cont, codigo } = req.body;

    // Verificar que se proporcionen datos necesarios
    if (!nombre || !precio || !codigo) {
        return res.status(400).json({ message: "Nombre, precio y código son requeridos." });
    }

    try {
        // Buscar si el producto ya existe
        const existingProduct = await Product.findOne({ codigo });

        if (existingProduct) {
            // Si ya existe, actualizar su visibilidad
            existingProduct.visible = 1;
            await existingProduct.save();
            return res.status(200).json({ message: "Producto existente activado nuevamente.", product: existingProduct });
        }

        // Crear un nuevo producto
        const newProduct = new Product({
            nombre,
            categoria,
            grupo_desc,
            tipo,
            precio,
            presentacion,
            proveedor1,
            proveedor2,
            proveedor3,
            cta_cont,
            codigo,
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

        const { nombre, categoria, grupo_desc, tipo, precio, presentacion, proveedor1, proveedor2, proveedor3, cta_cont, codigo } = req.body;

        // Actualiza solo los campos que se han proporcionado
        product.nombre = nombre || product.nombre;
        product.categoria = categoria || product.categoria;
        product.grupo_desc = grupo_desc || product.grupo_desc;
        product.tipo = tipo || product.tipo;
        product.precio = precio || product.precio;
        product.presentacion = presentacion || product.presentacion;
        product.proveedor1 = proveedor1 || product.proveedor1;
        product.proveedor2 = proveedor2 || product.proveedor2;
        product.proveedor3 = proveedor3 || product.proveedor3;
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