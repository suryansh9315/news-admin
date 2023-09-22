import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

const connectDB = () => {
  const client = new MongoClient(uri);
  const clientPromise = client.connect();
  return clientPromise;
};

export { connectDB };
