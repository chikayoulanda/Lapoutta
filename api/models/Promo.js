/**
 * Promo.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'promo',

  attributes: {
    id:{
      type:'number',
      autoIncrement:true
    },
    name:{
      type:'string'
    },
    code:{
      type:'string'
    }

  },

};