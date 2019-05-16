module.exports = {
  tableName: 'review',

  attributes: {
    id: {
      type: 'number',
      autoIncrement: true
    },

    body: {
      type: 'string',
      columnType: 'longtext'
    },

    id_customer: {
      model: 'customer'
    },

    id_product: {
      model: 'product'
    },

  },

};

