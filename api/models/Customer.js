module.exports = {
  tableName: 'customer',
  attributes: {
    id: { type: 'number', autoIncrement: true, },

    name: {
      type: 'string',
    },

    no_telp: {
      type: 'string',
    },

    gender: {
      type: 'string'
    },

    image: {
      type: 'string'
    },

    id_user: {
      model: 'user'
    },

    id_role: {
      model: 'role'
    },

    cart: {
      collection: 'cart',
      via: 'id_customer'
    },

    store: {
      collection: 'store',
      via: 'id_customer'
    },

    transaction: {
      collection: 'transaction',
      via: 'id_customer'
    },

    review: {
      collection: 'review',
      via: 'id_customer'
    },

    address: {
      collection: 'address',
      via: 'id_customer'
    },

  },

};

