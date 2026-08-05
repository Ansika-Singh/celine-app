import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  console.warn('Please define the MONGODB_URI environment variable inside .env.local');
}

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/celine';
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global;
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
