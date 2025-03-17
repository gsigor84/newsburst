import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// ✅ Correct MongoDB Connection
const MONGO_URI = "mongodb+srv://gsigor84:prodigy01@ai-news-cluster.3qcj1.mongodb.net/?retryWrites=true&w=majority&appName=AI-News-Cluster";
const DB_NAME = "AI-News-Project"; // ✅ Matches Python script
const COLLECTION_NAME = "news"; // ✅ Fetching from 'news' collection

export async function GET() {
  let client;

  try {
    console.log("🟢 Connecting to MongoDB...");
    client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // ✅ Fetch all news from the database
    const news = await collection.find().toArray();

    console.log(`📢 Fetched ${news.length} articles from MongoDB`);
    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching news:", error);
    return NextResponse.json({ message: "Error fetching news", error }, { status: 500 });
  } finally {
    if (client) {
      await client.close(); // ✅ Ensure connection is always closed
      console.log("🔴 MongoDB connection closed.");
    }
  }
}
