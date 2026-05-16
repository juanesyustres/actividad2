const prisma = require('../config/db')

const getAll = () => {
  return prisma.producto.findMany({ include: { categoria: true } })
}

const getById = (id) => {
  return prisma.producto.findUnique({
    where: { id: Number(id) },
    include: { categoria: true }
  })
}

const create = (data) => {
  return prisma.producto.create({
    data: {
      nombre: data.nombre,
      descripcion: data.descripcion,
      precio: Number(data.precio),
      stock: Number(data.stock),
      categoriaId: Number(data.categoriaId)
    },
    include: { categoria: true }
  })
}

const update = (id, data) => {
  const campos = {}
  if (data.nombre !== undefined) campos.nombre = data.nombre
  if (data.descripcion !== undefined) campos.descripcion = data.descripcion
  if (data.precio !== undefined) campos.precio = Number(data.precio)
  if (data.stock !== undefined) campos.stock = Number(data.stock)
  if (data.categoriaId !== undefined) campos.categoriaId = Number(data.categoriaId)

  return prisma.producto.update({
    where: { id: Number(id) },
    data: campos,
    include: { categoria: true }
  })
}

const remove = (id) => {
  return prisma.producto.delete({ where: { id: Number(id) } })
}

module.exports = { getAll, getById, create, update, remove }