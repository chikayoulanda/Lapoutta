/**
 * Transaction_status.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'transaction_status',

  attributes: {
    id:{
      type:'number',
      autoIncrement:true
    },
    name:{
      type:'string'
    },
    transaction:{
      collection:'transaction',
      via:'id_transaction_status'
    },
    billing:{
      collection:'billing',
      via:'status_trans'
    }

  },

};

