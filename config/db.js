const mongoose = require('mongoose');

/**
 * Conexión centralizada a MongoDB Atlas o Local
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sidii_db', {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Conectado exitosamente: ${conn.connection.host}`);
    console.log(`📁 Base de datos activa: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Error al conectar a MongoDB: ${error.message}`);
    
    // Si estás en producción cerramos el proceso; en local dejamos que siga para pruebas
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;