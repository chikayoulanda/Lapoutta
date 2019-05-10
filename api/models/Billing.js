/**
 * Billing.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'billing',

  attributes: {
    id: { type: 'number', autoIncrement: true, },
    
    name:{
      type:'String'
    },
    code:{
      model:'transaction'
    },
    total:{
      type:'number',
      columnType:'double'
    },
    status_trans:{
      type:'string'
    },
    status:{
      type:'string'
    },
    image:{
      type:'string'
    }
  },

};

