module.exports = {
  tableName: 'store',
  attributes: {
    id: { type: 'number', autoIncrement: true, },

    name: {
      type: 'string',
      required: true
    },
    no_telp: {
      type: 'string',
      required: true
    },
    address: {
      type: 'ref',
      columnType: 'text'
    },

    provinsi: {
      type: 'string'
    },

    kabupatenKota: {
      type: 'string'
    },

    kecamatan: {
      type: 'string'
    },

    id_customer: {
      model: 'customer'
    },

    no_KTP: {
      type: 'string',
    },
    image_KTP: {
      type: 'string',
    },
    no_Rekening: {
      type: 'string',
    },
    image_Rekening: {
      type: 'string',
    },

    id_store_status: {
      model: 'store_status'
    },
    product: {
      collection: 'product',
      via: 'id_store'
    },

    billing: {
      collection: 'billing',
      via: 'id_store'
    }

  },

};

