/**
 * SessionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    new: function (req, res) {
        res.view('authentication/login', { layout: null });
    },

    login: function (req, res) {
        var email = req.param('email');
        var password = req.param('password');

        // No email/password entered
        if (!(email && password)) {
            return res.send('No email or password specified!', 500);
        }
        // Lookup the user in the database

        User.findOne({
            email: email
        }).populate('customer').exec(function(err, user) {

            // Account not found
            if (err || !user) {
                return res.send('Invalid email and password combination!', 500);
            }
            Customer.findOne({ id_user: user.id }).exec(function(err, customer) {
                req.session.Customer = customer
            })

            // Compare the passwords
            bcrypt.compare(password, user.password, function(err, valid) {
                if (err || !valid)
                    return res.send('Invalid email and password combination!', 500)

                // The user has authenticated successfully, set their session
                req.session.authenticated = true;
                req.session.User = user;
                // console.log(result.name);

                // Redirect to protected area
                // return res.json(user)
                return res.redirect('/dashboard')

            });
        })

    },


};

