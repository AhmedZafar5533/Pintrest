const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../Modal/user");

const localStrategy = new LocalStrategy(
    {
        usernameField: "usernameOrEmail", // Allow email/username in same field
        passwordField: "password",
    },
    async (usernameOrEmail, password, done) => {
        console.log(usernameOrEmail, password);
        try {
            const user = await User.findOne({
                $or: [
                    { username: usernameOrEmail },
                    { email: usernameOrEmail },
                ],
            }).lean();


            if (!user) {
                return done(null, false, { message: "Invalid credentials" });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return done(null, false, { message: "Invalid credentials" });
            }

            return done(null, user);
        } catch (err) {
            return done(err, { message: err });
        }
    }
);

module.exports = localStrategy;
