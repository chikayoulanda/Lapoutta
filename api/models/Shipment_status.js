module.exports = {
  tableName: 'shipment_status',

  attributes: {
    id: {
      type: 'number',
      autoIncrement: true
    },
    name_shipment_status: {
      type: 'string'
    },
    shipment: {
      collection: 'shipment',
      via: 'id_shipment_status'
    },

    transaction: {
      collection: 'transaction',
      via: 'id_shipment'
    }

  },

};

