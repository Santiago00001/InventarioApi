// controllers/categoryController.js
const Category = require('../models/Category');

// Obtener todas las categorías
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
};

// Crear una nueva categoría
exports.createCategory = async (req, res) => {
  const { name, categoryLetter, cta_cont } = req.body;

  try {
    const newCategory = new Category({ name, categoryLetter, cta_cont });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category' });
  }
};

// Actualizar una categoría
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, categoryLetter, cta_cont } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, categoryLetter, cta_cont },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating category' });
  }
};

// Eliminar una categoría
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category' });
  }
};