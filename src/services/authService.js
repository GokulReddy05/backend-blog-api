
import prisma from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (name, email, password) => {
    // Check whether email already exists
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new Error("EMAIL_ALREADY_EXISTS");
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user in database
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true
        }
    });

    return user;
};


export const loginUser = async (email, password) => {
    // Find user by email
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new Error("INVALID_CREDENTIALS");
    }

    // Compare entered password with hashed password
    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatch) {
        throw new Error("INVALID_CREDENTIALS");
    }

    // Get JWT secret
    const secret = process.env.JWT_ACCESS_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET_MISSING");
    }

    // Generate access token
    const accessToken = jwt.sign(
        {
            userId: user.id,
            email: user.email
        },
        secret,
        {
            expiresIn: "15m"
        }
    );

    return {
        accessToken,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
};