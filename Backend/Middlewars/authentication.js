const isLoggedIn = (req, res, next) => {
    console.log("Is Authenticated?", req.isAuthenticated()); // Add parentheses to call it
    console.log("User:", req.user); // Should log user if session is valid

    if (req.isAuthenticated()) {
        return next();
    }

    res.status(401).json({ isAuthenticated: false });
};

module.exports = isLoggedIn;
