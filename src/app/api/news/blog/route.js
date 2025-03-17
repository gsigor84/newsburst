import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// ✅ MongoDB Connection String
const MONGO_URI = "mongodb+srv://gsigor84:prodigy01@ai-news-cluster.3qcj1.mongodb.net/?retryWrites=true&w=majority&appName=AI-News-Cluster";
const DATABASE_NAME = "AI-News-Project";
const COLLECTION_NAME = "blog_news"; // ✅ Using 'blog_news' collection

// ✅ Fetch Blog News from MongoDB
export async function GET() {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const blogNews = await collection.find().toArray(); // ✅ Fetch all documents
    client.close();

    return NextResponse.json(blogNews);
  } catch (error) {
    console.error("Error fetching Blog news:", error);
    return NextResponse.json({ error: "Failed to fetch Blog news" }, { status: 500 });
  }
}
