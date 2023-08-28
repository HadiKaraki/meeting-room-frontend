module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.token) {
        return res.redirect('../../user/login')
    }
    next();
}

module.exports.isLoggedOut = (req, res, next) => {
    if (req.session.token) {
        return res.redirect('../../home')
    }
    next();
}

module.exports.isAdmin = async(req, res, next) => {
    if (req.session.roles.includes('admin')) {
        next();
    } else {
        return res.sendStatus(403);
    }
}