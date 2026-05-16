const prisma = require('../config/db')

const getAll = () => {
  return prisma.categoria.findMany({ include: { productos: true } })
}

const getById = (id) => {
  return prisma.categoria.findUnique({
    where: { id: Number(id) },
    include: { productos: true }
  })
}

const create = (data) => {
  return prisma.categoria.create({ data })
}

const update = (id, data) => {
  return prisma.categoria.update({
    where: { id: Number(id) },
    data
  })
}

const remove = (id) => {
  return prisma.categoria.delete({ where: { id: Number(id) } })
}

module.exports = { getAll, getById, create, update, remove }