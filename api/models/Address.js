  /**
 * Address.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'address',

  attributes: {
    id: { type: 'number', autoIncrement: true, },

    name:{
      type:'string'
    },

    no_telp:{
      type:'string'
    },

    provinsi:{
      type:'string'
    },

    kabupatenKota:{
      type:'string'
    },

    kecamatan:{
      type:'string'
    },

    address:{
      type:'ref',
      columnType:'text'
    },

    pos_code:{
      type:'string'
    },

    id_customer:{
      model:'customer'
    },

    shipment:{
      collection:'shipment',
      via:'id_address'
    }

  },

};
