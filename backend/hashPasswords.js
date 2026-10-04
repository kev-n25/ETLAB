const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const User = require("./models/User");

dotenv.config();

const hashPasswords = async () => {

    try {

        await connectDB();

        const users = await User.find({});

        for (const user of users) {

            /*
                Skip passwords that are already hashed.
            */

            if (user.password.startsWith("$2")) {
                continue;
            }

            user.password =
                await bcrypt.hash(user.password, 10);

            await user.save();

            console.log(
                `Password hashed for ${user.username}`
            );
        }

        console.log("Password hashing complete.");

        process.exit(0);

    } catch (error) {

        console.error(
            "Password hashing error:",
            error
        );

        process.exit(1);

    }

};

hashPasswords();