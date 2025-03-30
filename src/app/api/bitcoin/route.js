import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// ✅ MongoDB Setup
const MONGO_URI = "mongodb+srv://gsigor84:prodigy01@ai-news-cluster.3qcj1.mongodb.net/?retryWrites=true&w=majority&appName=AI-News-Cluster";
const DB_NAME = "AI-News-Project";
const COLLECTION_NAME = "crypto_prices";

export async function GET() {
  let client;

  try {
    console.log("🟢 Connecting to MongoDB...");
    client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // ✅ Fetch all crypto prices, sorted alphabetically by symbol
    const prices = await collection.find().sort({ symbol: 1 }).toArray();

    console.log(`📊 Fetched ${prices.length} crypto prices from MongoDB`);
    return NextResponse.json(prices, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching crypto prices:", error);
    return NextResponse.json({ message: "Error fetching prices", error }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
      console.log("🔴 MongoDB connection closed.");
    }
  }
}
