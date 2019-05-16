module.exports = {
  tableName: 'transaction_detail',

  attributes: {
    id: {
      type: 'number',
      autoIncrement: true
    },
    id_product: {
      model: 'product'
    },
    id_transaction: {
      model: 'transaction'
    },
    quantity: {
      type: 'number',
      columnType: 'Integer'
    },
    sub_total: {
      type: 'number',
      columnType: 'Integer'
    },
    ongkir: {
      type: 'number',
      columnType: 'double'
    },
  },

};

