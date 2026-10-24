import { MongoClient, type Collection, type Document } from "mongodb";

type MongoCache = {
  client?: Promise<MongoClient>;
  indexesReady?: Promise<void>;
};

const cache = globalThis as typeof globalThis & { __two5Mongo?: MongoCache };

function uri() {
  const value = process.env.MONGODB_URI_USER || process.env.MONGODB_URI;
  if (!value) throw new Error("MongoDB is not configured.");
  return value;
}

export function mongoClient() {
  if (!cache.__two5Mongo) cache.__two5Mongo = {};
  if (!cache.__two5Mongo.client) {
    const client = new MongoClient(uri());
    cache.__two5Mongo.client = client.connect();
  }
  return cache.__two5Mongo.client;
}

export async function usersCollection<T extends Document>() {
  const client = await mongoClient();
  const collection = client.db("two5").collection<T>("two5users");

  if (!cache.__two5Mongo) cache.__two5Mongo = {};
  if (!cache.__two5Mongo.indexesReady) {
    cache.__two5Mongo.indexesReady = Promise.all([
      collection.createIndex({ email: 1 }, { unique: true }),
      collection.createIndex({ accountId: 1 }, { unique: true }),
    ]).then(() => undefined);
  }
  await cache.__two5Mongo.indexesReady;

  return collection as Collection<T>;
}
