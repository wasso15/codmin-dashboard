import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find({}, {
      lastname: 1,
      middlename: 1,
      firstname: 1,
      gender: 1,
      position: 1,
      department: 1,
      email: 1,
      _id: 0
    });
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
