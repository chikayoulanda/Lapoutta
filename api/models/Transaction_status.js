module.exports = {
  tableName: 'transaction_status',

  attributes: {
    id: {
      type: 'number',
      autoIncrement: true
    },
    name: {
      type: 'string'
    },
    transaction: {
      collection: 'transaction',
      via: 'id_transaction_status'
    },
    billing: {
      collection: 'billing',
      via: 'status_trans'
    }

  },

};

