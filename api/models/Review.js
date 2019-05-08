/**
 * Review.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'review',

  attributes: {
    id:{
      type:'number',
      autoIncrement:true
    },

    body:{
      type:'string',
      columnType:'longtext'
    },

    id_customer:{
      model:'customer'
    },

    id_product:{
      model:'product'
    },

  },

};

