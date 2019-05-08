/**
 * Payment_confirmation.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'payment_confirmation',

  attributes: {

    id:{
      type:'number',
      autoIncrement:true
    },
    transfer_from:{
      type:'string'
    },
    transfer_to:{
      type:'string'
    },
    total:{
      type:'string'
    },
    id_transaction:{
      model:'transaction'
    },
    id_bank:{
      model:'ref_bank'
    },
    id_payment_status:{
      model:'payment_status'
    },
  },
};

