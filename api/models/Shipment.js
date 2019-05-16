module.exports = {
  tableName: 'shipment',

  attributes: {
    id: {
      type: 'number',
      autoIncrement: true
    },

    date_transaction: {
      type: 'ref',
      columnType: 'datetime'
    },

    shipping_charge: {
      type: 'string'
    },

    id_address: {
      model: 'address'
    },

    id_transaction: {
      model: 'transaction'
    },

    id_shipment_status: {
      model: 'shipment_status'
    },
  },

};

