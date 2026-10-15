const mongoose = require('mongoose');

/**
 * Conexión centralizada a MongoDB Atlas o Local
 */
const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI ||
    (process.env.NODE_ENV === 'production' ? null : 'mongodb://127.0.0.1:27017/sidii_db');

  if (!mongoUri) {
    throw new Error('MONGO_URI no está configurada en el entorno de producción');
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Conectado exitosamente: ${conn.connection.host}`);
    console.log(`📁 Base de datos activa: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Error al conectar a MongoDB: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;