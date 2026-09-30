const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");

const Department = require("../models/Department");
const Semester = require("../models/Semester");

const login = async (req, res) => {

    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required"
            });
        }

        const user = await User.findOne({
            username: username
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        let profile = null;

        if (user.role === "student") {

            profile = await Student.findOne({
                user: user._id
            })
            .populate("department", "name code")
            .populate("semester");

        }

        if (user.role === "faculty") {

            profile = await Faculty.findOne({
                user: user._id
            })
            .populate("department", "name code");

        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            success: true,
            message: "Login successful",

            token,

            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },

            profile
        });

    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Login failed"
        });

    }
};

module.exports = {
    login
};