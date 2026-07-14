const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

async function registerUser(req, res, next) {
    try {
        const { name, email, password } = req.body;


        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user =  await User.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
        });

        return res.json({
            message: "Signup successful",
        });
    }
    catch (error) {
        next(error);
    }
}

async function getRegisterUser(req, res, next) {
    try {
        const allUsers = await User.find({})
            .select("-password");
        return res.json(allUsers);
    }
    catch (error) {
        next(error);
    }
}

async function loginUser(req, res, next) {
    //     console.log("Login API called");
    // console.log(req.body);
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const user = await User.findOne({
            email,
        });

        if (!user) {
            return res.status(400).json({ error: "User not exist" });
        }

        const comparedPassword = await bcrypt.compare(password, user.password)
        if (!comparedPassword) {
            return res.status(400).json({ error: "Invalid credentials" });
        }


        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET
        );
        // console.log(token);

        res.cookie("token", token,
            {
                httpOnly: true,
                secure: false
            });



        return res.json({
            message: "Login Succesful",
            // token
        });
    }
    catch (error) {
        next(error);
    }
}

async function logoutUser(req, res) {
    res.clearCookie("token");

    return res.json({
        message: "Logout successful"
    });
}

module.exports = {
    registerUser,
    getRegisterUser,
    loginUser,
    logoutUser,
}

