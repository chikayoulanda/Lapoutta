module.exports = {
  tableName: 'blog',

  attributes: {
    id: {
      type: 'number',
      autoIncrement: true
    },

    body: {
      type: 'ref',
      columnType: 'text'
    },

    type: {
      type: 'number'
    },

    id_product: {
      model: 'product'
    }
  },

};

