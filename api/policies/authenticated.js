module.exports = function (req, res, ok) {

    if (req.session.authenticated) {
        // console.log("masuk policies")
        return ok();
    }
    else {
        var requireLoginError = [{ name: 'requireLogin', message: 'you must be sign in.' }]
        req.session.flash = {
            err: requireLoginError
        }
        res.redirect('/session/new');
        return;
    }
}