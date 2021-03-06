module.exports = {
    tableName: 'transaction',

    attributes: {
        id: {
            type: 'number',
            autoIncrement: true,
        },

        transaction_date: {
            type: 'ref',
            columnType: 'datetime',
            autoCreatedAt: true
        },

        no_order: {
            type: 'string'
        },

        id_customer: {
            model: 'customer'
        },

        id_transaction_status: {
            model: 'transaction_status'
        },

        id_shipment: {
            model: 'shipment_status'
        },

        transaction_detail: {
            collection: 'transaction_detail',
            via: 'id_transaction'
        },

        payment_confirmatiion: {
            collection: 'payment_confirmation',
            via: 'id_transaction'
        },

        shipment: {
            collection: 'shipment',
            via: 'id_transaction'
        },

    },

};