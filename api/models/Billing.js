module.exports = {
  tableName: 'billing',

  attributes: {
    id: { type: 'number', autoIncrement: true, },

    name: {
      type: 'String'
    },
    code: {
      type:'string'
    },
    total: {
      type: 'number',
      columnType: 'double'
    },
    status_trans: {
      model: 'transaction_status'
    },
    status: {
      type: 'string'
    },
    image: {
      type: 'string'
    },

    id_store: {
      model: 'store'
    }
  },

};

