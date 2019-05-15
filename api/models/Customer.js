/**
 * Customer.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

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
    
    gender:{
      type:'string'
    },

    image: {
      type: 'string'
    },

    address: {
      collection: 'address',
      via: 'id_customer'
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

  },

};

