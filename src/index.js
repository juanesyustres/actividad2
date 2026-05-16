const express = require('express')
const app = express()

app.use(express.json())

app.use('/api/categorias', require('./routes/categoriaRoutes'))
app.use('/api/productos', require('./routes/productoRoutes'))

app.get('/', (req, res) => {
  res.json({ mensaje: 'API Inventario v1' })
})

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`)
})