const express = require('express');
const router = express.Router();
const IndicadorMIR = require('../models/IndicadorMIR');

// 1. Obtener todos los indicadores (GET /api/indicadores)
router.get('/', async (req, res) => {
    try {
        const indicadores = await IndicadorMIR.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: indicadores.length,
            data: indicadores
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al consultar los indicadores',
            error: error.message
        });
    }
});

// 2. Crear un nuevo indicador desde el formulario MIR (POST /api/indicadores)
router.post('/', async (req, res) => {
    try {
        const nuevoIndicador = new IndicadorMIR(req.body);
        const indicadorGuardado = await nuevoIndicador.save();

        res.status(201).json({
            success: true,
            message: 'Indicador MIR guardado exitosamente en MongoDB Atlas',
            data: indicadorGuardado
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al guardar el indicador',
            error: error.message
        });
    }
});

// 3. Obtener un indicador por ID (GET /api/indicadores/:id)
router.get('/:id', async (req, res) => {
    try {
        const indicador = await IndicadorMIR.findById(req.params.id);
        if (!indicador) {
            return res.status(404).json({ success: false, message: 'Indicador no encontrado' });
        }
        res.status(200).json({ success: true, data: indicador });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;