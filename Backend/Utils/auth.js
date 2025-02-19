const passport = require("passport");
const User = require("../Modal/user");

const GoogleStrategy = require("passport-google-oauth2").Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3001/api/auth/google/callback",
            passReqToCallback: true,
        },
        async function (request, accessToken, refreshToken, profile, done) {
            try {
                const user = await User.findOne({
                    email: profile.email,
                });

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
                console.log("error in passport auth js file", error);
                return done(error, null);
            }
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
