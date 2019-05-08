/**
 * Ref_bank.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'ref_bank',

  attributes: {
    id: {
      type: 'number',
      autoIncrement: true
    },
    
    name: {
      type: 'string'
    },

    no_rek: {
      type: 'string',
      unique: true
    },

    bank: {
      type: 'string'
    },

    payment_confirmation: {
      collection: 'payment_confirmation',
      via: 'id_bank'
    }

  },

};

