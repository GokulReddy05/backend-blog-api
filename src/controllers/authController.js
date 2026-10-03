
import {
    registerUser,
    loginUser
} from "../services/authService.js";


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            !name.trim() ||
            !email.trim() ||
            password.length < 8
        ) {
            return res.status(400).json({
                error: "Name, valid email and password of at least 8 characters are required"
            });
        }

        const user = await registerUser(
            name.trim(),
            email.trim().toLowerCase(),
            password
        );

        return res.status(201).json({
            message: "Registration successful",
            user
        });

    } catch (error) {
        if (error.message === "EMAIL_ALREADY_EXISTS") {
            return res.status(409).json({
                error: "Email already registered"
            });
        }

        console.error(error);

        return res.status(500).json({
            error: "Registration failed"
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

        const result = await loginUser(
            email.trim().toLowerCase(),
            password
        );

        return res.status(200).json({
            message: "Login successful",
            accessToken: result.accessToken,
            user: result.user
        });

    } catch (error) {
        if (error.message === "INVALID_CREDENTIALS") {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        console.error(error);

        return res.status(500).json({
            error: "Login failed"
        });
    }
};