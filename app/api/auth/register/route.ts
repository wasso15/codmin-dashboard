import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(request: Request) {
  const {
    firstname,
    middlename,
    lastname,
    username,
    email,
    password,
    confirmPassword,
    role,
    genre,
  } = await request.json();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  if (
    !firstname ||
    !middlename ||
    !lastname ||
    !username ||
    !email ||
    !password ||
    !confirmPassword ||
    !role ||
    !genre
  ) {
    return NextResponse.json(
      { message: "Tous les champs sont requis" },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Format d'email invalide" },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: "Les mots de passe ne correspondent pas" },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { message: "Le mot de passe doit contenir au moins 6 caractères" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "L'utilisateur existe déjà" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      middlename,
      lastname,
      username,
      email,
      password: hashedPassword,
      role,
      genre,
      isActive: true,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "Compte créé avec succès" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
