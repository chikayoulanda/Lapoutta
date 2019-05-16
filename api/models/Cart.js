module.exports = {
  tableName: 'cart',
  attributes: {
    id: { type: 'number', autoIncrement: true, },

    quantity: {
      type: 'number',
      required: true
    },
    is_active: {
      type: 'number'
    },
    id_customer: {
      model: 'customer'
    },
    id_product: {
      model: 'product'
    }

  },

};

