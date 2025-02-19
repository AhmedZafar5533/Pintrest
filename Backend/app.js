require("dotenv").config();

const express = require("express");
const app = express();
const passport = require("passport");
const morgan = require("morgan");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const google = require("./Utils/auth");
const authRoutes = require("./Routes/authRoutes");
const imageRouter = require("./Routes/pictureUplaod");
const LocalStrategy = require("./Utils/local-auth");
const MongoStore = require("connect-mongo");

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB", error));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10mb" }));

app.use(
    session({
         store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/sessionDB",
      ttl:7000 * 60 * 60 * 24, // 1-hour session expiry
      autoRemove: "interval",
      autoRemoveInterval: 10, // Cleanup every 10 minutes
    }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { httpOnly: true, secure: false, maxAge: 7000 * 60 * 60 * 24 },
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use("local", LocalStrategy);
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id).lean();
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

// Use image routes
app.use("/api/images", imageRouter);

app.get('/' , (req, res)=>{
    res.send("Welcome");
});
app.use("*", (req, res) => {
    res.status(404).send("Page not found");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
