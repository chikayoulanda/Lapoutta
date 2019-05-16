module.exports = {
  tableName: 'product_status',
  attributes: {
    id: { type: 'number', autoIncrement: true, },

    name: {
      type: 'string',
      required: true
    },
    product: {
      collection: 'product',
      via: 'id_product_status'
    }

  },

};

