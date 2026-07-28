import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer: MongoMemoryServer | null = null;

export const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGODB_URI;

    if (!mongoUri || mongoUri.trim() === '') {
      console.log('No MONGODB_URI found in environment. Initializing MongoMemoryServer for standalone execution...');
      mongoMemoryServer = await MongoMemoryServer.create();
      mongoUri = mongoMemoryServer.getUri();
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`[MongoDB Connected] Host: ${conn.connection.host}, Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    // Fallback attempt to memory server if external URI fails
    try {
      console.log('Attempting fallback to MongoMemoryServer...');
      mongoMemoryServer = await MongoMemoryServer.create();
      const fallbackUri = mongoMemoryServer.getUri();
      const conn = await mongoose.connect(fallbackUri);
      console.log(`[MongoDB Fallback Connected] Host: ${conn.connection.host}`);
      return conn;
    } catch (fallbackError) {
      console.error('Fatal: Failed to connect to fallback MongoDB Memory Server:', fallbackError);
      process.exit(1);
    }
  }
};
