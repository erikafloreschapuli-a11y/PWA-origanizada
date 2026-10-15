const mongoose = require('mongoose');

const IndicadorMIRSchema = new mongoose.Schema({
    clientMutationId: {
        type: String,
        unique: true,
        sparse: true
    },
    programaPresupuestario: String,
    unidadResponsable: String,
    metodoCalculo: String,
    observacionesTecnicas: String,
    nivelMIR: {
        type: String,
        required: [true, 'El nivel MIR es obligatorio'],
        enum: ['Fin', 'Propósito', 'Componente', 'Actividad']
    },
    resumenNarrativo: {
        type: String,
        required: [true, 'El resumen narrativo es obligatorio'],
        trim: true
    },
    nombreIndicador: {
        type: String,
        required: [true, 'El nombre del indicador es obligatorio'],
        trim: true
    },
    metas: {
        eneroAbril: {
            programado: { type: Number, default: 0 },
            realizado: { type: Number, default: 0 }
        },
        mayoAgosto: {
            programado: { type: Number, default: 0 },
            realizado: { type: Number, default: 0 }
        },
        septiembreDiciembre: {
            programado: { type: Number, default: 0 },
            realizado: { type: Number, default: 0 }
        }
    },
    evidencias: [{
        nombreArchivo: String,
        urlArchivo: String,
        tipoArchivo: String,
        fechaSubida: { type: Date, default: Date.now }
    }],
    usuarioRegistro: {
        type: String,
        default: 'Liliana'
    },
    estatus: {
        type: String,
        enum: ['Borrador', 'Enviado', 'Validado'],
        default: 'Enviado'
    }
}, {
    timestamps: true // Añade createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('IndicadorMIR', IndicadorMIRSchema);