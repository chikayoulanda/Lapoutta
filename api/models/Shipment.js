/**
 * Shipment.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'shipment',

  attributes: {
    id:{
      type:'number',
      autoIncrement:true
    },
    
    date_transaction:{
      type:'ref',
      columnType:'datetime'
    },
    
    shipping_charge:{
      type:'string'
    },

    id_address:{
      model:'address'
    },
    
    id_transaction:{
      model:'transaction'
    },

    id_shipment_status:{
      model:'shipment_status'
    },
  },

};

