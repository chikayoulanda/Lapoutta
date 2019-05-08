/**
 * ApiUserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var bcrypt = require('bcrypt');

module.exports = {
    register: async function(req, res) {
        var newUser = {
            email: req.param("email"),
            password: req.param("password"),
            confirm_password: req.param("confirm_password")
        };
        if (newUser.password == newUser.confirm_password) {
            var data = await User.create(newUser).fetch()
            var newCustomer = {
                name: req.param("name"),
                no_telp: req.param("no_telp"),
                gender: req.param("gender"),
                // image: req.param("image"),
                id_user: data.id,
                id_role: 2
            }
            return Customer.create(newCustomer).then(function(_customer) {
                return res.status(200).json({
                    status: 'success'
                })
            })
        }
    },

    login: function(req, res) {
        var email = req.param('email');
        var password = req.param('password');

        // No email/password entered
        if (!(email && password)) {
            return res.send('No email or password specified!', 500);
        }
        // Lookup the user in the database

        User.findOne({
            email: email
        }).exec(function(err, user) {

            // Account not found
            if (err || !user) {
                return res.send('Invalid email and password combination!', 500);
            }

            // Compare the passwords
            bcrypt.compare(password, user.password, function(err, valid) {
                if (err || !valid)
                    return res.send('Invalid email and password combination!', 500)

                // The user has authenticated successfully, set their session
                req.session.authenticated = true;
                req.session.User = user;
                // console.log(user.name);

                // Redirect to protected area
                // return res.json(user)
                return res.status(200).json({
                    status: 'success',
                    data: user,
                })

            });
        });
    },

    logout: function(req, res) {

        req.session.destroy();
        // req.logout();
        res.redirect('/login/mobile');
    },

    detail: async function(req, res) {
        var _id = req.param("id")
        var detail = await Customer.find({ id: _id }).populate('id_user')
        console.log(detail)
        return res.json(detail)
    },

    update: async function(req, res) {
        var _id = req.param("id")
        var _customer = await Customer.find({ id: _id })
        var _update = await User.update({ id: _id }, {
            email: req.param("email")
        }).then(function(err, user) {
            return Customer.update({ id: _id }, {
                name: req.param("name"),
                no_telp: req.param("no_telp"),
                gender: req.param("gender")
            }).fetch()
        })
        return res.send("sukses")
    },

    changePassword: function(req, res) {
        var data = {
            password: req.param("password"),
            confirm_password: req.param("confirm_password")
        }
        if (data.password == data.confirm_password) {
            User.find({ id: req.param("id") }).exec(function(err, pass) {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(data.password, salt, function(err, hash) {
                        if (err) {
                            console.log(err);
                            cb(err);
                        } else {
                            return User.update({ id: pass[0].id }, {
                                password: hash
                            }).then(function(_newPass) {
                                return res.status(200).json({
                                    status: "success"
                                })
                            })
                        }
                    });
                });
            })
        }

    },

    changePhoto: async function(req, res) {
        console.log("ganti profil")
            // req.file('image').upload({ dirname: '../../assets/images/uploads/', maxBytes: 10000000 }, function(err, files) {
        req.file('image').upload({ dirname: '../../.tmp/public/images/uploads/' }, function(err, files) {

            // req.file('image').upload({dirname: '../../assets/images/uploads/'}, function (err, data){
            // console.log(data)
            if (files.length === 0) {
                return res.serverError("no files")
            }
            // })
            if (err) return res.serverError(err);
            var fileUID = files[0].fd.replace(/^.*[\\\/]/, '');
            Customer.update({ id_user: req.param("id") }, {
                image: fileUID
            }).then(function(err, _profi) {
                res.json({ status: 200, file: files })

            })
        })
    },

};