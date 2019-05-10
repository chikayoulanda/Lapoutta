/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var bcrypt = require('bcrypt');

module.exports = {
    viewRegister: function(req, res) {
        res.view('authentication/register', { layout: null })
    },

    authenticated: function(req, res) {
        res.view('authentication/login', { layout: null })
    },

    changePass: function(req, res) {
        return res.view('authentication/changePassword')
    },

    update: function(req, res) {
        console.log("masuk update")
        return Address.find({ id_customer: req.session.Customer.id }).populate('id_customer').exec(function(err, _customer) {
            return res.view('admin/edit', {
                data: _customer
            })
        })
    },

    profil: function(req, res) {
        console.log("......find......")
        return Customer.find().where({ id_user: req.session.User.id }).exec(function(err, _customer) {
            return Address.find().where({ id_customer: _customer.id }).exec(function(err, _address) {
                return res.view('admin/profil', {
                    data: _customer,
                    address: _address
                });
            })
        });
    },

    register: async function(req, res) {
        var newUser = {
            email: req.param("email"),
            password: req.param("password"),
            confirm_password: req.param("confirm_password"),
        };
        if (newUser.password == newUser.confirm_password) {
            var data = await User.create(newUser).fetch()

            // return User.create(newUser).then(function (_user) {
            var newCustomer = {
                name: req.param("name"),
                no_telp: req.param("no_telp"),
                gender: req.param("gender"),
                image: req.param("image"),
                id_user: data.id,
                id_role: 1
            }
            var data = {
                no_telp: req.param("no_telp"),
                provinsi: req.param("provinsi"),
                kabupatenKota: req.param("kabupatenKota"),
                kecamatan: req.param("kecamatan"),
                address: req.param("address"),
                pos_code: req.param("pso_code"),
                id_customer: data.id,
            }
            return Customer.create(newCustomer).then(function(_customer) {
                    return Address.create(data).then(function(_alamat) {
                        return res.redirect('/')
                    })
                })
                // }) 
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

    dashboard: function(req, res) {
        res.view('authentication/dashboard')
    },

    logout: function(req, res) {
        req.session.destroy();
        // req.logout();
        res.redirect('/');
    },

    upadateProfile: function(req, res) {
        Customer.update({ id_user: req.param("id") }, {
            name: req.param("name"),
            no_telp: req.param("no_telp"),
            gender: req.param("gender")
        }).then(function(err, _user) {
            User.update({ id: req.param("id") }, {
                email: req.param("email")
            }).then(function(err, _address) {
                Address.update({ id_customer: req.param("id") }, {
                    address: req.param("address")
                }).then(function(err, _edit) {
                    return res.redirect('/profil')
                })
            })
        })

    },

    changePhoto: async function(req, res) {
        req.file('image').upload({ dirname: '../../.tmp/public/images/uploads/', maxBytes: 10000000 }, function(err, files) {
            // req.file('image').upload({ dirname: '../../assets/images/uploads/' }, function(err, data) {
            // console.log(data)
            if (files.length === 0) {
                return res.serverError("no files")
            }
            // })
            if (err) return res.serverError(err);
            var fileUID = files[0].fd.replace(/^.*[\\\/]/, '');
            Customer.update({ id_user: req.session.User.id }, {
                image: fileUID
            }).then(function(err, _profi) {
                res.redirect('/profil')

            })
        })


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
                                return res.view('authentication/changePassword')
                            })
                        }
                    });
                });
            })
        }

    },
};