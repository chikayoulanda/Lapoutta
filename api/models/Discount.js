module.exports = {
  tableName: 'discount',

  attributes: {
    id: {
      type: 'number',
      autoIncrement: true
    },

    discount: {
      type: 'number'
    },

    id_product: {
      model: 'product'
    }

  },

};

