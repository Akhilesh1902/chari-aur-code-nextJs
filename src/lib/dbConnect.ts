import mongoose from 'mongoose';

type ConnectionObject = {
  idConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.idConnected) {
    console.log('Already connected to the database');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || '', {});

    connection.idConnected = db.connections[0].readyState;

    console.log('Connected to the database successfully');
  } catch (err) {
    console.log('Database connection failed', err);
    process.exit();
  }
}

export default dbConnect;
