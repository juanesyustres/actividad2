
const categoriaModel = require('../models/categoriaModel')

const getAll = async (req, res) => {
  try {
    const data = await categoriaModel.getAll()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categorias' })
  }
}

const getById = async (req, res) => {
  try {
    const data = await categoriaModel.getById(req.params.id)
    if (!data) return res.status(404).json({ error: 'Categoria no encontrada' })
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categoria' })
  }
}

const create = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body
    if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio' })
    const data = await categoriaModel.create({ nombre, descripcion })
    res.status(201).json(data)
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Ya existe una categoria con ese nombre' })
    }
    res.status(500).json({ error: 'Error al crear categoria' })
  }
}

const update = async (req, res) => {
  try {
    const data = await categoriaModel.update(req.params.id, req.body)
    res.json(data)
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Categoria no encontrada' })
    }
    res.status(500).json({ error: 'Error al actualizar categoria' })
  }
}

const remove = async (req, res) => {
  try {
    await categoriaModel.remove(req.params.id)
    res.json({ mensaje: 'Categoria eliminada' })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Categoria no encontrada' })
    }
    res.status(500).json({ error: 'Error al eliminar categoria' })
  }
}

module.exports = { getAll, getById, create, update, remove }