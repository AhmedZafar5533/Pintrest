const passport = require("passport");
const User = require("../Modal/user");
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID, // ✅ Moved to .env
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, // ✅ Moved to .env
            callbackURL:
                process.env.GOOGLE_CALLBACK_URL ||
                "http://localhost:3001/api/auth/google/callback",
            passReqToCallback: true,
        },
        async function (request, accessToken, refreshToken, profile, done) {
            try {
                const user = await User.findOne({ email: profile.email });

                if (user) {
                    return done(null, profile);
                } else {
                    const new_user = new User({
                        username: profile.email,
                        email: profile.email,
                        name: profile.displayName,
                        profilePic: profile.photos[0].value,
                    });

                    await new_user.save();
                    return done(null, profile);
                }
            } catch (error) {
                console.log("Error in passport auth:", error);
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
