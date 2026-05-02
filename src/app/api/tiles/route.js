import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Project root (jekhane package.json o db.json ache) theke path neya hochche
    const filePath = path.join(process.cwd(), "db.json");
    
    // File read kora hochche
    const fileData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileData);

    // Tiles array-ti response hishebe pathano hochche
    return NextResponse.json(data.tiles || []);
  } catch (error) {
    console.error("Error reading db.json:", error);
    return NextResponse.json({ error: "Failed to load tiles" }, { status: 500 });
  }
}