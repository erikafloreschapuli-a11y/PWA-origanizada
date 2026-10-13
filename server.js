require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
// Importar rutas de indicadores
const indicadoresRoutes = require('./routes/indicadores');


const app = express();
const PORT = process.env.PORT || 4000;

// 1. Conectar a MongoDB
connectDB();

// 2. Middlewares globales
app.use(cors({
  origin: 'https://erikafloreschapuli-a11y.github.io', // Permite peticiones desde GitHub Pages, localhost o tu PWA móvil
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Carpeta pública para ver evidencias subidas (fotos, PDFs)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 3. Ruta de prueba y comprobación de salud (Health Check)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    sistema: 'SIDII Gestión Institucional API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// 4. Espacio reservado para las rutas de datos (las crearemos en los siguientes pasos)
// app.use('/api/mir', require('./routes/mirRoutes'));
// app.use('/api/evidencias', require('./routes/evidenciaRoutes'));
// Usar las rutas con el prefijo /api/indicadores
app.use('/api/indicadores', indicadoresRoutes);
// 5. Manejador para rutas inexistentes (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada en la API de SIDII' });
});



// 6. Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor SIDII activo en: http://localhost:${PORT}`);
  console.log(`📡 Comprobación de salud: http://localhost:${PORT}/api/health`);
});

