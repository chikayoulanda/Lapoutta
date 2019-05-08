/**
 * Payment_status.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'payment_status',

  attributes: {
    id:{
      type:'number',
      autoIncrement:true
    },
    name:{
      type:'string'
    },
    payment_confirmation:{
      collection:'payment_confirmation',
      via:'id_payment_status'
    }

  },

};

