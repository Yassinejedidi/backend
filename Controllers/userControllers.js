const asyncHandler = require('express-async-handler')
const User = require("../Models/userModal");
const generateToken = require('../utils/generateToken');




const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log("@@ 1 @@", email, password)
    const user = await User.findOne({ email });
    console.log("@@ 2 @@", user)
    if (user) {
        try {
            const isValidPassword = await user.matchPassword(password);
            if (isValidPassword) {
                const token = generateToken(user._id);
                res.send({ token });
                console.log("user logged in");
            } else {
                res.send({ error: "Email or Password invalid" })
            }

        } catch (err) {
            return res.status(422).send({ error_password: "user password incorrect" });
        }

        /* res.json({
             _id: user._id,
             name: user.name,
             email: user.email,
             token: generateToken(user._id),
         });
     } else {
         res.status(401);
         throw new Error("Invalid Email or Password");
     }*/
    } else {
        return res.status(422).send({ email_error: "email not correct" })
    }
});


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(404);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});

module.exports = { registerUser, authUser }