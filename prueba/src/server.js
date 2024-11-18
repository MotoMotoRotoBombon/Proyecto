// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Inicializar Express
const app = express();

// Configuración de CORS (puedes configurar las opciones según tu necesidad)
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB usando Mongoose
mongoose.connect('http://localhost:3020/api/v1/inventario', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Definir un modelo de datos
const InstituteSchema = new mongoose.Schema({
    name: String,
    location: String,
});

const Institute = mongoose.model('Institute', InstituteSchema);

// Endpoint para obtener todos los institutos
app.get('/institutos', async (req, res) => {
    try {
        const institutes = await Institute.find();  // Obtener todos los institutos
        res.json(institutes);  // Devolver los datos como JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Algo salió mal' });
    }
});

// Iniciar el servidor
app.listen(5000, () => {
    console.log('Servidor escuchando en el puerto 5000');
});