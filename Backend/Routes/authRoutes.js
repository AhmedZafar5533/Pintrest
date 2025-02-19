const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../Modal/user");
const isLoggedIn = require("../Middlewars/authentication");
const google = require("../Utils/auth");
const Picture = require("../Modal/pictures");

const router = express.Router();

router.get(
    "/google/login",
    passport.authenticate("google", {
        scope: ["email", "profile"],
        prompt: "select_account",
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: "http://localhost:5173?login=success",
        failureRedirect: "http://localhost:5173/login?login=failed",
    })
);

router.post("/normal/signup", async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        // Check if user exists
        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Username or email already exists" });
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        // Manually log in the user after signup
        req.login(user, (err) => {
            if (err) {
                console.error("Login error after signup:", err);
                return next(err);
            }

            console.log("User logged in after signup:", req.user);

            return res.status(200).json({
                message: "Signup successful",
                user: req.user,
            });
        });
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ message: "Error creating user" });
    }
});

router.post("/normal/login", passport.authenticate("local"), (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Login failed" });
    }
    const userDataWithoutPassword = { ...req.user, password: undefined };

    res.status(200).json({
        message: "Login successful",
        user: userDataWithoutPassword,
    });
});

router.get("/authenticate", isLoggedIn, async (req, res) => {
    console.log(req.user);
    if (!req.user) {
        return res.status(401).json({ isAuthenticated: false });
    }
    const userPictures = await Picture.find({ user: req.user._id });
    const userDataWithoutPassword = { ...req.user, password: undefined };
    console.log(userPictures);
    res.status(200).json({
        isAuthenticated: true,
        user: userDataWithoutPassword,
        uploadedPictures: userPictures,
    });
});

router.post("/logout", (req, res) => {
    req.logout((err) => {
        if (err)
            return res.status(500).json({ message: "Error during logout" });

        req.session.destroy((err) => {
            if (err) {
                console.error("Session destruction error:", err);
                return res
                    .status(500)
                    .json({ message: "Error destroying session" });
            }
            res.clearCookie("connect.sid");
            res.status(200).json({ message: "Logout successful" });
        });
    });
});

module.exports = router;
