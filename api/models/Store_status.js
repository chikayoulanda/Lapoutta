module.exports = {
  tableName: 'store_status',
  attributes: {
    id: { type: 'number', autoIncrement: true, },

    name_status: {
      type: 'string',
      required: true
    },
    store: {
      collection: 'store',
      via: 'id_store_status'
    }

  },

};

