import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const MONGO_URI = "mongodb+srv://gsigor84:prodigy01@ai-news-cluster.3qcj1.mongodb.net/?retryWrites=true&w=majority&appName=AI-News-Cluster";
const DB_NAME = "AI-News-Project";
const COLLECTION_NAME = "trading_recommendations";

export async function GET() {
  let client;

  try {
    console.log("🟢 Connecting to MongoDB...");
    client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const data = await collection.find().sort({ token: 1 }).toArray();
    console.log(`📈 Fetched ${data.length} recommendations from MongoDB`);
    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error fetching recommendations:", error);
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
      console.log("🔴 MongoDB connection closed.");
    }
  }
}
