const productoModel = require('../models/productoModel')

const getAll = async (req, res) => {
  try {
    const data = await productoModel.getAll()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' })
  }
}

const getById = async (req, res) => {
  try {
    const data = await productoModel.getById(req.params.id)
    if (!data) return res.status(404).json({ error: 'Producto no encontrado' })
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' })
  }
}

const create = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoriaId } = req.body
    if (!nombre || precio === undefined || !categoriaId) {
      return res.status(400).json({ error: 'nombre, precio y categoriaId son obligatorios' })
    }
    const data = await productoModel.create({ nombre, descripcion, precio, stock, categoriaId })
    res.status(201).json(data)
  } catch (error) {
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'La categoria no existe' })
    }
    res.status(500).json({ error: 'Error al crear producto' })
  }
}

const update = async (req, res) => {
  try {
    const data = await productoModel.update(req.params.id, req.body)
    res.json(data)
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }
    res.status(500).json({ error: 'Error al actualizar producto' })
  }
}

const remove = async (req, res) => {
  try {
    await productoModel.remove(req.params.id)
    res.json({ mensaje: 'Producto eliminado' })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }
    res.status(500).json({ error: 'Error al eliminar producto' })
  }
}

module.exports = { getAll, getById, create, update, remove }