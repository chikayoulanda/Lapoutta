module.exports = {
  tableName: 'payment_status',

  attributes: {
    id: {
      type: 'number',
      autoIncrement: true
    },
    name: {
      type: 'string'
    },
    payment_confirmation: {
      collection: 'payment_confirmation',
      via: 'id_payment_status'
    }

  },

};

