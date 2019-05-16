module.exports = {
  tableName: 'role',
  attributes: {
    id: { type: 'number', autoIncrement: true, },

    name: {
      type: 'string',
      unique: true,
      required: true
    },
    customer: {
      collection: 'customer',
      via: 'id_role'
    }

  },

};

