import { connectDB } from "@/utils/mongo";
import { NextResponse } from "next/server";

export async function GET() {
  const mongoClient = await connectDB();
  if (mongoClient) {
    const data = { message: "Welcome to News API", database: "Working" };
    return NextResponse.json(data);
  }
}
