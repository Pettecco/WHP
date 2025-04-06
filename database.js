import { MongoClient } from "mongodb";

class Database {
  constructor() {
    this.client = null;
    this.db = null;
  }

  async connect(url) {
    if (!this.client) {
      this.client = new MongoClient(url, { useUnifiedTopology: true });
      await this.client.connect();
      this.db = this.client.db();
      console.log("Conectado ao banco de dados com sucesso");
    }
    return this.db;
  }

  async insertCall(collectionName, callData) {
    if (!this.db) {
      throw new Error("Database not connected. Call 'connect' first.");
    }
    const collection = this.db.collection(collectionName);
    const result = await collection.insertOne(callData);
    return result;
  }

  async getCalls(collectionName) {
    const collection = this.db.collection(collectionName);
    const videos = await collection.find().toArray();
    return videos;
  }
}

export default Database;
