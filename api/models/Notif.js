module.exports = {
  tableName: 'notif',

  attributes: {
    id: {
      type: 'number',
      autoIncrement: true
    },
    id_receiver: {
      model: 'customer'
    },

    body: {
      type: 'ref',
      columnType: 'text'
    },
    title: {
      type: 'string'
    },
    id_request: {
      type: 'number',
      columnType:'integer'
    },
    role: {
      type: 'string'
    }
  },

};

