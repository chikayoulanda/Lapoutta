var bcrypt = require('bcrypt');
module.exports = {
  tableName: 'user',

  attributes: {
    id: { type: 'number', autoIncrement: true, },

    email: {
      type: 'string',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    token: {
      type: 'string'
    },
    customer: {
      collection: 'customer',
      via: 'id_user'
    }

  },
  customToJSON: function () {
    return _.omit(this, ['password'])
  },
  beforeCreate: function (user, cb) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          cb();
        }
      });
    });
  }

};

