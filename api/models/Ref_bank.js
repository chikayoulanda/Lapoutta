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

