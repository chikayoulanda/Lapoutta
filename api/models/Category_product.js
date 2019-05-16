module.exports = {
  tableName: 'category_product',
  attributes: {
    id: { type: 'number', autoIncrement: true, },

    name: {
      type: 'string',
      required: true
    },

    product: {
      collection: 'product',
      via: 'id_category'
    }
  },

};

